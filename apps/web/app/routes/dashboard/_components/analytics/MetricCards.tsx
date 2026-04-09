import { CheckCircle, Clock, TrendingUp } from "lucide-react";
import type React from "react";
import { cn } from "~/lib/utils";

interface MetricCardProps {
  title: string;
  subtitle: string;
  value: string;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
}

const MetricCard = ({
  title,
  subtitle,
  value,
  trend,
  trendType,
  icon,
}: MetricCardProps) => (
  <div className="bg-card border-border group relative overflow-hidden rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md">
    <div className="mb-4 flex items-start justify-between">
      <div>
        <p className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
          {title}
        </p>
        <p className="text-muted-foreground/60 text-[10px] font-medium">
          {subtitle}
        </p>
      </div>
      <div className="bg-secondary/50 group-hover:bg-primary/10 rounded-xl p-2 transition-colors">
        {icon}
      </div>
    </div>

    <div className="flex items-end gap-3">
      <h2 className="text-3xl font-black tracking-tight">{value}</h2>
      {trend && (
        <span
          className={cn(
            "mb-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
            trendType === "positive"
              ? "bg-success/10 text-success"
              : trendType === "negative"
                ? "bg-destructive/10 text-destructive"
                : "bg-secondary text-muted-foreground",
          )}
        >
          {trendType === "positive" && <TrendingUp className="h-3 w-3" />}
          {trend}
        </span>
      )}
    </div>

    {/* Subtle progress background */}
    <div
      className="bg-primary/20 absolute bottom-0 left-0 h-1 transition-all duration-1000"
      style={{ width: "40%" }}
    />
  </div>
);

export const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <MetricCard
        title="Toplam Çağrı Sayısı"
        subtitle="Tüm asistanlar"
        value="1,284"
        trend="+12%"
        trendType="positive"
        icon={<TrendingUp className="text-primary h-4 w-4" />}
      />
      <MetricCard
        title="Ortalama Çağrı Süresi"
        subtitle="Tüm asistanlar"
        value="2dk 14sn"
        trend="-4s"
        trendType="positive"
        icon={<Clock className="text-primary h-4 w-4" />}
      />
      <MetricCard
        title="Gecikme Süresi (Latency)"
        subtitle="Tüm asistanlar"
        value="820ms"
        trend="Mükemmel"
        trendType="positive"
        icon={<CheckCircle className="text-success h-4 w-4" />}
      />
    </div>
  );
};
