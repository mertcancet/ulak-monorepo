import {
  File as FileIcon,
  FileText,
  Link,
  Plus,
  Upload,
  X,
} from "lucide-react";
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

export type CreateKnowledgeBaseDialogInput = {
  knowledgeBaseName: string;
  sourceType: "website" | "file" | "text";
  websiteUrl?: string;
  textContent?: string;
  files: File[];
};

type AddKnowledgeBaseDialogProps = {
  isSubmitting: boolean;
  onCreate: (input: CreateKnowledgeBaseDialogInput) => Promise<void>;
};

const AddKnowledgeBaseDialog = ({
  isSubmitting,
  onCreate,
}: AddKnowledgeBaseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [sourceType, setSourceType] = useState<"website" | "file" | "text">(
    "website",
  );
  const [knowledgeBaseName, setKnowledgeBaseName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const resetForm = () => {
    setSourceType("website");
    setKnowledgeBaseName("");
    setWebsiteUrl("");
    setTextContent("");
    setUploadedFiles([]);
    setFormError(null);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const trimmedName = knowledgeBaseName.trim();

    if (!trimmedName) {
      setFormError("Bilgi bankasi adi zorunludur.");
      return;
    }

    if (sourceType === "website" && !websiteUrl.trim()) {
      setFormError("Website URL zorunludur.");
      return;
    }

    if (sourceType === "text" && !textContent.trim()) {
      setFormError("Metin kaynagi icin icerik zorunludur.");
      return;
    }

    if (sourceType === "file" && uploadedFiles.length === 0) {
      setFormError("En az bir dosya secmelisin.");
      return;
    }

    setFormError(null);

    try {
      await onCreate({
        knowledgeBaseName: trimmedName,
        sourceType,
        websiteUrl: websiteUrl.trim(),
        textContent: textContent.trim(),
        files: uploadedFiles,
      });

      resetForm();
      setOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Olusturma islemi basarisiz.";
      setFormError(message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={nextOpen => {
        setOpen(nextOpen);
        if (!nextOpen && !isSubmitting) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Yeni Bilgi Bankasi Olustur
            </DialogTitle>
            <DialogDescription className="text-sm mt-1">
              Bilgi bankani gelistirmek icin website, dosya veya manuel metin
              kaynagi ekle.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label
                htmlFor="knowledge-base-name"
                className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 ml-1"
              >
                Bilgi Bankasi Adi
              </Label>
              <Input
                id="knowledge-base-name"
                value={knowledgeBaseName}
                onChange={event => setKnowledgeBaseName(event.target.value)}
                placeholder="Orn: Musteri Destek Dokumanlari"
                className="h-11 bg-secondary/30 border-border/50 focus:bg-background transition-all"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80 ml-1">
                Kaynak Turu Sec
              </Label>
              <RadioGroup
                value={sourceType}
                onValueChange={value =>
                  setSourceType(value as "website" | "file" | "text")
                }
                className="grid grid-cols-3 gap-3"
              >
                <Label
                  htmlFor="website-source"
                  className={cn(
                    "flex flex-row items-start text-center gap-3 rounded-2xl border border-transparent p-4 transition-all cursor-pointer h-full",
                    "hover:bg-secondary/40",
                    "[&:has([data-state=checked])]:bg-secondary/90 [&:has([data-state=checked])]:border-border/50",
                  )}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background shadow-sm">
                    <Link className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="flex flex-col items-start gap-1 flex-1">
                    <span className="text-[14px] font-semibold text-foreground leading-tight">
                      Website
                    </span>
                    <span className="text-[11px] text-muted-foreground font-normal leading-tight">
                      Site URL ekle
                    </span>
                  </div>
                  <RadioGroupItem
                    value="website"
                    id="website-source"
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background shadow-sm">
                    <Upload className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="flex flex-col items-start gap-1 flex-1">
                    <span className="text-[14px] font-semibold text-foreground leading-tight">
                      Dosya
                    </span>
                    <span className="text-[11px] text-left text-muted-foreground font-normal leading-tight">
                      PDF, DOC, TXT
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background shadow-sm">
                    <FileText className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="flex flex-col items-start gap-1 flex-1">
                    <span className="text-[14px] font-semibold text-foreground leading-tight">
                      Metin
                    </span>
                    <span className="text-[11px] text-muted-foreground font-normal leading-tight">
                      Manuel metin gir
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

            <div className="space-y-4 pt-2 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
              {sourceType === "website" && (
                <div className="space-y-2">
                  <Label
                    htmlFor="website-url"
                    className="text-xs font-semibold"
                  >
                    Website URL
                  </Label>
                  <Input
                    id="website-url"
                    value={websiteUrl}
                    onChange={event => setWebsiteUrl(event.target.value)}
                    placeholder="https://example.com"
                    className="h-11"
                    disabled={isSubmitting}
                  />
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
                    accept=".pdf,.doc,.docx,.txt"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border/50 rounded-xl p-8 flex flex-col items-center justify-center bg-secondary/10 hover:bg-secondary/20 transition-all cursor-pointer"
                    disabled={isSubmitting}
                  >
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Dosya Sec</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Desteklenenler: PDF, DOC, DOCX, TXT
                    </p>
                  </button>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase text-muted-foreground/80 ml-1">
                        Secilen Dosyalar ({uploadedFiles.length})
                      </Label>
                      <div className="max-h-[160px] overflow-y-auto space-y-2 pr-1">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/40"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-background rounded border border-border/50">
                                <FileIcon className="w-4 h-4 text-primary/70" />
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
                              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              onClick={event => {
                                event.stopPropagation();
                                removeFile(index);
                              }}
                              disabled={isSubmitting}
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
                    Manuel Icerik
                  </Label>
                  <textarea
                    id="manual-text"
                    className="w-full min-h-[120px] rounded-xl border border-border/50 bg-secondary/30 p-3 text-sm focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Bilgi bankasina eklemek istedigin metni buraya yapistir..."
                    value={textContent}
                    onChange={event => setTextContent(event.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              )}
            </div>

            {formError && (
              <p className="text-sm font-medium text-destructive">
                {formError}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 pt-2">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="h-10 px-6 font-medium"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Iptal
            </Button>
          </DialogClose>
          <Button
            className="h-10 px-8 font-semibold"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Olusturuluyor..." : "Olustur"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddKnowledgeBaseDialog;
