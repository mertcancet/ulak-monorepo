import { audienceStats } from "./constants";

export function AudienceStatsGrid() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {audienceStats.map(item => (
        <article
          key={item.label}
          className="bg-card border-border rounded-2xl border p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="text-muted-foreground text-xs">{item.label}</p>
            <item.icon className="text-brand h-4 w-4" />
          </div>
          <p className="text-foreground text-2xl font-semibold tracking-tight">
            {item.value}
          </p>
        </article>
      ))}
    </section>
  );
}
