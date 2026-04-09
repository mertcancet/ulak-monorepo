import type React from "react";

const DashboardHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header className="h-14 border-b border-[#e5e7eb] bg-white flex items-center justify-between px-6 z-50 shrink-0">
      {children}
    </header>
  );
};

export default DashboardHeader;
