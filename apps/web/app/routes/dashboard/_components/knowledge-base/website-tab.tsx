import { ChevronDown, LinkIcon, Plus } from "lucide-react";
import TabHeader from "./tab-header";

const WebsiteTab = () => {
  return (
    <div>
      <TabHeader title="Website" />

      <div className="px-4">
        {/* Cards */}
        <div className="space-y-4">
          <div className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20">
                  <LinkIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    gumsoft.co
                  </h3>
                  <p className="text-xs text-muted-foreground">23 Sayfa</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>

          <div className="group bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20">
                  <LinkIcon className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    www.gumsoft.co
                  </h3>
                  <p className="text-xs text-muted-foreground">4 Sayfa</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </div>

        {/* New Source Dropzone */}
        <div className="mt-12 flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-2xl bg-secondary/30 hover:bg-secondary transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 text-muted-foreground" />
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-1">
            Yeni Kaynak Ekle
          </h4>
          <p className="text-xs text-muted-foreground text-center max-w-xs leading-relaxed">
            Bilgi bankanızı geliştirmek için yeni web siteleri, PDF dokümanları
            veya manuel metinler ekleyin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteTab;
