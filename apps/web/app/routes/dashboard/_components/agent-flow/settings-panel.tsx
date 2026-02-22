import type React from "react";
import { SETTINGS_MENU_ITEMS } from "./constants";

export const SettingsPanel: React.FC = () => {
  return (
    <aside className="w-[320px] bg-background border-l border-border flex flex-col font-display">
      <div className="flex border-b border-border">
        <button
          type="button"
          className="flex-1 py-3 text-xs font-bold border-b-2 border-primary transition-colors"
        >
          Global Settings
        </button>
        <button
          type="button"
          className="flex-1 py-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Test Agent
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide space-y-6">
        {/* Agent Settings Section */}
        <section>
          <button
            type="button"
            className="w-full flex items-center justify-between group mb-4"
          >
            <div className="flex items-center gap-2">
              <span className="material-icons-outlined text-lg text-muted-foreground group-hover:text-primary transition-colors">
                smart_toy
              </span>
              <span className="text-sm font-semibold">Agent Settings</span>
            </div>
            <span className="material-icons-outlined text-sm text-muted-foreground transition-transform group-hover:translate-y-0.5">
              expand_more
            </span>
          </button>

          <div className="space-y-4">
            {/* Voice & Language */}
            <div>
              {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Voice & Language
              </label>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center justify-between px-2 py-1.5 bg-secondary/50 rounded border border-border cursor-pointer hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-2">
                    <img
                      alt="US Flag"
                      className="w-4 h-3 rounded-sm object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMV7smRidOxuHSCKBKdXdQPIL7yQJOSNy7lUrwBFqMqYxLxGYtWUgdVMQK_IxFK5N0AbufE1oRjoUcx6jRU8eyWy8VxtiUbVdqt317MytXgZQaN1DVsGZBPbTbAsgbjzhKf0NNdGxM-R6JKysasPhPFZ1sKjdMGdAfJJh0YpFpP3z2RdtG4kjW7AyL5ll-gPNgCYTy54qFMm5UUGa-aArUcIf1_83FfGr1CYoGKBWqf0QSQKZ9sYq6W0ByJSdCIz6PBT6l4QKrp3s"
                    />
                    <span className="text-xs">English</span>
                  </div>
                  <span className="material-icons-outlined text-[14px] text-muted-foreground">
                    expand_more
                  </span>
                </div>
                <div className="flex-[1.2] flex items-center justify-between px-2 py-1.5 bg-secondary/50 rounded border border-border cursor-pointer hover:bg-secondary transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center text-[8px] font-bold text-orange-700">
                      C
                    </div>
                    <span className="text-xs">Cimo</span>
                  </div>
                  <span className="material-icons-outlined text-[14px] text-muted-foreground">
                    expand_more
                  </span>
                </div>
                <button
                  type="button"
                  className="p-1.5 bg-secondary/50 rounded border border-border hover:bg-secondary transition-colors text-muted-foreground"
                >
                  <span className="material-icons-outlined text-sm">
                    settings
                  </span>
                </button>
              </div>
            </div>

            {/* Execution Mode */}
            <div>
              {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
              <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Execution Mode
              </label>
              <div className="space-y-2">
                <ExecutionModeButton
                  variant="flex"
                  title="Flex Mode"
                  description="All nodes combined into a single context. Actions decided with flexibility."
                  icon="auto_awesome"
                  iconBg="bg-teal-500/10 text-teal-600 dark:text-teal-400"
                />
                <ExecutionModeButton
                  variant="rigid"
                  active
                  title="Rigid Mode"
                  description="The agent follows the defined nodes and transitions step by step."
                  icon="mediation"
                  iconBg="bg-primary/10 text-primary"
                />
              </div>
            </div>

            {/* Global Prompt */}
            <div>
              <div className="flex items-center justify-between mb-2">
                {/** biome-ignore lint/a11y/noLabelWithoutControl: <> */}
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Global Prompt
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-secondary border border-border rounded cursor-pointer hover:bg-secondary/80 transition-colors">
                    <span className="material-icons-outlined text-[12px] text-indigo-500">
                      psychology
                    </span>
                    <span className="text-[10px] font-bold">GPT 4.1</span>
                    <span className="material-icons-outlined text-[12px] text-muted-foreground">
                      expand_more
                    </span>
                  </div>
                  <span className="material-icons-outlined text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                    settings
                  </span>
                </div>
              </div>
              <div className="relative">
                <textarea
                  className="w-full h-48 bg-secondary/30 border border-border rounded-xl p-3 text-[11px] font-mono leading-relaxed text-foreground resize-none outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all font-display"
                  spellCheck="false"
                  defaultValue={`## Objective
You are an AI agent Anna.
Current time is {{current_time}}
{{customer_name}}= "evie wang"
{{dob}}="01/01/1997"
{{customer zip}}="94061"
You are calling to follow up on a recent patient visit to screen for potential complications or needs.`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Global Action Menu Items */}
        <section className="space-y-px border-t border-border pt-4">
          {SETTINGS_MENU_ITEMS.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2 px-2 cursor-pointer group hover:bg-secondary rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="material-icons-outlined text-lg text-muted-foreground group-hover:text-primary transition-colors">
                  {item.icon}
                </span>
                <span className="text-xs font-semibold">{item.label}</span>
              </div>
              <span className="material-icons-outlined text-sm text-muted-foreground group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
};

interface ExecutionModeButtonProps {
  variant: "flex" | "rigid";
  active?: boolean;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}

const ExecutionModeButton: React.FC<ExecutionModeButtonProps> = ({
  active,
  title,
  description,
  icon,
  iconBg,
}) => (
  <div
    className={`p-3 border rounded-xl cursor-pointer transition-all ${
      active
        ? "border-primary bg-primary/5 shadow-sm shadow-primary/5"
        : "border-border bg-background hover:border-primary/30"
    }`}
  >
    <div className="flex gap-3">
      <div
        className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0`}
      >
        <span className="material-icons-outlined text-base">{icon}</span>
      </div>
      <div>
        <div
          className={`text-[11px] font-bold ${active ? "text-primary" : ""}`}
        >
          {title}
        </div>
        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
          {description}
        </p>
      </div>
    </div>
  </div>
);
