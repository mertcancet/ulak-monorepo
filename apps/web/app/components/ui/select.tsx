import type * as React from "react";
import { cn } from "~/lib/utils";

function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      data-slot="select"
      className={cn(
        "bg-background border-border focus:ring-ring/20 focus:border-ring text-foreground h-9 w-full rounded-lg border pr-8 pl-3 text-sm transition-colors outline-none focus:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export { Select };
