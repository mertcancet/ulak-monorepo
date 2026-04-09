import type * as React from "react";
import { cn } from "~/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-9 px-3 text-sm bg-background border border-border rounded-lg outline-none transition-colors focus:ring-2 focus:ring-ring/20 focus:border-ring placeholder:text-muted-foreground text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
