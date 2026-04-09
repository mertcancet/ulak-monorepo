import type React from "react";

const DashboardHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header className="z-50 flex h-14 shrink-0 items-center border-b border-border bg-background px-6">
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        {children}
      </div>
    </header>
  );
};

export default DashboardHeader;
