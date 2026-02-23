import { File, FileText, Link, Plus, Upload, X } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { cn } from "~/lib/utils";

const AddKnowledgeBaseDialog = () => {
  const [sourceType, setSourceType] = useState("web");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 ">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Yeni Bilgi Bankası Oluştur
            </DialogTitle>
            <DialogDescription className="text-sm mt-1">
              Bilgi bankanızı geliştirmek için yeni web siteleri, PDF
              dokümanları veya manuel metinler ekleyin.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label
                htmlFor="knowledge-base-name"
                className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 ml-1"
              >
                Bilgi Bankası Adı
              </Label>
              <Input
                id="knowledge-base-name"
                placeholder="Örn: Müşteri Destek Dökümanları"
                className="h-11 bg-secondary/30 border-border/50 focus:bg-background transition-all"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 ml-1">
                Kaynak Türü Seçin
              </Label>
              <RadioGroup
                value={sourceType}
                onValueChange={setSourceType}
                className="grid grid-cols-3 gap-3"
              >
                <Label
                  htmlFor="web-source"
                  className={cn(
                    "flex flex-row items-start text-center gap-3 rounded-2xl border border-transparent p-4 transition-all cursor-pointer h-full",
                    "hover:bg-secondary/40",
                    "[&:has([data-state=checked])]:bg-secondary/90 [&:has([data-state=checked])]:border-border/50",
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background shadow-sm group-hover:scale-105 transition-transform">
                    <Link className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="flex flex-col items-start gap-1 flex-1">
                    <span className="text-[14px] font-semibold text-foreground leading-tight">
                      Web Sayfası
                    </span>
                    <span className="text-[11px] text-muted-foreground font-normal leading-tight">
                      Sitenizi tarayın ve bağlayın
                    </span>
                  </div>
                  <RadioGroupItem
                    value="web"
                    id="web-source"
                    className="sr-only"
                  />
                </Label>

                <Label
                  htmlFor="file-source"
                  className={cn(
                    "flex flex-row items-start text-center gap-3 rounded-2xl border border-transparent p-4 transition-all cursor-pointer h-full",
                    "hover:bg-secondary/40",
                    "[&:has([data-state=checked])]:bg-secondary/90 [&:has([data-state=checked])]:border-border/50",
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background shadow-sm group-hover:scale-105 transition-transform">
                    <Upload className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="flex flex-col items-start gap-1 flex-1">
                    <span className="text-[14px] font-semibold text-foreground leading-tight">
                      Dosya Yükle
                    </span>
                    <span className="text-[11px] text-left text-muted-foreground font-normal leading-tight">
                      PDF, Doc veya TXT (Maks 100MB)
                    </span>
                  </div>
                  <RadioGroupItem
                    value="file"
                    id="file-source"
                    className="sr-only"
                  />
                </Label>

                <Label
                  htmlFor="text-source"
                  className={cn(
                    "flex flex-row items-start text-center gap-3 rounded-2xl border border-transparent p-4 transition-all cursor-pointer h-full",
                    "hover:bg-secondary/40",
                    "[&:has([data-state=checked])]:bg-secondary/90 [&:has([data-state=checked])]:border-border/50",
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background shadow-sm group-hover:scale-105 transition-transform">
                    <FileText className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="flex flex-col items-start gap-1 flex-1">
                    <span className="text-[14px] font-semibold text-foreground leading-tight">
                      Metin Ekle
                    </span>
                    <span className="text-[11px] text-muted-foreground font-normal leading-tight">
                      Manuel olarak içerik girin
                    </span>
                  </div>
                  <RadioGroupItem
                    value="text"
                    id="text-source"
                    className="sr-only"
                  />
                </Label>
              </RadioGroup>
            </div>

            {/* Conditionally Rendered Sections */}
            <div className="space-y-4 pt-2 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
              {sourceType === "web" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="website-url"
                    className="text-xs font-semibold"
                  >
                    Web Sitesi URL'si
                  </Label>
                  <Input
                    id="website-url"
                    placeholder="https://example.com"
                    className="h-11"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Sitenizin tüm sayfaları otomatik olarak taranacaktır.
                  </p>
                </div>
              )}

              {sourceType === "file" && (
                <div className="space-y-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                    accept=".pdf,.docx,.txt"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={e =>
                      e.key === "Enter" && fileInputRef.current?.click()
                    }
                    className="border-2 border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center bg-secondary/10 hover:bg-secondary/20 transition-all cursor-pointer group"
                    tabIndex={0}
                  >
                    <Upload className="w-8 h-8 text-muted-foreground mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">
                      Dosyaları buraya bırakın veya seçin
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Desteklenenler: PDF, DOCX, TXT
                    </p>
                  </button>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">
                        Seçilen Dosyalar ({uploadedFiles.length})
                      </Label>
                      <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/40 group/item"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-background rounded border border-border/50">
                                <File className="w-4 h-4 text-primary/70" />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium truncate max-w-[200px]">
                                  {file.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover/item:opacity-100 transition-all"
                              onClick={e => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {sourceType === "text" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="manual-text"
                    className="text-xs font-semibold"
                  >
                    Manuel İçerik
                  </Label>
                  <textarea
                    id="manual-text"
                    className="w-full min-h-[120px] rounded-xl border border-border/50 bg-secondary/30 p-3 text-sm focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Bilgi bankasına eklemek istediğiniz metni buraya yapıştırın..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 pt-2 ">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="h-10 px-6 font-medium"
              onClick={() => {
                setSourceType("web");
                setUploadedFiles([]);
              }}
            >
              İptal
            </Button>
          </DialogClose>
          <Button className="h-10 px-8 font-semibold ">Oluştur</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddKnowledgeBaseDialog;
