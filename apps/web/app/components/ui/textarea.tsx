import type * as React from "react";

import { cn } from "~/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-background border-border placeholder:text-muted-foreground text-foreground focus:border-ring focus:ring-ring/20 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-xl border px-3 py-2 text-sm transition-[color,box-shadow] outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
