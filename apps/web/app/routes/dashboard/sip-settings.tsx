import { Phone, PhoneIncoming } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import DashboardHeader from "./_components/dashboard-header";

const SipSettingsPage = () => {
  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          Sip Ayarları
        </h1>
        <Button asChild>
          <Link to="/dashboard/sip-new">Sip Ayarı oluştur</Link>
        </Button>
      </DashboardHeader>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
        <div className="flex flex-col gap-2">
          <Link
            to={"/dashboard/sip-settings/1"}
            className="border-border bg-background hover:bg-secondary flex items-center gap-4 rounded-xl border p-4 transition-colors"
          >
            <div className="bg-secondary flex size-10 items-center justify-center rounded-lg">
              <Phone className="text-muted-foreground size-4" />
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-foreground text-sm font-medium">Name </p>
              <p className="text-muted-foreground text-xs">Descriton </p>
            </div>
            <span className="text-muted-foreground border-border rounded-md border px-2 py-2 text-xs">
              <PhoneIncoming className="size-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SipSettingsPage;
