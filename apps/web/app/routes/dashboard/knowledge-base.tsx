/** biome-ignore-all lint/a11y/useButtonType: false positive */
import { BookOpen, BookText, File, Link } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type BusinessItem,
  type KnowledgeBaseItem,
  type KnowledgeBaseSource,
  knowledgeBaseApi,
} from "~/lib/knowledge-base-api";
import ulakClient from "~/lib/ulak-client";
import { cn } from "~/lib/utils";
import AddKnowledgeBaseDialog, {
  type CreateKnowledgeBaseDialogInput,
} from "./_components/knowledge-base/add-knowledge-base-dialog";
import FileTab from "./_components/knowledge-base/file-tab";
import TextTab from "./_components/knowledge-base/text-tab";
import WebsiteTab from "./_components/knowledge-base/website-tab";

const slugify = (value: string) => {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return slug.slice(0, 42);
};

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState<"text" | "file" | "website">(
    "text",
  );
  const [businesses, setBusinesses] = useState<BusinessItem[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null,
  );
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBaseItem[]>([]);
  const [selectedKnowledgeBaseId, setSelectedKnowledgeBaseId] = useState<
    string | null
  >(null);
  const [sources, setSources] = useState<KnowledgeBaseSource[]>([]);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isDialogSubmitting, setIsDialogSubmitting] = useState(false);
  const [isDeletingKnowledgeBase, setIsDeletingKnowledgeBase] = useState(false);
  const [deletingSourceId, setDeletingSourceId] = useState<string | null>(null);
  const [savingSourceId, setSavingSourceId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const selectedKnowledgeBase = useMemo(
    () =>
      knowledgeBases.find(
        knowledgeBase => knowledgeBase.id === selectedKnowledgeBaseId,
      ) ?? null,
    [knowledgeBases, selectedKnowledgeBaseId],
  );

  const textSources = useMemo(
    () => sources.filter(source => source.sourceType === "text"),
    [sources],
  );

  const fileSources = useMemo(
    () => sources.filter(source => source.sourceType === "file"),
    [sources],
  );

  const websiteSources = useMemo(
    () => sources.filter(source => source.sourceType === "website"),
    [sources],
  );

  const loadSources = useCallback(async (knowledgeBaseId: string) => {
    // const nextSources = await knowledgeBaseApi.listSources(knowledgeBaseId);
    const nextSources = await ulakClient["knowledge-base"]
      ["knowledge-bases"]({ id: knowledgeBaseId })
      .sources.get();

    // nextSources.data

    setSources(nextSources.data);
  }, []);

  const refreshKnowledgeBases = useCallback(
    async (businessId: string, preferredKnowledgeBaseId?: string | null) => {
      const nextKnowledgeBases =
        await knowledgeBaseApi.listKnowledgeBases(businessId);

      setKnowledgeBases(nextKnowledgeBases);

      const nextSelectedKnowledgeBaseId =
        preferredKnowledgeBaseId &&
        nextKnowledgeBases.some(
          knowledgeBase => knowledgeBase.id === preferredKnowledgeBaseId,
        )
          ? preferredKnowledgeBaseId
          : (nextKnowledgeBases[0]?.id ?? null);

      setSelectedKnowledgeBaseId(nextSelectedKnowledgeBaseId);

      if (!nextSelectedKnowledgeBaseId) {
        setSources([]);
      }
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      setIsBootstrapping(true);
      setErrorMessage(null);

      try {
        const nextBusinesses = await knowledgeBaseApi.listBusinesses();

        if (cancelled) return;

        setBusinesses(nextBusinesses);

        const nextSelectedBusinessId = nextBusinesses[0]?.id ?? null;
        setSelectedBusinessId(nextSelectedBusinessId);

        if (!nextSelectedBusinessId) {
          setKnowledgeBases([]);
          setSelectedKnowledgeBaseId(null);
          setSources([]);
          return;
        }

        await refreshKnowledgeBases(nextSelectedBusinessId);
      } catch (error) {
        if (cancelled) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Knowledge base verileri alinamadi.",
        );
      } finally {
        if (!cancelled) {
          setIsBootstrapping(false);
        }
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [refreshKnowledgeBases]);

  useEffect(() => {
    if (!selectedKnowledgeBaseId) return;

    let cancelled = false;

    const syncSources = async () => {
      try {
        await loadSources(selectedKnowledgeBaseId);
      } catch (error) {
        if (cancelled) return;

        setErrorMessage(
          error instanceof Error ? error.message : "Kaynaklar alinamadi.",
        );
      }
    };

    void syncSources();

    return () => {
      cancelled = true;
    };
  }, [loadSources, selectedKnowledgeBaseId]);

  const createKnowledgeBaseAndSource = useCallback(
    async ({
      knowledgeBaseName,
      sourceType,
      textContent,
      websiteUrl,
      files,
    }: CreateKnowledgeBaseDialogInput) => {
      setIsDialogSubmitting(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        let businessId = selectedBusinessId;

        if (!businessId) {
          const suffix = Math.random().toString(36).slice(2, 8);
          const generatedSlug = `${slugify(knowledgeBaseName) || "business"}-${suffix}`;
          const createdBusiness = await knowledgeBaseApi.createBusiness({
            name: `${knowledgeBaseName} Business`,
            slug: generatedSlug,
          });

          businessId = createdBusiness.id;
          setBusinesses(prevBusinesses => [createdBusiness, ...prevBusinesses]);
          setSelectedBusinessId(createdBusiness.id);
        }

        const knowledgeBase = await knowledgeBaseApi.createKnowledgeBase(
          businessId,
          {
            name: knowledgeBaseName,
          },
        );

        if (sourceType === "text") {
          await knowledgeBaseApi.createSource(knowledgeBase.id, {
            title: `${knowledgeBaseName} Metin`,
            sourceType: "text",
            content: textContent,
          });
        }

        if (sourceType === "website") {
          await knowledgeBaseApi.createSource(knowledgeBase.id, {
            title: websiteUrl || `${knowledgeBaseName} Website`,
            sourceType: "website",
            websiteUrl,
          });
        }

        if (sourceType === "file") {
          await Promise.all(
            files.map(file =>
              knowledgeBaseApi.createSource(knowledgeBase.id, {
                title: file.name,
                sourceType: "file",
                fileName: file.name,
                fileMimeType: file.type || "application/octet-stream",
                fileSizeBytes: file.size,
                storagePath: `uploads/${file.name}`,
              }),
            ),
          );
        }

        await refreshKnowledgeBases(businessId, knowledgeBase.id);
        setActiveTab(sourceType);
        setSuccessMessage("Bilgi bankasi olusturuldu.");
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Bilgi bankasi olusturulamadi.";

        setErrorMessage(message);
        throw error;
      } finally {
        setIsDialogSubmitting(false);
      }
    },
    [refreshKnowledgeBases, selectedBusinessId],
  );

  const handleDeleteKnowledgeBase = useCallback(async () => {
    if (!selectedBusinessId || !selectedKnowledgeBaseId) return;

    const approved = window.confirm(
      "Bu bilgi bankasini silmek istedigine emin misin?",
    );

    if (!approved) return;

    setIsDeletingKnowledgeBase(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await knowledgeBaseApi.deleteKnowledgeBase(selectedKnowledgeBaseId);
      await refreshKnowledgeBases(selectedBusinessId);
      setSuccessMessage("Bilgi bankasi silindi.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Bilgi bankasi silinemedi.",
      );
    } finally {
      setIsDeletingKnowledgeBase(false);
    }
  }, [refreshKnowledgeBases, selectedBusinessId, selectedKnowledgeBaseId]);

  const handleDeleteSource = useCallback(
    async (sourceId: string) => {
      if (!selectedKnowledgeBaseId) return;

      setDeletingSourceId(sourceId);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        await knowledgeBaseApi.deleteSource(sourceId);
        await loadSources(selectedKnowledgeBaseId);
        setSuccessMessage("Kaynak silindi.");
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Kaynak silinemedi.",
        );
      } finally {
        setDeletingSourceId(null);
      }
    },
    [loadSources, selectedKnowledgeBaseId],
  );

  const handleSaveTextSource = useCallback(
    async (sourceId: string, content: string) => {
      if (!selectedKnowledgeBaseId) return;

      setSavingSourceId(sourceId);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        await knowledgeBaseApi.updateSource(sourceId, {
          content,
        });

        await loadSources(selectedKnowledgeBaseId);
        setSuccessMessage("Metin kaynagi guncellendi.");
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Metin kaynagi guncellenemedi.",
        );
      } finally {
        setSavingSourceId(null);
      }
    },
    [loadSources, selectedKnowledgeBaseId],
  );

  return (
    <div className="flex h-full bg-background overflow-hidden animate-in fade-in duration-500">
      {/* Sub-Sidebar: Bilgi Bankasi Listesi */}
      <aside className="w-72 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-4 h-16 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-sm">Bilgi Bankasi</h2>
            <span className="text-[11px] text-muted-foreground">
              ({businesses.length} business)
            </span>
          </div>
          <AddKnowledgeBaseDialog
            onCreate={createKnowledgeBaseAndSource}
            isSubmitting={isDialogSubmitting}
          />
        </div>

        <div className="p-4 space-y-2 border-b border-border">
          {knowledgeBases.length > 0 ? (
            knowledgeBases.map(knowledgeBase => (
              <button
                key={knowledgeBase.id}
                onClick={() => setSelectedKnowledgeBaseId(knowledgeBase.id)}
                className={cn(
                  "p-2 cursor-pointer w-full rounded-lg flex items-start flex-col border border-border text-left",
                  selectedKnowledgeBaseId === knowledgeBase.id &&
                    "bg-secondary",
                )}
              >
                <span className="text-sm font-medium text-foreground truncate w-full">
                  {knowledgeBase.name}
                </span>
                <span className="text-[11px] text-muted-foreground truncate w-full">
                  {knowledgeBase.id.slice(0, 8)}...
                </span>
              </button>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
              Henuz bilgi bankasi yok. Sol ustteki + ile olustur.
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("text")}
            className={cn(
              "p-2 cursor-pointer w-full rounded-lg flex items-center gap-2 border border-border",
              activeTab === "text" && "bg-secondary",
            )}
          >
            <BookText
              className={cn(
                "w-4 h-4 text-muted-foreground",
                activeTab === "text" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground",
                activeTab === "text" && "text-foreground",
              )}
            >
              Text
            </span>
          </button>
          <button
            onClick={() => setActiveTab("file")}
            className={cn(
              "p-2 cursor-pointer w-full rounded-lg flex items-center gap-2 border border-border",
              activeTab === "file" && "bg-secondary",
            )}
          >
            <File
              className={cn(
                "w-4 h-4 text-muted-foreground",
                activeTab === "file" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground",
                activeTab === "file" && "text-foreground",
              )}
            >
              Dosya
            </span>
          </button>
          <button
            onClick={() => setActiveTab("website")}
            className={cn(
              "p-2  cursor-pointer w-full rounded-lg flex items-center gap-2 border border-border",
              activeTab === "website" && "bg-secondary",
            )}
          >
            <Link
              className={cn(
                "w-4 h-4 text-muted-foreground",
                activeTab === "website" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground",
                activeTab === "website" && "text-foreground",
              )}
            >
              Website
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-background overflow-y-auto scrollbar-thin">
        {isBootstrapping ? (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            Yukleniyor...
          </div>
        ) : (
          <>
            {errorMessage && (
              <div className="mx-4 mt-4 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mx-4 mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-700">
                {successMessage}
              </div>
            )}

            {!selectedKnowledgeBase ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground px-6 text-center">
                Gosterilecek bilgi bankasi yok. Yeni bir bilgi bankasi olusturup
                kaynak ekleyebilirsin.
              </div>
            ) : (
              <>
                {activeTab === "text" && (
                  <TextTab
                    knowledgeBase={selectedKnowledgeBase}
                    textSources={textSources}
                    onSaveSource={handleSaveTextSource}
                    onDeleteSource={handleDeleteSource}
                    savingSourceId={savingSourceId}
                    deletingSourceId={deletingSourceId}
                    onDeleteKnowledgeBase={handleDeleteKnowledgeBase}
                    isDeletingKnowledgeBase={isDeletingKnowledgeBase}
                  />
                )}
                {activeTab === "file" && (
                  <FileTab
                    knowledgeBase={selectedKnowledgeBase}
                    files={fileSources}
                    onDeleteSource={handleDeleteSource}
                    deletingSourceId={deletingSourceId}
                    onDeleteKnowledgeBase={handleDeleteKnowledgeBase}
                    isDeletingKnowledgeBase={isDeletingKnowledgeBase}
                  />
                )}
                {activeTab === "website" && (
                  <WebsiteTab
                    knowledgeBase={selectedKnowledgeBase}
                    websites={websiteSources}
                    onDeleteSource={handleDeleteSource}
                    deletingSourceId={deletingSourceId}
                    onDeleteKnowledgeBase={handleDeleteKnowledgeBase}
                    isDeletingKnowledgeBase={isDeletingKnowledgeBase}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
