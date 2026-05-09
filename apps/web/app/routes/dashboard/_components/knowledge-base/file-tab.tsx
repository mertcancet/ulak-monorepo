import { FileText, Trash2 } from "lucide-react";
import type { KnowledgeBase } from "~/lib/knowledge-base-api";

type FileTabProps = {
  items: KnowledgeBase[];
  onDelete: (id: string) => void;
  isDeleting: boolean;
  deletingId: string | null;
};

const FileTab = ({ items, onDelete, isDeleting, deletingId }: FileTabProps) => {
  return (
    <div>
      <div className="border-border mb-8 flex h-16 items-center border-b px-4">
        <h1 className="text-foreground text-xl font-bold">Dosya</h1>
        <span className="text-muted-foreground ml-3 text-sm">
          ({items.length} kaynak)
        </span>
      </div>
      <div className="px-4">
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map(file => (
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
                      {file.fileName ?? file.name}
                    </h3>
                    {file.fileUrl && (
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground truncate text-xs"
                      >
                        {file.fileUrl}
                      </a>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-3 cursor-pointer rounded-md p-2 transition-colors"
                  title="Sil"
                  aria-label="Sil"
                  onClick={() => onDelete(file.id)}
                  disabled={isDeleting && deletingId === file.id}
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
