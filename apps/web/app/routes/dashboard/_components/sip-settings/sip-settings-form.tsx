import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const SipSettingsForm = () => {
  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-muted-foreground text-sm">
        Sip ayarlarınızı buradan yapabilirsiniz.
      </p>
      <form className="mt-6 space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="sip-user-name">Kullanıcı adı</Label>
          <Input
            id="sip-user-name"
            value={""}
            placeholder="Örn. satış_destek_agent"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sip-domain">Domain</Label>
          <Input id="sip-domain" value={""} placeholder="Örn. example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sip-password">Parola</Label>
          <Input
            id="sip-password"
            value={""}
            placeholder="Örn. ********"
            type="password"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="sip-phone-number">Telefon Numarası</Label>
          <Input id="sip-phone-number" value={""} type="text" />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="type">Tip</Label>
          <select
            id="type"
            className="border-border text-foreground h-9 w-full rounded-lg border px-3 text-sm font-medium outline-none"
          >
            <option>Gelen</option>
            <option>Giden</option>
          </select>
        </div>
        <div>
          <Button type="submit">Kaydet</Button>
        </div>
      </form>
    </div>
  );
};

export default SipSettingsForm;
