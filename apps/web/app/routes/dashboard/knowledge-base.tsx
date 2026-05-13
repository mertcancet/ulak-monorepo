import type { UpdateKnowledgeBaseInput } from "@cleon/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookOpen, BookText, File, Link } from "lucide-react";
import { useState } from "react";
import { knowledgeBaseApi } from "~/lib/knowledge-base-api";
import { cn } from "~/lib/utils";
import { useWorkspaceStore } from "~/store/workspace-store";
import AddKnowledgeBaseDialog, {
  type CreateKnowledgeBaseDialogInput,
} from "./_components/knowledge-base/add-knowledge-base-dialog";
import FileTab from "./_components/knowledge-base/file-tab";
import TextTab from "./_components/knowledge-base/text-tab";
import WebsiteTab from "./_components/knowledge-base/website-tab";

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState<"text" | "file" | "website">(
    "text",
  );
  const queryClient = useQueryClient();
  const { selectedWorkspaceId } = useWorkspaceStore();
  const {
    data: knowledgeBases = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["knowledge-bases", selectedWorkspaceId],
    queryFn: () => knowledgeBaseApi.list(),
  });

  const createMutation = useMutation({
    mutationFn: knowledgeBaseApi.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["knowledge-bases"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdateKnowledgeBaseInput;
    }) => knowledgeBaseApi.update(id, body),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["knowledge-bases"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => knowledgeBaseApi.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["knowledge-bases"] }),
  });

  const textKBs = knowledgeBases.filter(kb => kb.type === "text");
  const fileKBs = knowledgeBases.filter(kb => kb.type === "file");
  const websiteKBs = knowledgeBases.filter(kb => kb.type === "website");

  const handleCreate = async ({
    knowledgeBaseName,
    sourceType,
    textContent,
    websiteUrl,
    files,
  }: CreateKnowledgeBaseDialogInput) => {
    await createMutation.mutateAsync({
      name: knowledgeBaseName,
      type: sourceType,
      workspaceId: selectedWorkspaceId || "",
      textContent: sourceType === "text" ? textContent : undefined,
      websiteUrl: sourceType === "website" ? websiteUrl : undefined,
      fileName:
        sourceType === "file" ? (files[0]?.name ?? undefined) : undefined,
    });
    setActiveTab(sourceType);
  };

  const handleUpdateText = async (id: string, textContent: string) => {
    await updateMutation.mutateAsync({ id, body: { textContent } });
  };

  const handleDelete = async (id: string) => {
    const approved = window.confirm(
      "Bu bilgi bankasini silmek istedigine emin misin?",
    );
    if (!approved) return;
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div className="bg-background animate-in fade-in flex h-full overflow-hidden duration-500">
      {/* Sub-Sidebar */}
      <aside className="border-border bg-card flex w-72 shrink-0 flex-col border-r">
        <div className="border-border flex h-16 items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-muted-foreground h-4 w-4" />
            <h2 className="text-sm font-semibold">Bilgi Bankasi</h2>
            <span className="text-muted-foreground text-[11px]">
              ({knowledgeBases.length})
            </span>
          </div>
          <AddKnowledgeBaseDialog
            onCreate={handleCreate}
            isSubmitting={createMutation.isPending}
          />
        </div>

        <div className="border-border flex-1 space-y-2 overflow-y-auto border-b p-4">
          {knowledgeBases.length > 0 ? (
            knowledgeBases.map(kb => (
              <div
                key={kb.id}
                className="border-border flex w-full flex-col items-start rounded-lg border p-2 text-left"
              >
                <span className="text-foreground w-full truncate text-sm font-medium">
                  {kb.name}
                </span>
                <span className="text-muted-foreground w-full truncate text-[11px] capitalize">
                  {kb.type}
                </span>
              </div>
            ))
          ) : (
            <div className="border-border text-muted-foreground rounded-lg border border-dashed p-3 text-xs">
              Henuz bilgi bankasi yok. Sol ustteki + ile olustur.
            </div>
          )}
        </div>

        <div className="space-y-2 p-4">
          <button
            onClick={() => setActiveTab("text")}
            className={cn(
              "border-border flex w-full cursor-pointer items-center gap-2 rounded-lg border p-2",
              activeTab === "text" && "bg-secondary",
            )}
            type="button"
          >
            <BookText
              className={cn(
                "text-muted-foreground h-4 w-4",
                activeTab === "text" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-muted-foreground text-sm font-medium",
                activeTab === "text" && "text-foreground",
              )}
            >
              Text
            </span>
          </button>
          <button
            onClick={() => setActiveTab("file")}
            className={cn(
              "border-border flex w-full cursor-pointer items-center gap-2 rounded-lg border p-2",
              activeTab === "file" && "bg-secondary",
            )}
            type="button"
          >
            <File
              className={cn(
                "text-muted-foreground h-4 w-4",
                activeTab === "file" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-muted-foreground text-sm font-medium",
                activeTab === "file" && "text-foreground",
              )}
            >
              Dosya
            </span>
          </button>
          <button
            onClick={() => setActiveTab("website")}
            className={cn(
              "border-border flex w-full cursor-pointer items-center gap-2 rounded-lg border p-2",
              activeTab === "website" && "bg-secondary",
            )}
            type="button"
          >
            <Link
              className={cn(
                "text-muted-foreground h-4 w-4",
                activeTab === "website" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-muted-foreground text-sm font-medium",
                activeTab === "website" && "text-foreground",
              )}
            >
              Website
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="bg-background scrollbar-thin flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
            Yukleniyor...
          </div>
        ) : error ? (
          <div className="border-destructive/20 bg-destructive/5 text-destructive mx-4 mt-4 rounded-lg border px-3 py-2 text-sm">
            {error instanceof Error ? error.message : "Bir hata olustu."}
          </div>
        ) : (
          <>
            {activeTab === "text" && (
              <TextTab
                items={textKBs}
                onSave={handleUpdateText}
                onDelete={handleDelete}
                isSaving={updateMutation.isPending}
                isDeleting={deleteMutation.isPending}
                deletingId={deleteMutation.variables ?? null}
              />
            )}
            {activeTab === "file" && (
              <FileTab
                items={fileKBs}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
                deletingId={deleteMutation.variables ?? null}
              />
            )}
            {activeTab === "website" && (
              <WebsiteTab
                items={websiteKBs}
                onDelete={handleDelete}
                isDeleting={deleteMutation.isPending}
                deletingId={deleteMutation.variables ?? null}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
