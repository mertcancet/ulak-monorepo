import type { TimelineItem } from "@/features/useCases/types";

interface ActionTimelineProps {
  items: TimelineItem[];
}

/**
 * ActionTimeline
 * Aksiyon zaman çizelgesini gösteren bileşen
 */
export function ActionTimeline({ items }: ActionTimelineProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
        Aksiyon Timeline:
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
              {item.time}
            </div>
            {index < items.length - 1 && (
              <div className="my-1 h-8 w-0.5 bg-gray-200" />
            )}
          </div>
          <div className="flex flex-col gap-1 pb-4">
            <p className="text-sm text-gray-700">{item.step}</p>
            <span className="inline-block w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
