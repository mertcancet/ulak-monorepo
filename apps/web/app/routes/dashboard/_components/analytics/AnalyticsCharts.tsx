import React from "react";
import {
  PhoneCall,
  BarChart3,
  Smile,
  UserMinus,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
} from "lucide-react";
import { Progress } from "~/components/ui/progress";

const ChartCard = ({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-card border border-border p-6 rounded-2xl shadow-sm glass ${className}`}
  >
    <div className="mb-6">
      <h3 className="font-bold tracking-tight text-sm uppercase tracking-widest text-foreground/80">
        {title}
      </h3>
      {subtitle && (
        <p className="text-[10px] text-muted-foreground font-medium mt-1">
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </div>
);

export const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Call Volume Chart */}
      <ChartCard
        title="Çağrı Sayıları"
        subtitle="Zaman içindeki değişim"
        className="md:col-span-8"
      >
        <div className="h-64 flex flex-col justify-end">
          <div className="flex-1 flex items-end gap-1 px-2 pb-2 border-b border-border/50 relative">
            <svg
              className="w-full h-full text-primary overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 1000 200"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity="0.2"
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              <path
                d="M0,180 L100,170 L200,175 L300,160 L400,165 L500,60 L600,150 L700,160 L800,170 L900,175 L1000,180"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0,180 L100,170 L200,175 L300,160 L400,165 L500,60 L600,150 L700,160 L800,170 L900,175 L1000,180 L1000,200 L0,200 Z"
                fill="url(#gradient)"
              />
              <circle
                cx="500"
                cy="60"
                r="6"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
                className="animate-pulse"
              />
            </svg>

            {/* Tooltip placeholder */}
            <div className="absolute top-0 left-[50%] -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1.5 rounded-lg shadow-xl font-bold flex flex-col items-center">
              <span className="opacity-70">16 Şub</span>
              <span className="text-xs">156 Çağrı</span>
            </div>
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <span>10 Şub</span>
            <span>14 Şub</span>
            <span className="text-primary">Bugün</span>
            <span>22 Şub</span>
          </div>
        </div>
      </ChartCard>

      {/* Concurrent Usage */}
      <ChartCard
        title="Eşzamanlı Kullanım"
        subtitle="Maksimum kanal kullanımı"
        className="md:col-span-4"
      >
        <div className="h-64 flex flex-col justify-end">
          <div className="flex-1 flex items-end bg-primary/5 rounded-xl border border-primary/10 overflow-hidden relative">
            <svg
              className="w-full h-full text-primary/40"
              preserveAspectRatio="none"
              viewBox="0 0 400 200"
            >
              <path
                d="M0,200 L50,195 L100,190 L150,198 L200,192 L250,190 L300,195 L350,80 L400,200 Z"
                fill="currentColor"
                fillOpacity="1"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-black text-primary/20 tracking-tighter">
                84
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-muted-foreground">
            <span>17 Şub</span>
            <span>21 Şub</span>
          </div>
        </div>
      </ChartCard>

      {/* Success Rate Donut */}
      <ChartCard
        title="Çağrı Başarısı"
        subtitle="Tamamlanma durumu"
        className="md:col-span-4 flex flex-col items-center"
      >
        <div className="relative w-48 h-48 mt-4">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              className="text-secondary"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
            />
            <circle
              className="text-primary"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray="251.2"
              strokeDashoffset="60"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black tracking-tighter">76%</span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              BAŞARILI
            </span>
          </div>
        </div>
        <div className="mt-8 space-y-3 w-full">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Başarılı</span>
            </div>
            <span>976</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-muted-foreground">Başarısız</span>
            </div>
            <span>308</span>
          </div>
        </div>
      </ChartCard>

      {/* Sentiment Analysis */}
      <ChartCard
        title="Duygu Analizi"
        subtitle="Kullanıcı geri bildirimi"
        className="md:col-span-4 flex flex-col items-center"
      >
        <div className="mt-4 flex flex-col items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center ring-4 ring-emerald-500/5 shadow-inner">
            <Smile className="w-10 h-10 text-emerald-500" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-black text-emerald-500 tracking-tight">
              Pozitif
            </p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
              GENEL DURUM
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full mt-4">
            <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">
              <p className="text-xs font-black text-emerald-600">82%</p>
              <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">
                Poz
              </p>
            </div>
            <div className="p-3 bg-secondary/30 rounded-xl border border-border text-center">
              <p className="text-xs font-black text-muted-foreground">14%</p>
              <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">
                Nötr
              </p>
            </div>
            <div className="p-3 bg-destructive/5 rounded-xl border border-destructive/10 text-center">
              <p className="text-xs font-black text-destructive">4%</p>
              <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1">
                Neg
              </p>
            </div>
          </div>
        </div>
      </ChartCard>

      {/* Inbound/Outbound Comparison */}
      <ChartCard
        title="Çağrı Yönü"
        subtitle="İletişim trafiği"
        className="md:col-span-4"
      >
        <div className="mt-8 flex items-end gap-6 h-32 justify-center">
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-primary/10 rounded-t-xl relative group transition-all hover:bg-primary/20">
              <div className="absolute bottom-0 w-full bg-primary rounded-t-xl h-[80%] transition-all" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                80%
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowDownLeft className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                Gelen
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <div className="w-full bg-indigo-500/10 rounded-t-xl relative group transition-all hover:bg-indigo-500/20">
              <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-xl h-[45%] transition-all" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                45%
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase">
                Giden
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 space-y-4">
          <div className="flex justify-between items-end mb-1">
            <span className="text-xs font-bold">Cevaplama Oranı</span>
            <span className="text-[10px] font-black text-emerald-500">
              +2.4%
            </span>
          </div>
          <Progress value={92} className="h-2" />
          <p className="text-[9px] font-medium text-muted-foreground/80 leading-relaxed italic">
            "Toplam 240 deneme içinde 221 başarılı eşleşme sağlandı."
          </p>
        </div>
      </ChartCard>
    </div>
  );
};
