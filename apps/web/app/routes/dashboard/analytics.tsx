import React from "react";
import { AnalyticsHeader } from "./_components/analytics/AnalyticsHeader";
import { MetricCards } from "./_components/analytics/MetricCards";
import { AnalyticsCharts } from "./_components/analytics/AnalyticsCharts";
import { PerformanceTable } from "./_components/analytics/PerformanceTable";
import { UserMinus } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <AnalyticsHeader />

      <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-mesh scrollbar-thin">
        <MetricCards />

        <AnalyticsCharts />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <PerformanceTable />
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm glass h-full flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-indigo-500/5">
                <UserMinus className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-4xl font-black text-indigo-500 tracking-tighter mb-2">
                8.4%
              </h3>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                İnsan Operatöre Aktarım
              </p>
              <div className="mt-8 pt-8 border-t border-border w-full">
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground mb-4">
                  <span>TREND (SON 30 GÜN)</span>
                  <span className="text-emerald-500">-1.2%</span>
                </div>
                <div className="h-10 flex items-end gap-1">
                  {[40, 60, 45, 70, 50, 80, 55, 65, 45, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500/40 transition-colors"
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
