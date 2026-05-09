import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import type { KnowledgeBase } from "~/lib/knowledge-base-api";

type TextTabProps = {
  items: KnowledgeBase[];
  onSave: (id: string, textContent: string) => void;
  onDelete: (id: string) => void;
  isSaving: boolean;
  isDeleting: boolean;
  deletingId: string | null;
};

const TextTab = ({
  items,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
  deletingId,
}: TextTabProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    items[0]?.id ?? null,
  );
  const [text, setText] = useState("");

  useEffect(() => {
    if (items.length === 0) {
      setSelectedId(null);
      setText("");
      return;
    }
    const hasSelected = items.some(item => item.id === selectedId);
    const nextId = hasSelected ? selectedId : items[0].id;
    setSelectedId(nextId);
    const nextItem = items.find(item => item.id === nextId);
    setText(nextItem?.textContent ?? "");
  }, [items, selectedId]);

  const selectedItem = items.find(item => item.id === selectedId) ?? null;
  const isDirty = (selectedItem?.textContent ?? "") !== text;

  return (
    <div>
      <div className="border-border mb-8 flex h-16 items-center border-b px-4">
        <h1 className="text-foreground text-xl font-bold">Metin</h1>
        <span className="text-muted-foreground ml-3 text-sm">
          ({items.length} kaynak)
        </span>
      </div>
      <div className="px-3">
        {items.length > 0 ? (
          <>
            <select
              className="border-border bg-card w-full rounded-md border px-3 py-2 text-sm"
              value={selectedId ?? ""}
              onChange={event => {
                const nextItem = items.find(
                  item => item.id === event.target.value,
                );
                setSelectedId(event.target.value);
                setText(nextItem?.textContent ?? "");
              }}
            >
              {items.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>

            <Textarea
              placeholder="Metni buraya girin..."
              className="mt-4 min-h-[260px] w-full p-3 text-base"
              value={text}
              onChange={e => setText(e.target.value)}
            />

            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => selectedItem && onDelete(selectedItem.id)}
                disabled={
                  !selectedItem ||
                  (isDeleting && deletingId === selectedItem.id)
                }
              >
                <Trash2 className="h-4 w-4" /> Sil
              </Button>
              <Button
                onClick={() => {
                  if (!selectedSource) return;
                  onSave(selectedItem.id, text);
                }}
                disabled={!selectedItem || !isDirty || isSaving}
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
