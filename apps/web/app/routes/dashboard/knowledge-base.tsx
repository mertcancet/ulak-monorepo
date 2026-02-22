import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Copy,
  Edit,
  Link as LinkIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "~/components/ui/button";

export default function KnowledgeBasePage() {
  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Sub-Sidebar: Bilgi Bankası Listesi */}
      <aside className="w-72 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-sm">Bilgi Bankası</h2>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8 ">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <div className="p-2 bg-secondary rounded-lg flex items-center gap-2 border border-border">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">website</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-background overflow-y-auto p-8 scrollbar-thin">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                website
              </h1>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  ID: know...1ce
                  <button
                    type="button"
                    className="hover:text-foreground transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </span>
                <span className="text-border">•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Yüklendi: 02/17/2026 12:14
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button>
                <Edit className="w-4 h-4" /> Düzenle
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-border hover:bg-secondary h-10 px-4 text-sm font-semibold"
              >
                <RotateCw className="w-4 h-4" /> Sayfaları Senkronize Et
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-border transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <div className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20">
                    <LinkIcon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      gumsoft.co
                    </h3>
                    <p className="text-xs text-muted-foreground">23 Sayfa</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>

            <div className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20">
                    <LinkIcon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      www.gumsoft.co
                    </h3>
                    <p className="text-xs text-muted-foreground">4 Sayfa</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          </div>

          {/* New Source Dropzone */}
          <div className="mt-12 flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/30 hover:bg-secondary transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-muted-foreground" />
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Yeni Kaynak Ekle
            </h4>
            <p className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
              Bilgi bankanızı geliştirmek için yeni web siteleri, PDF
              dokümanları veya manuel metinler ekleyin.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

const RotateCw = ({ className }: { className?: string }) => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);
