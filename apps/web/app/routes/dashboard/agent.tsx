import React from "react";
import {
  Home,
  Edit3,
  History as HistoryIcon,
  MoreHorizontal,
  Rocket,
  Brain,
  Mic2,
  Languages,
  Timer,
  ChevronRight,
  LayoutGrid,
  BookOpen,
  Settings2,
  Subtitles,
  PhoneCall,
  BarChart2,
  ShieldCheck,
  Webhook,
  Puzzle,
  Mic,
  Info,
  ChevronDown,
  Code,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";

const ConfigSection = ({
  icon: Icon,
  label,
  active = false,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) => (
  <button
    className={cn(
      "w-full flex items-center justify-between p-4 transition-all duration-200 group hover:bg-secondary/50",
      active
        ? "bg-secondary text-foreground"
        : "text-muted-foreground hover:text-foreground",
    )}
  >
    <div className="flex items-center space-x-3">
      <Icon
        className={cn(
          "w-5 h-5",
          active
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground",
        )}
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
  </button>
);

export default function AgentConfigPage() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden relative">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 transition-opacity duration-300">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-secondary/50 rounded-lg"
          >
            <Home className="h-4 w-4 text-muted-foreground" />
          </Button>
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-bold tracking-tight">
              Sağlık Randevu Kontrolü (şablondan)
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          </div>
          <div className="hidden md:flex items-center space-x-3 text-[11px] text-muted-foreground/70 border-l border-border pl-4">
            <span className="font-medium">Agent ID: ag_863...</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="font-medium">Model: GPT 4.1</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="font-medium">Gecikme: 820-1150ms</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Tabs defaultValue="configure" className="mr-6">
            <TabsList className="bg-transparent h-14 border-b-0 gap-8">
              <TabsTrigger
                value="configure"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 h-14 text-sm font-semibold"
              >
                Yapılandır
              </TabsTrigger>
              <TabsTrigger
                value="simulation"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 h-14 text-sm font-semibold text-muted-foreground"
              >
                Simülasyon
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <HistoryIcon className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="h-9 gap-2 font-bold gradient-primary shadow-lg shadow-primary/20"
            >
              <Rocket className="h-3.5 w-3.5" />
              <span>Yayınla</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4 bg-mesh">
        {/* Left Column: Configuration Canvas */}
        <div className="flex-1 flex flex-col space-y-4 min-w-[400px]">
          {/* Quick Select Tools */}
          <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm border border-border p-2 rounded-xl shadow-sm glass">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 bg-background/50 border-border hover:bg-secondary"
            >
              <Brain className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold">GPT 4.1</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-2 bg-background/50 border-border hover:bg-secondary"
            >
              <Mic2 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold">Caner (Doğal)</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto h-8 gap-2 bg-background/50 border-border hover:bg-secondary"
            >
              <Languages className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Türkçe
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </Button>
          </div>

          {/* Prompt Editor */}
          <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden glass">
            <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/20">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-4 bg-primary rounded-full" />
                <h2 className="text-sm font-bold tracking-tight">
                  Sistem Talimatları
                </h2>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Markdown desteklenir
              </span>
            </div>
            <div className="flex-1 p-0 flex flex-col">
              <Textarea
                className="flex-1 border-none focus-visible:ring-0 bg-transparent text-sm leading-relaxed p-6 resize-none font-medium text-foreground/80 scrollbar-thin"
                placeholder="Agent talimatlarını buraya girin..."
                defaultValue={`## Kimlik
Siz, Retell Sağlık'ın randevu departmanından Kate'siniz. Cindy'yi yıllık kontrolü için hazırlamak üzere arıyorsunuz. Kibar, cana yakın ve kullanıcıya değer veren bir resepsiyonist gibi davranın. Tıbbi tavsiye vermeyin ancak kullanıcı yanıtlarını anlamak için tıbbi bilgi kullanın.

## Stil Kuralları
- Kısa Olun: Her defasında tek bir konuyu ele alarak özlü cevaplar verin.
- Çeşitlilik: Netliği artırmak için içeriği tekrarlamadan farklı ifadeler kullanın.
- Konuşkan Olun: Günlük dil kullanın, sohbetin bir arkadaşla yapılıyormuş gibi hissettirmesini sağlayın.
- Proaktif Olun: Sohbeti yönlendirin, genellikle bir soru veya sonraki adım önerisiyle bitirin.
- Tek seferde birden fazla soru sormaktan kaçının.

## Görevler
1. Kendinizi tanıtın ve aranan kişinin Cindy olduğunu doğrulayın.
2. Cindy'ye 4 Nisan 2024, saat 10:00'da yıllık sağlık kontrolü olduğunu hatırlatın. Uygun olup olmadığını kontrol edin.
3. Kontrolden önce doktorun bilmesi gereken bir durum olup olmadığını sorun.
4. Kontrolden önceki gün bir şey yiyip içmemesi gerektiğini hatırlatın.`}
              />
            </div>
          </div>

          {/* greeting Message Section */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm shadow-black/5 glass">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold tracking-tight">
                Karşılama Mesajı
              </h2>
              <Badge
                variant="outline"
                className="text-[10px] font-bold gap-1.5 border-border bg-secondary/50 py-0.5"
              >
                <Timer className="w-2.5 h-2.5" />
                Konuşma Öncesi Duraklatma: 0s
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col items-start gap-1 justify-center bg-background/50 border-border hover:bg-secondary hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-foreground/80">
                    Önce AI Konuşur
                  </span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">
                  Statik karşılama mesajı
                </span>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-3 px-4 flex flex-col items-start gap-1 justify-center bg-background/50 border-border hover:bg-secondary hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-foreground/80">
                    Dinamik Mesaj
                  </span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">
                  API üzerinden tetiklenen mesaj
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Middle Column: Configuration Panel */}
        <div className="w-80 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden glass">
          <ScrollArea className="h-full">
            <div className="divide-y divide-border">
              <ConfigSection icon={LayoutGrid} label="Fonksiyonlar" />
              <ConfigSection icon={BookOpen} label="Bilgi Bankası" />
              <ConfigSection icon={Settings2} label="Konuşma Ayarları" />
              <ConfigSection icon={Subtitles} label="Canlı Transkripsiyon" />
              <ConfigSection icon={PhoneCall} label="Çağrı Ayarları" />
              <ConfigSection icon={BarChart2} label="Çağrı Sonrası Veri" />
              <ConfigSection icon={ShieldCheck} label="Güvenlik ve Yedekleme" />
              <ConfigSection icon={Webhook} label="Webhook Ayarları" />
              <ConfigSection icon={Puzzle} label="MCP Entegrasyonları" />
            </div>
          </ScrollArea>
        </div>

        {/* Right Column: Testing Panel */}
        <div className="w-1/3 flex flex-col bg-card border border-border rounded-xl shadow-lg border-primary/10 overflow-hidden glass relative overflow-hidden">
          <div className="p-2 border-b border-border flex items-center justify-between bg-secondary/30 backdrop-blur-sm">
            <div className="flex space-x-1 bg-background/50 p-1 rounded-lg border border-border flex-1 shadow-inner">
              <button className="flex-1 flex items-center justify-center space-x-2 py-1.5 px-3 bg-white shadow-sm rounded-md text-xs font-bold transition-all">
                <PhoneCall className="w-3.5 h-3.5 text-primary" />
                <span>Ses Testi</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-1.5 px-3 text-muted-foreground text-xs font-bold hover:bg-background/80 rounded-md transition-all">
                <MessagesSquare className="w-3.5 h-3.5" />
                <span>Sohbet Testi</span>
              </button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-8 w-8 text-muted-foreground hover:bg-background/80"
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-10">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20" />
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-xl shadow-primary/20 transition-transform group-hover:scale-105">
                <Mic className="text-white w-8 h-8" />
              </div>
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-2">
              Temsilciyi Test Et
            </h3>
            <p className="text-sm text-muted-foreground max-w-[260px] mb-8 font-medium">
              Yapılandırmanızın nasıl çalıştığını gerçek zamanlı olarak
              deneyimleyin.
            </p>

            <div className="bg-primary/5 text-primary text-[11px] py-2 px-4 rounded-full flex items-center space-x-2 mb-8 font-bold border border-primary/10">
              <Info className="w-3.5 h-3.5" />
              <span>Web aramalarında çağrı aktarma desteklenmez.</span>
            </div>

            <Button
              size="lg"
              className="px-10 h-12 font-bold gradient-primary shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-[0.98]"
            >
              Testi Başlat
            </Button>
          </div>

          {/* Decorative background pulse for testing panel */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
        </div>
      </main>

      {/* Footer */}
      <footer className="h-8 border-t border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-4 text-[10px] text-muted-foreground font-bold uppercase tracking-widest shrink-0">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            Sistem Hazır
          </span>
          <span className="opacity-50">•</span>
          <span>API Versiyon: v2.4</span>
        </div>
        <div className="flex items-center space-x-6">
          <span className="hover:text-primary cursor-pointer transition-colors">
            Dokümantasyon
          </span>
          <span className="hover:text-primary cursor-pointer transition-colors">
            Destek
          </span>
        </div>
      </footer>
    </div>
  );
}

const MessagesSquare = ({ className }: { className?: string }) => (
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
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M13 8H7" />
    <path d="M13 12H7" />
  </svg>
);
