import { CheckCircle2, Copy, Trash2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { KnowledgeBaseItem } from "~/lib/knowledge-base-api";

type TabHeaderProps = {
  title: string;
  knowledgeBase: KnowledgeBaseItem | null;
  sourceCount: number;
  onDeleteKnowledgeBase: () => void;
  isDeletingKnowledgeBase: boolean;
};

const TabHeader = ({
  title,
  knowledgeBase,
  sourceCount,
  onDeleteKnowledgeBase,
  isDeletingKnowledgeBase,
}: TabHeaderProps) => {
  const createdAtLabel = knowledgeBase
    ? new Date(knowledgeBase.createdAt).toLocaleString("tr-TR")
    : "-";

  const shortId = knowledgeBase ? `${knowledgeBase.id.slice(0, 8)}...` : "-";

  const handleCopyId = async () => {
    if (!knowledgeBase) return;

    await navigator.clipboard.writeText(knowledgeBase.id);
  };

  return (
    <div className="border-border mb-8 flex h-16 items-center justify-between border-b px-4">
      <div>
        <h1 className="text-foreground mb-2 text-xl font-bold">{title}</h1>
        <div className="text-muted-foreground flex items-center gap-3 text-xs font-medium">
          <span className="flex items-center gap-1">
            ID: {shortId}
            <button
              type="button"
              className="hover:text-foreground transition-colors"
              onClick={handleCopyId}
              disabled={!knowledgeBase}
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="text-success h-3.5 w-3.5" />
            Olusturuldu: {createdAtLabel}
          </span>
          <span className="text-border">•</span>
          <span>{sourceCount} kaynak</span>
          {knowledgeBase?.isActive === false && (
            <>
              <span className="text-border">•</span>
              <span className="text-warning">Pasif</span>
            </>
          )}
          <span className="text-border">•</span>
          <span>{knowledgeBase?.name ?? "Bilgi bankasi secilmedi"}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-border h-10 w-10 transition-colors"
          onClick={onDeleteKnowledgeBase}
          disabled={!knowledgeBase || isDeletingKnowledgeBase}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TabHeader;
