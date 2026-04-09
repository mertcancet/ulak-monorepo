import { LinkIcon, Trash2 } from "lucide-react";
import type {
  KnowledgeBaseItem,
  KnowledgeBaseSource,
} from "~/lib/knowledge-base-api";
import TabHeader from "./tab-header";

type WebsiteTabProps = {
  knowledgeBase: KnowledgeBaseItem | null;
  websites: KnowledgeBaseSource[];
  onDeleteSource: (sourceId: string) => void;
  deletingSourceId: string | null;
  onDeleteKnowledgeBase: () => void;
  isDeletingKnowledgeBase: boolean;
};

const WebsiteTab = ({
  knowledgeBase,
  websites,
  onDeleteSource,
  deletingSourceId,
  onDeleteKnowledgeBase,
  isDeletingKnowledgeBase,
}: WebsiteTabProps) => {
  return (
    <div>
      <TabHeader
        title="Website"
        knowledgeBase={knowledgeBase}
        sourceCount={websites.length}
        onDeleteKnowledgeBase={onDeleteKnowledgeBase}
        isDeletingKnowledgeBase={isDeletingKnowledgeBase}
      />

      <div className="px-4">
        {websites.length > 0 ? (
          <div className="space-y-4">
            {websites.map(source => (
              <div
                key={source.id}
                className="group bg-card border-border rounded-xl border p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="bg-accent/10 border-accent/20 flex h-10 w-10 items-center justify-center rounded-lg border">
                      <LinkIcon className="text-accent h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-foreground max-w-[380px] truncate text-sm font-semibold">
                        {source.title}
                      </h3>
                      <p className="text-muted-foreground max-w-[380px] truncate text-xs">
                        {source.websiteUrl ?? "URL bilgisi yok"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer rounded-md p-2 transition-colors"
                    title="Sil"
                    aria-label="Sil"
                    onClick={() => onDeleteSource(source.id)}
                    disabled={deletingSourceId === source.id}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-muted-foreground mt-2 text-[11px]">
                  Durum: {source.processingStatus}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-border bg-secondary/20 mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12">
            <div className="bg-card border-border mb-4 flex h-12 w-12 items-center justify-center rounded-full border">
              <LinkIcon className="text-muted-foreground h-5 w-5" />
            </div>
            <h4 className="text-foreground mb-1 text-sm font-semibold">
              Website Kaynagi Yok
            </h4>
            <p className="text-muted-foreground max-w-xs text-center text-xs leading-relaxed">
              Yeni website kaynagi eklemek icin sol ustteki + butonunu kullan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteTab;
