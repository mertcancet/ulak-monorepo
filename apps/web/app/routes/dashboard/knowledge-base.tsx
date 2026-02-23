/** biome-ignore-all lint/a11y/useButtonType: false positive */
import { BookOpen, BookText, File, Link } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import AddKnowledgeBaseDialog from "./_components/knowledge-base/add-knowledge-base-dialog";
import FileTab from "./_components/knowledge-base/file-tab";
import TextTab from "./_components/knowledge-base/text-tab";
import WebsiteTab from "./_components/knowledge-base/website-tab";

export default function KnowledgeBasePage() {
  const [activeTab, setActiveTab] = useState<"text" | "file" | "website">(
    "text",
  );

  return (
    <div className="flex h-full bg-background overflow-hidden animate-in fade-in duration-500">
      {/* Sub-Sidebar: Bilgi Bankası Listesi */}
      <aside className="w-72 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-4 h-16 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <h2 className="font-semibold text-sm">Bilgi Bankası</h2>
          </div>
          <AddKnowledgeBaseDialog />
        </div>
        <div className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("text")}
            className={cn(
              "p-2 cursor-pointer w-full rounded-lg flex items-center gap-2 border border-border",
              activeTab === "text" && "bg-secondary",
            )}
          >
            <BookText
              className={cn(
                "w-4 h-4 text-muted-foreground",
                activeTab === "text" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground",
                activeTab === "text" && "text-foreground",
              )}
            >
              Text
            </span>
          </button>
          <button
            onClick={() => setActiveTab("file")}
            className={cn(
              "p-2 cursor-pointer w-full rounded-lg flex items-center gap-2 border border-border",
              activeTab === "file" && "bg-secondary",
            )}
          >
            <File
              className={cn(
                "w-4 h-4 text-muted-foreground",
                activeTab === "file" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground",
                activeTab === "file" && "text-foreground",
              )}
            >
              Dosya
            </span>
          </button>
          <button
            onClick={() => setActiveTab("website")}
            className={cn(
              "p-2  cursor-pointer w-full rounded-lg flex items-center gap-2 border border-border",
              activeTab === "website" && "bg-secondary",
            )}
          >
            <Link
              className={cn(
                "w-4 h-4 text-muted-foreground text-muted-foreground",
                activeTab === "website" && "text-foreground",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium text-muted-foreground",
                activeTab === "website" && "text-foreground",
              )}
            >
              Website
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-background overflow-y-auto scrollbar-thin">
        {activeTab === "text" && <TextTab />}
        {activeTab === "file" && <FileTab />}
        {activeTab === "website" && <WebsiteTab />}
      </main>
    </div>
  );
}
