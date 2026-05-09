import type * as React from "react";
import { cn } from "~/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode;
};

function Input({ className, type, prefix, ...props }: InputProps) {
  if (prefix) {
    return (
      <div className="flex w-full items-center rounded-lg border border-border bg-background focus-within:ring-2 focus-within:ring-ring/20 focus-within:border-ring transition-colors">
        <div className="flex items-center justify-center px-3 text-sm font-medium text-foreground border-r border-border whitespace-nowrap">
          {prefix}
        </div>

        <input
          type={type}
          data-slot="input"
          className={cn(
            "bg-background placeholder:text-muted-foreground text-foreground h-9 w-full px-3 text-sm transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-background border-border focus:ring-ring/20 focus:border-ring placeholder:text-muted-foreground text-foreground h-9 w-full rounded-lg border px-3 text-sm transition-colors outline-none focus:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
