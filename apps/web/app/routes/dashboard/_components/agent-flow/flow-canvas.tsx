import React from "react";

export const FlowCanvas: React.FC = () => {
  return (
    <section className="flex-1 relative bg-secondary/20 canvas-grid overflow-hidden">
      {/* Flow Nodes Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-75">
        <div className="flex flex-col items-center gap-12">
          {/* Node: Greetings */}
          <div className="bg-card p-4 rounded-xl shadow-sm border border-border w-48 text-[10px] pointer-events-auto cursor-grab active:cursor-grabbing transform hover:scale-105 transition-all duration-200">
            <div className="text-pink-500 font-bold mb-1 uppercase tracking-tight">
              Greetings
            </div>
            <p className="text-muted-foreground leading-tight">
              Hi, This is Anna. I'm an AI agent representing Northwell...{" "}
            </p>
          </div>

          <div className="flex gap-24">
            {/* Node: Identity Confirmation */}
            <div className="bg-card p-4 rounded-xl shadow-sm border border-border w-48 text-[10px] pointer-events-auto cursor-grab active:cursor-grabbing relative transform hover:scale-105 transition-all duration-200">
              <div className="text-indigo-500 font-bold mb-1 uppercase tracking-tight">
                Identity Confirmation
              </div>
              <p className="text-muted-foreground leading-tight">
                Can I confirm I'm speaking with {"{{customer_name}}"}?
              </p>
              <div className="absolute -left-12 top-1/2 w-12 h-px bg-border"></div>
            </div>

            {/* Node: Success Path */}
            <div className="bg-card p-4 rounded-xl shadow-sm border border-border w-48 text-[10px] pointer-events-auto cursor-grab active:cursor-grabbing relative transform hover:scale-105 transition-all duration-200">
              <div className="text-green-500 font-bold mb-1 uppercase tracking-tight">
                Success Path
              </div>
              <p className="text-muted-foreground leading-tight">
                Proceeding to screening questions...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating View Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card shadow-xl rounded-full border border-border px-4 py-2 flex items-center gap-4 z-10 transition-shadow hover:shadow-2xl">
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <span className="material-icons-outlined text-sm">navigation</span>
        </button>
        <div className="w-px h-4 bg-border"></div>
        <button className="material-icons-outlined text-sm text-muted-foreground hover:text-foreground transition-colors">
          grid_view
        </button>
        <button className="material-icons-outlined text-sm text-muted-foreground hover:text-foreground transition-colors">
          search
        </button>
      </div>

      {/* Add Button */}
      <button className="absolute bottom-6 left-6 bg-primary text-primary-foreground p-2 rounded-full border border-primary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all z-10">
        <span className="material-icons-outlined">add</span>
      </button>

      {/* Flow Indicator */}
      <div className="absolute bottom-6 right-6 flex items-center bg-card px-3 py-1.5 rounded-lg border border-border shadow-md z-10">
        <span className="text-[10px] font-bold uppercase text-muted-foreground mr-2 tracking-widest">
          Flow
        </span>
        <span className="text-xs font-semibold">Main Flow</span>
      </div>
    </section>
  );
};
