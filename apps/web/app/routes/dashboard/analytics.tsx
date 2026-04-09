import { UserMinus } from "lucide-react";
import { AnalyticsCharts } from "./_components/analytics/AnalyticsCharts";
import { AnalyticsHeader } from "./_components/analytics/AnalyticsHeader";
import { MetricCards } from "./_components/analytics/MetricCards";
import { PerformanceTable } from "./_components/analytics/PerformanceTable";

export default function AnalyticsPage() {
  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <AnalyticsHeader />

      <main className="scrollbar-thin flex-1 space-y-8 overflow-y-auto p-8">
        <MetricCards />

        <AnalyticsCharts />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <PerformanceTable />
          </div>

          <div className="space-y-6 md:col-span-4">
            <div className="bg-card border-border flex h-full flex-col items-center justify-center rounded-2xl border p-8 text-center shadow-sm">
              <div className="bg-primary/10 ring-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ring-4">
                <UserMinus className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-primary mb-2 text-4xl font-black tracking-tighter">
                8.4%
              </h3>
              <p className="text-muted-foreground text-[10px] font-black tracking-[0.2em] uppercase">
                İnsan Operatöre Aktarım
              </p>
              <div className="border-border mt-8 w-full border-t pt-8">
                <div className="text-muted-foreground mb-4 flex items-center justify-between text-[10px] font-bold">
                  <span>TREND (SON 30 GÜN)</span>
                  <span className="text-success">-1.2%</span>
                </div>
                <div className="flex h-10 items-end gap-1">
                  {[40, 60, 45, 70, 50, 80, 55, 65, 45, 60].map((h, i) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: <>
                      key={i}
                      className="bg-primary/20 hover:bg-primary/40 flex-1 rounded-t-sm transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Toggle for Dark Mode as requested in mock (though layout might handle it) */}
        {/* The user mock had a fixed button, but we should stick to the existing app pattern if possible. */}
      </main>
    </div>
  );
}
