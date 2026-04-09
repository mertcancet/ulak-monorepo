/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <> */
import { ArrowDownLeft, ArrowUpRight, Smile } from "lucide-react";
import type React from "react";
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
    className={`bg-card border-border rounded-2xl border p-6 shadow-sm ${className}`}
  >
    <div className="mb-6">
      <h3 className="text-foreground/80 text-sm font-bold tracking-tight uppercase">
        {title}
      </h3>
      {subtitle && (
        <p className="text-muted-foreground mt-1 text-[10px] font-medium">
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </div>
);

export const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {/* Call Volume Chart */}
      <ChartCard
        title="Çağrı Sayıları"
        subtitle="Zaman içindeki değişim"
        className="md:col-span-8"
      >
        <div className="flex h-64 flex-col justify-end">
          <div className="border-border/50 relative flex flex-1 items-end gap-1 border-b px-2 pb-2">
            <svg
              className="text-primary h-full w-full overflow-visible"
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
            <div className="bg-foreground text-background absolute top-0 left-[50%] flex -translate-x-1/2 flex-col items-center rounded-lg px-2 py-1.5 text-[10px] font-bold shadow-xl">
              <span className="opacity-70">16 Şub</span>
              <span className="text-xs">156 Çağrı</span>
            </div>
          </div>
          <div className="text-muted-foreground mt-4 flex justify-between px-2 text-[10px] font-bold tracking-widest uppercase">
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
        <div className="flex h-64 flex-col justify-end">
          <div className="bg-primary/5 border-primary/10 relative flex flex-1 items-end overflow-hidden rounded-xl border">
            <svg
              className="text-primary/40 h-full w-full"
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
              <span className="text-primary/20 text-4xl font-black tracking-tighter">
                84
              </span>
            </div>
          </div>
          <div className="text-muted-foreground mt-4 flex justify-between text-[10px] font-bold">
            <span>17 Şub</span>
            <span>21 Şub</span>
          </div>
        </div>
      </ChartCard>

      {/* Success Rate Donut */}
      <ChartCard
        title="Çağrı Başarısı"
        subtitle="Tamamlanma durumu"
        className="flex flex-col items-center md:col-span-4"
      >
        <div className="relative mt-4 h-48 w-48">
          <svg
            className="h-full w-full -rotate-90 transform"
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
            <span className="text-muted-foreground text-[10px] font-bold uppercase">
              BAŞARILI
            </span>
          </div>
        </div>
        <div className="mt-8 w-full space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-2 w-2 rounded-full" />
              <span className="text-muted-foreground">Başarılı</span>
            </div>
            <span>976</span>
          </div>
          <div className="flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center gap-2">
              <div className="bg-secondary h-2 w-2 rounded-full" />
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
        className="flex flex-col items-center md:col-span-4"
      >
        <div className="mt-4 flex flex-col items-center gap-6">
          <div className="bg-success/10 ring-success/10 flex h-24 w-24 items-center justify-center rounded-full shadow-inner ring-4">
            <Smile className="text-success h-10 w-10" />
          </div>
          <div className="text-center">
            <p className="text-success text-2xl font-black tracking-tight">
              Pozitif
            </p>
            <p className="text-muted-foreground mt-1 text-[10px] font-bold uppercase">
              GENEL DURUM
            </p>
          </div>
          <div className="mt-4 grid w-full grid-cols-3 gap-2">
            <div className="bg-success/5 border-success/10 rounded-xl border p-3 text-center">
              <p className="text-success text-xs font-black">82%</p>
              <p className="text-muted-foreground mt-1 text-[9px] font-bold uppercase">
                Poz
              </p>
            </div>
            <div className="bg-secondary/30 border-border rounded-xl border p-3 text-center">
              <p className="text-muted-foreground text-xs font-black">14%</p>
              <p className="text-muted-foreground mt-1 text-[9px] font-bold uppercase">
                Nötr
              </p>
            </div>
            <div className="bg-destructive/5 border-destructive/10 rounded-xl border p-3 text-center">
              <p className="text-destructive text-xs font-black">4%</p>
              <p className="text-muted-foreground mt-1 text-[9px] font-bold uppercase">
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
        <div className="mt-8 flex h-32 items-end justify-center gap-6">
          <div className="flex flex-1 flex-col items-center gap-3">
            <div className="bg-primary/10 group hover:bg-primary/20 relative w-full rounded-t-xl transition-all">
              <div className="bg-primary absolute bottom-0 h-[80%] w-full rounded-t-xl transition-all" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 transition-opacity group-hover:opacity-100">
                80%
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowDownLeft className="text-primary h-3.5 w-3.5" />
              <span className="text-muted-foreground text-[10px] font-bold uppercase">
                Gelen
              </span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-3">
            <div className="bg-primary/10 group hover:bg-primary/20 relative w-full rounded-t-xl transition-all">
              <div className="bg-primary absolute bottom-0 h-[45%] w-full rounded-t-xl transition-all" />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black opacity-0 transition-opacity group-hover:opacity-100">
                45%
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="text-primary h-3.5 w-3.5" />
              <span className="text-muted-foreground text-[10px] font-bold uppercase">
                Giden
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 space-y-4">
          <div className="mb-1 flex items-end justify-between">
            <span className="text-xs font-bold">Cevaplama Oranı</span>
            <span className="text-success text-[10px] font-black">+2.4%</span>
          </div>
          <Progress value={92} className="h-2" />
          <p className="text-muted-foreground/80 text-[9px] leading-relaxed font-medium italic">
            "Toplam 240 deneme içinde 221 başarılı eşleşme sağlandı."
          </p>
        </div>
      </ChartCard>
    </div>
  );
};
