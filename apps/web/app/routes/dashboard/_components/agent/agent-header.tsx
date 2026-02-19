import React from "react";
import {
  Home,
  Edit3,
  MoreHorizontal,
  History as HistoryIcon,
  Rocket,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { AgentMeta } from "./agent-meta";
import { AGENT_MOCK_DATA } from "./constants";

export const AgentHeader = () => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 transition-opacity duration-300">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-secondary/50 rounded-lg"
        >
          <Home className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-bold tracking-tight">
            {AGENT_MOCK_DATA.title}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
        </div>
        <AgentMeta />
      </div>

      <div className="flex items-center space-x-3">
        <Tabs defaultValue="configure" className="mr-6">
          <TabsList className="bg-transparent h-14 border-b-0 gap-8">
            <TabsTrigger
              value="configure"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 h-14 text-sm font-semibold"
            >
              Yapılandır
            </TabsTrigger>
            <TabsTrigger
              value="simulation"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 h-14 text-sm font-semibold text-muted-foreground"
            >
              Simülasyon
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
          >
            <HistoryIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="h-9 gap-2 font-bold gradient-primary shadow-lg shadow-primary/20"
          >
            <Rocket className="h-3.5 w-3.5" />
            <span>Yayınla</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
