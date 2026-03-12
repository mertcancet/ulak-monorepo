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
    <div className="flex items-center justify-between mb-8 px-4 border-b border-border h-16">
      <div>
        <h1 className="text-xl font-bold text-foreground mb-2">{title}</h1>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
          <span className="flex items-center gap-1">
            ID: {shortId}
            <button
              type="button"
              className="hover:text-foreground transition-colors"
              onClick={handleCopyId}
              disabled={!knowledgeBase}
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Olusturuldu: {createdAtLabel}
          </span>
          <span className="text-border">•</span>
          <span>{sourceCount} kaynak</span>
          {knowledgeBase?.isActive === false && (
            <>
              <span className="text-border">•</span>
              <span className="text-amber-500">Pasif</span>
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
          className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-border transition-colors"
          onClick={onDeleteKnowledgeBase}
          disabled={!knowledgeBase || isDeletingKnowledgeBase}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TabHeader;
