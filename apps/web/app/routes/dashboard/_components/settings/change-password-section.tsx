import { Eye, EyeOff, Lock, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";

const ChangePasswordSection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) return;
    setIsSavingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Simulate password change logic here
      await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
        fetchOptions: {
          onSuccess: async () => {
            await authClient.listSessions();
            toast.success("Şifre başarıyla değiştirildi.");
          },
          onError: (_error: any) => {
            toast.error("Şifre değiştirilemedi. Lütfen tekrar deneyin.");
          },
        },
      });
    } catch (error) {
      console.error("Error changing password:", error);
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsSavingPassword(false);
  };
  return (
    <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
      <h2 className="text-foreground mb-1 text-sm font-semibold">
        Şifre Değiştir
      </h2>
      <p className="text-muted-foreground mb-6 text-xs">
        Hesap güvenliğiniz için güçlü bir şifre kullanın.
      </p>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="current-password" className="text-xs font-medium">
            Mevcut Şifre
          </Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <Input
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="h-9 pr-9 pl-9 text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
              onClick={() => setShowCurrentPassword(p => !p)}
            >
              {showCurrentPassword ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="new-password" className="text-xs font-medium">
            Yeni Şifre
          </Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <Input
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="h-9 pr-9 pl-9 text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
              onClick={() => setShowNewPassword(p => !p)}
            >
              {showNewPassword ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm-password" className="text-xs font-medium">
            Yeni Şifre (Tekrar)
          </Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="h-9 pr-9 pl-9 text-sm"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
              onClick={() => setShowConfirmPassword(p => !p)}
            >
              {showConfirmPassword ? (
                <Eye className="h-3.5 w-3.5" />
              ) : (
                <EyeOff className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-destructive text-[11px]">Şifreler eşleşmiyor.</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          size="sm"
          onClick={handleSavePassword}
          disabled={
            isSavingPassword ||
            !currentPassword ||
            !newPassword ||
            newPassword !== confirmPassword
          }
          className="gap-2 text-xs"
        >
          {isSavingPassword && (
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
          )}
          Şifreyi Güncelle
        </Button>
      </div>
    </div>
  );
};

export default ChangePasswordSection;
