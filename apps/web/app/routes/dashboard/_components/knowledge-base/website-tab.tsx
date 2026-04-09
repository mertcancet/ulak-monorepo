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
                className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
                      <LinkIcon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground truncate max-w-[380px]">
                        {source.title}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate max-w-[380px]">
                        {source.websiteUrl ?? "URL bilgisi yok"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md p-2 transition-colors"
                    title="Sil"
                    aria-label="Sil"
                    onClick={() => onDeleteSource(source.id)}
                    disabled={deletingSourceId === source.id}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground">
                  Durum: {source.processingStatus}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/20">
            <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4">
              <LinkIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Website Kaynagi Yok
            </h4>
            <p className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
              Yeni website kaynagi eklemek icin sol ustteki + butonunu kullan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteTab;
