import type * as React from "react";
import { cn } from "~/lib/utils";

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<"div"> & { value?: number }) {
  return (
    <div
      data-slot="progress"
      className={cn(
        "bg-secondary relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className="bg-brand h-full transition-all"
        style={{ width: `${value || 0}%` }}
      />
    </div>
  );
}

export { Progress };
