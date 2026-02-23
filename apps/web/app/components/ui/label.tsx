import { Label as LabelPrimitive } from "radix-ui";
import type * as React from "react";

import { cn } from "~/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-[11px] uppercase tracking-wider text-muted-foreground/80 ml-1",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
