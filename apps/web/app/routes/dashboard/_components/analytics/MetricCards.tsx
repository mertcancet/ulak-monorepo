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
  <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden glass">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
          {title}
        </p>
        <p className="text-[10px] text-muted-foreground/60 font-medium">
          {subtitle}
        </p>
      </div>
      <div className="p-2 bg-secondary/50 rounded-xl group-hover:bg-primary/10 transition-colors">
        {icon}
      </div>
    </div>

    <div className="flex items-end gap-3">
      <h2 className="text-3xl font-black tracking-tight">{value}</h2>
      {trend && (
        <span
          className={cn(
            "flex items-center gap-1 text-[11px] font-bold py-0.5 px-2 rounded-full mb-1",
            trendType === "positive"
              ? "bg-success/10 text-success"
              : trendType === "negative"
                ? "bg-destructive/10 text-destructive"
                : "bg-secondary text-muted-foreground",
          )}
        >
          {trendType === "positive" && <TrendingUp className="w-3 h-3" />}
          {trend}
        </span>
      )}
    </div>

    {/* Subtle progress background */}
    <div
      className="absolute bottom-0 left-0 h-1 bg-primary/20 transition-all duration-1000"
      style={{ width: "40%" }}
    />
  </div>
);

export const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Toplam Çağrı Sayısı"
        subtitle="Tüm asistanlar"
        value="1,284"
        trend="+12%"
        trendType="positive"
        icon={<TrendingUp className="w-4 h-4 text-primary" />}
      />
      <MetricCard
        title="Ortalama Çağrı Süresi"
        subtitle="Tüm asistanlar"
        value="2dk 14sn"
        trend="-4s"
        trendType="positive"
        icon={<Clock className="w-4 h-4 text-primary" />}
      />
      <MetricCard
        title="Gecikme Süresi (Latency)"
        subtitle="Tüm asistanlar"
        value="820ms"
        trend="Mükemmel"
        trendType="positive"
        icon={<CheckCircle className="w-4 h-4 text-success" />}
      />
    </div>
  );
};
