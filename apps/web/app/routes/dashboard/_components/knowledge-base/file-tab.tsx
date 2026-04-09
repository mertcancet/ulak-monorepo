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
                className="group bg-card border-border flex items-center justify-between rounded-xl border p-4 transition-all hover:shadow-md"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div className="bg-primary/10 border-primary/20 flex h-10 w-10 items-center justify-center rounded-lg border">
                    <FileText className="text-primary h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-foreground max-w-[220px] truncate text-sm font-semibold">
                      {file.fileName ?? file.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {formatBytes(file.fileSizeBytes)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-3 cursor-pointer rounded-md p-2 transition-colors"
                  title="Sil"
                  aria-label="Sil"
                  onClick={() => onDeleteSource(file.id)}
                  disabled={deletingSourceId === file.id}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-border bg-secondary/20 mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12">
            <div className="bg-card border-border mb-4 flex h-12 w-12 items-center justify-center rounded-full border">
              <FileText className="text-muted-foreground h-5 w-5" />
            </div>
            <h4 className="text-foreground mb-1 text-sm font-semibold">
              Dosya Kaynagi Yok
            </h4>
            <p className="text-muted-foreground max-w-xs text-center text-xs leading-relaxed">
              Yeni dosya kaynagi eklemek icin sol ustteki + butonunu kullan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileTab;
