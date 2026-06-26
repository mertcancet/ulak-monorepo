import { RefreshCw, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { authClient } from "~/lib/auth-client";

const ProfileSection = () => {
  const { data: session } = authClient.useSession();

  const [profileName, setProfileName] = useState(session?.user.name ?? "");
  const [profileEmail] = useState(session?.user.email ?? "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const userDisplayName =
    session?.user.name || session?.user.email?.split("@")[0] || "U";
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    try {
      await authClient.updateUser({
        name: profileName,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Profil bilgileri başarıyla güncellendi.");
          },
          onError: (error: any) => {
            console.error("Error updating profile:", error);
            toast.error("Profil bilgileri güncellenirken bir hata oluştu.");
          },
        },
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setIsSavingProfile(false);
  };

  return (
    <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
      <h2 className="text-foreground mb-1 text-sm font-semibold">
        Profil Bilgileri
      </h2>
      <p className="text-muted-foreground mb-6 text-xs">
        İsminizi ve iletişim bilgilerinizi güncelleyin.
      </p>

      {/* Avatar */}
      <div className="mb-6 flex items-center gap-4">
        <Avatar className="border-border h-16 w-16 border-2">
          <AvatarImage src={session?.user.image ?? ""} />
          <AvatarFallback className="bg-brand text-lg font-bold text-white">
            {userInitial}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1.5">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Upload className="h-3.5 w-3.5" />
            Fotoğraf Yükle
          </Button>
          <p className="text-muted-foreground text-[11px]">
            JPG, PNG veya GIF · Maks. 2MB
          </p>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-medium">
            Ad Soyad
          </Label>
          <Input
            id="name"
            value={profileName}
            onChange={e => setProfileName(e.target.value)}
            placeholder="Adınız Soyadınız"
            className="h-9 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium">
            E-posta
          </Label>
          <Input
            id="email"
            value={profileEmail}
            disabled
            className="h-9 text-sm opacity-60"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          size="sm"
          onClick={handleSaveProfile}
          disabled={isSavingProfile}
          className="gap-2 text-xs"
        >
          {isSavingProfile && (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          )}
          Değişiklikleri Kaydet
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;
