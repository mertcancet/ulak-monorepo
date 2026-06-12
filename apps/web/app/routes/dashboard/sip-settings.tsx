import DashboardHeader from "./_components/dashboard-header";
import SipSettingsForm from "./_components/sip-settings/sip-settings-form";

const SipSettingsPage = () => {
  return (
    <div>
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

export default SipSettingsPage;
