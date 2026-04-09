import {
  Edit3,
  History as HistoryIcon,
  Home,
  MoreHorizontal,
  Rocket,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import DashboardHeader from "../dashboard-header";
import { AgentMeta } from "./agent-meta";
import { AGENT_MOCK_DATA } from "./constants";

export const AgentHeader = () => {
  return (
    <DashboardHeader>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          className="bg-secondary/50 h-8 w-8 rounded-lg"
        >
          <Home className="text-muted-foreground h-4 w-4" />
        </Button>
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-bold tracking-tight">
            {AGENT_MOCK_DATA.title}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-6 w-6"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
        </div>
        <AgentMeta />
      </div>
      <div className="flex items-center space-x-3">
        <nav className="mr-2 flex items-center gap-1">
          <a
            className="text-foreground rounded-full bg-[rgba(0,0,0,0.05)] px-3 py-1.5 text-sm font-medium transition-colors"
            href="#configure"
          >
            Yapılandır
          </a>
          <a
            className="text-muted-foreground hover:text-foreground rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[rgba(0,0,0,0.05)]"
            href="#simulation"
          >
            Simülasyon
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-8 w-8"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-8 w-8"
          >
            <HistoryIcon className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Rocket className="h-3.5 w-3.5" />
            <span>Yayınla</span>
          </Button>
        </div>
      </div>
    </DashboardHeader>
  );
};
