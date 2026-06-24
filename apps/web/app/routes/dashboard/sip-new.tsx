import DashboardHeader from "./_components/dashboard-header";
import SipSettingsForm from "./_components/sip-settings/sip-settings-form";

const SipNew = () => {
  return (
    <div className="animate-in fade-in flex h-full flex-col overflow-hidden duration-300">
      <DashboardHeader>
        <h1 className="text-foreground font-display text-base font-semibold">
          Sip Ayarları
        </h1>
      </DashboardHeader>
      <div className="p-6">
        <SipSettingsForm />
      </div>
    </div>
  );
};

export default SipNew;
