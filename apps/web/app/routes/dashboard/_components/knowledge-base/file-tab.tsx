import { FileText, Trash2 } from "lucide-react";
import TabHeader from "./tab-header";

const FileTab = () => {
  // Dummy dosya listesi
  const files = [
    { name: "müşteri-destek-rehberi.pdf", size: "1.2 MB" },
    { name: "SSS.docx", size: "350 KB" },
    { name: "teknik-dokuman.txt", size: "78 KB" },
  ];
  return (
    <div>
      <TabHeader title="Dosya" />
      <div className="px-4">
        {/* Cards */}
        <div className="space-y-4">
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground truncate max-w-[160px]">
                    {file.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
              </div>
              <button
                type="button"
                className="cursor-pointer  ml-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md p-2 transition-colors"
                title="Sil"
                aria-label="Sil"
                // onClick={() => handleDelete(file)}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* New File Dropzone */}
        <div className="mt-12 flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/30 hover:bg-secondary transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-muted-foreground" />
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">
            Yeni Dosya Ekle
          </h4>
          <p className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
            Bilgi bankanızı geliştirmek için yeni PDF, Word veya metin dosyaları
            ekleyin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileTab;
