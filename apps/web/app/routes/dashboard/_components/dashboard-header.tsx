import React from "react";

const DashboardHeader: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 z-50">
      {children}
    </header>
  );
};

export default DashboardHeader;
