import { FileText, Trash2 } from "lucide-react";
import type {
  KnowledgeBaseItem,
  KnowledgeBaseSource,
} from "~/lib/knowledge-base-api";
import TabHeader from "./tab-header";

type FileTabProps = {
  knowledgeBase: KnowledgeBaseItem | null;
  files: KnowledgeBaseSource[];
  onDeleteSource: (sourceId: string) => void;
  deletingSourceId: string | null;
  onDeleteKnowledgeBase: () => void;
  isDeletingKnowledgeBase: boolean;
};

const formatBytes = (bytes: number | null) => {
  if (!bytes) return "-";

  if (bytes < 1024) return `${bytes} B`;

  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;

  return `${(kb / 1024).toFixed(1)} MB`;
};

const FileTab = ({
  knowledgeBase,
  files,
  onDeleteSource,
  deletingSourceId,
  onDeleteKnowledgeBase,
  isDeletingKnowledgeBase,
}: FileTabProps) => {
  return (
    <div>
      <TabHeader
        title="Dosya"
        knowledgeBase={knowledgeBase}
        sourceCount={files.length}
        onDeleteKnowledgeBase={onDeleteKnowledgeBase}
        isDeletingKnowledgeBase={isDeletingKnowledgeBase}
      />
      <div className="px-4">
        {files.length > 0 ? (
          <div className="space-y-4">
            {files.map(file => (
              <div
                key={file.id}
                className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate max-w-[220px]">
                      {file.fileName ?? file.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(file.fileSizeBytes)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="cursor-pointer ml-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md p-2 transition-colors"
                  title="Sil"
                  aria-label="Sil"
                  onClick={() => onDeleteSource(file.id)}
                  disabled={deletingSourceId === file.id}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/20">
            <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Dosya Kaynagi Yok
            </h4>
            <p className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
              Yeni dosya kaynagi eklemek icin sol ustteki + butonunu kullan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileTab;
