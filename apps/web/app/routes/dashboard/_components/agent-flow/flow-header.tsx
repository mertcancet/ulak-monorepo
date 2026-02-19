import React from "react";

export const FlowHeader: React.FC = () => {
  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <div className="p-1.5 bg-secondary/50 rounded">
          <span className="material-icons-outlined text-muted-foreground">
            home
          </span>
        </div>
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-sm">
            Patient Screening (from template)
          </h1>
          <span className="material-icons-outlined text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            edit
          </span>
        </div>
        <div className="h-4 w-px bg-border mx-2"></div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium font-display">
          <span className="flex items-center gap-1">
            Agent ID: ag...acc{" "}
            <span className="material-icons-outlined text-[12px] cursor-pointer hover:text-foreground">
              content_copy
            </span>
          </span>
          <span className="flex items-center gap-1">
            CF ID: co...774{" "}
            <span className="material-icons-outlined text-[12px] cursor-pointer hover:text-foreground">
              content_copy
            </span>
          </span>
          <span>$0.115/min</span>
          <span className="flex items-center gap-1">
            <span className="material-icons-outlined text-[12px]">
              schedule
            </span>{" "}
            820-1150ms latency
          </span>
          <span className="flex items-center gap-1">
            <span className="material-icons-outlined text-[12px]">info</span>{" "}
            104-304 tokens
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-6 text-sm font-medium mr-4">
          <a
            className="text-foreground border-b-2 border-primary h-14 flex items-center translate-y-[1px]"
            href="#"
          >
            Create
          </a>
          <a
            className="text-muted-foreground h-14 flex items-center hover:text-foreground transition-colors"
            href="#"
          >
            Simulation
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-foreground bg-background border border-border rounded hover:bg-secondary transition-colors">
            <span className="material-icons-outlined text-sm">
              chat_bubble_outline
            </span>{" "}
            Give feedback
          </button>
          <div className="flex items-center border border-border rounded overflow-hidden">
            <button className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors">
              <span className="material-icons-outlined text-sm text-muted-foreground">
                more_horiz
              </span>
            </button>
            <button className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors">
              <span className="material-icons-outlined text-sm text-muted-foreground">
                share
              </span>
            </button>
            <button className="p-1.5 px-2 hover:bg-secondary border-r border-border transition-colors">
              <span className="material-icons-outlined text-sm text-muted-foreground">
                history
              </span>
            </button>
            <button className="p-1.5 px-2 hover:bg-secondary transition-colors">
              <span className="material-icons-outlined text-sm text-muted-foreground">
                play_arrow
              </span>
            </button>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-1.5 rounded text-xs font-semibold transition-all shadow-sm shadow-primary/20">
            Publish
          </button>
        </div>
      </div>
    </header>
  );
};
