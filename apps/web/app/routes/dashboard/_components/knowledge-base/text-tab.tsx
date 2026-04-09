import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import type {
  KnowledgeBaseItem,
  KnowledgeBaseSource,
} from "~/lib/knowledge-base-api";
import TabHeader from "./tab-header";

type TextTabProps = {
  knowledgeBase: KnowledgeBaseItem | null;
  textSources: KnowledgeBaseSource[];
  onSaveSource: (sourceId: string, content: string) => void;
  onDeleteSource: (sourceId: string) => void;
  savingSourceId: string | null;
  deletingSourceId: string | null;
  onDeleteKnowledgeBase: () => void;
  isDeletingKnowledgeBase: boolean;
};

const TextTab = ({
  knowledgeBase,
  textSources,
  onSaveSource,
  onDeleteSource,
  savingSourceId,
  deletingSourceId,
  onDeleteKnowledgeBase,
  isDeletingKnowledgeBase,
}: TextTabProps) => {
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (textSources.length === 0) {
      setSelectedSourceId(null);
      setText("");
      return;
    }

    const hasSelectedSource = textSources.some(
      source => source.id === selectedSourceId,
    );

    const nextSourceId = hasSelectedSource
      ? selectedSourceId
      : textSources[0].id;
    setSelectedSourceId(nextSourceId);

    const nextSource = textSources.find(source => source.id === nextSourceId);
    setText(nextSource?.content ?? "");
  }, [textSources, selectedSourceId]);

  const selectedSource =
    textSources.find(source => source.id === selectedSourceId) ?? null;

  const isDirty = (selectedSource?.content ?? "") !== text;

  return (
    <div>
      <TabHeader
        title="Metin"
        knowledgeBase={knowledgeBase}
        sourceCount={textSources.length}
        onDeleteKnowledgeBase={onDeleteKnowledgeBase}
        isDeletingKnowledgeBase={isDeletingKnowledgeBase}
      />
      <div className="px-3">
        {textSources.length > 0 ? (
          <>
            <Label
              htmlFor="text-source"
              className="text-muted-foreground/80 ml-1 text-[11px] font-bold tracking-wider uppercase"
            >
              Metin Kaynagi
            </Label>
            <select
              id="text-source"
              className="border-border bg-card mt-2 w-full rounded-md border px-3 py-2 text-sm"
              value={selectedSourceId ?? ""}
              onChange={event => {
                const nextSource = textSources.find(
                  source => source.id === event.target.value,
                );

                setSelectedSourceId(event.target.value);
                setText(nextSource?.content ?? "");
              }}
            >
              {textSources.map(source => (
                <option key={source.id} value={source.id}>
                  {source.title}
                </option>
              ))}
            </select>

            <Textarea
              id="text"
              placeholder="Metni buraya girin veya görüntüleyin..."
              className="mt-4 min-h-[260px] w-full p-3 text-base"
              value={text}
              onChange={e => setText(e.target.value)}
            />

            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (!selectedSource) return;
                  onDeleteSource(selectedSource.id);
                }}
                disabled={
                  !selectedSource || deletingSourceId === selectedSource.id
                }
              >
                <Trash2 className="h-4 w-4" /> Sil
              </Button>
              <Button
                onClick={() => {
                  if (!selectedSource) return;
                  onSaveSource(selectedSource.id, text);
                }}
                disabled={
                  !selectedSource ||
                  !isDirty ||
                  savingSourceId === selectedSource.id
                }
              >
                Kaydet
              </Button>
            </div>
          </>
        ) : (
          <div className="border-border bg-secondary/20 mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12">
            <h4 className="text-foreground mb-1 text-sm font-semibold">
              Metin Kaynagi Yok
            </h4>
            <p className="text-muted-foreground max-w-xs text-center text-xs leading-relaxed">
              Yeni metin kaynagi eklemek icin sol ustteki + butonunu kullan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextTab;
