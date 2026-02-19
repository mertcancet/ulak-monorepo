import React from "react";
import {
  BookOpen,
  Plus,
  Link as LinkIcon,
  CheckCircle2,
  Edit3,
  RotateCw,
  Trash2,
  Copy,
  Search,
  Globe,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

const KnowledgeBaseItem = ({
  icon: Icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) => (
  <div
    className={cn(
      "p-2.5 rounded-xl flex items-center gap-3 border transition-all duration-200 cursor-pointer group",
      active
        ? "bg-primary/10 border-primary/20 text-primary shadow-sm"
        : "bg-card/50 border-border hover:bg-secondary/50 hover:border-border text-muted-foreground hover:text-foreground",
    )}
  >
    <div
      className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
        active
          ? "bg-primary text-white"
          : "bg-secondary text-muted-foreground group-hover:text-foreground",
      )}
    >
      <Icon className="w-4 h-4" />
    </div>
    <span className="text-sm font-semibold">{label}</span>
  </div>
);

const SourceCard = ({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: any;
}) => (
  <div className="group bg-card border border-border rounded-2xl p-4 hover:shadow-lg hover:border-primary/20 transition-all duration-300 glass">
    <div className="flex items-center justify-between cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-500/10 dark:bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/20">
          <Icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-sm font-bold text-foreground tracking-tight">
            {title}
          </h3>
          <p className="text-xs font-medium text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </Button>
        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </div>
  </div>
);

export default function KnowledgeBasePage() {
  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Sub-Sidebar: Knowledge Base List */}
      <aside className="w-72 flex-shrink-0 border-r border-border bg-card/30 backdrop-blur-sm flex flex-col z-10">
        <div className="p-4 h-14 border-b border-border flex items-center justify-between bg-card/50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-sm tracking-tight capitalize">
              Bilgi Bankası
            </h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-primary text-white hover:bg-primary/90 rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 space-y-2 flex-1 overflow-y-auto scrollbar-thin">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ara..."
              className="w-full pl-9 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
          <KnowledgeBaseItem icon={Globe} label="website" active={true} />
          {/* Add more mock items if needed */}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-mesh custom-scroll">
        <div className="max-w-4xl mx-auto p-8 pt-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-foreground tracking-tighter">
                  website
                </h1>
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-bold px-2 py-0.5"
                >
                  Aktif
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded-md border border-border">
                  ID: know...1ce
                  <button className="hover:text-primary transition-colors">
                    <Copy className="w-3 h-3" />
                  </button>
                </span>
                <span className="hidden sm:block text-border text-lg font-light leading-none">
                  •
                </span>
                <span className="flex items-center gap-1.5 px-2 py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Yüklendi: 02/17/2026 12:14
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button className="h-10 gap-2 font-bold gradient-primary shadow-lg shadow-primary/10">
                <Edit3 className="w-3.5 h-3.5" />
                <span>Düzenle</span>
              </Button>
              <Button
                variant="outline"
                className="h-10 gap-2 font-bold bg-card border-border hover:bg-secondary"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  Sayfaları Senkronize Et
                </span>
                <span className="sm:hidden text-xs">Senkronize Et</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/5 border-border"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator className="mb-8 opacity-50" />

          {/* Sources Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold tracking-tight text-foreground/80 uppercase tracking-widest">
                Kaynaklar
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-bold text-primary hover:bg-primary/5 h-8"
              >
                Tümünü Gör
              </Button>
            </div>

            <div className="grid gap-3">
              <SourceCard
                title="gumsoft.co"
                subtitle="23 Sayfa"
                icon={LinkIcon}
              />
              <SourceCard
                title="www.gumsoft.co"
                subtitle="4 Sayfa"
                icon={LinkIcon}
              />
            </div>

            {/* Empty State / Add New Source */}
            <div className="mt-8 flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/10 hover:bg-secondary/20 hover:border-primary/20 transition-all duration-300 group cursor-pointer group">
              <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-border group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">
                Yeni Kaynak Ekle
              </h4>
              <p className="text-sm font-medium text-muted-foreground text-center max-w-xs leading-relaxed">
                Bilgi bankanızı geliştirmek için yeni web siteleri, PDF
                dokümanları veya manuel metinler ekleyin.
              </p>
              <Button
                variant="link"
                className="mt-4 text-primary font-bold gap-2"
              >
                <span>Başla</span>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Statistics/Info (Optional but adds to premium feel) */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border glass">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Toplam Kelime
              </p>
              <h3 className="text-2xl font-black tracking-tight">124.5k</h3>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border glass">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Son Eğitim
              </p>
              <h3 className="text-2xl font-black tracking-tight">2s Önce</h3>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border glass">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                Güven Skoru
              </p>
              <h3 className="text-2xl font-black tracking-tight">98%</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
