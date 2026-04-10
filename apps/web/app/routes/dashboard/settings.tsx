import {
  Bell,
  Building2,
  Eye,
  EyeOff,
  Globe,
  Key,
  Lock,
  LogOut,
  RefreshCw,
  Shield,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { authClient } from "~/lib/auth-client";
import DashboardHeader from "./_components/dashboard-header";

const MOCK_API_KEYS = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk-live-••••••••••••••••••••••••4f2a",
    createdAt: "1 Ocak 2026",
    lastUsed: "Bugün",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "sk-dev-••••••••••••••••••••••••8c3b",
    createdAt: "15 Şubat 2026",
    lastUsed: "3 gün önce",
  },
];

const MOCK_SESSIONS = [
  {
    id: "1",
    device: "macOS · Chrome",
    location: "İstanbul, Türkiye",
    lastActive: "Şu an aktif",
    current: true,
  },
  {
    id: "2",
    device: "iPhone · Safari",
    location: "İstanbul, Türkiye",
    lastActive: "2 saat önce",
    current: false,
  },
  {
    id: "3",
    device: "Windows · Edge",
    location: "Ankara, Türkiye",
    lastActive: "5 gün önce",
    current: false,
  },
];

export default function SettingsPage() {
  const { data: session } = authClient.useSession();

  const [profileName, setProfileName] = useState(session?.user.name ?? "");
  const [profileEmail] = useState(session?.user.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [apiKeys, setApiKeys] = useState(MOCK_API_KEYS);

  const [notifications, setNotifications] = useState({
    callCompleted: true,
    callFailed: true,
    weeklyReport: false,
    monthlyReport: true,
    systemAlerts: true,
    billingAlerts: true,
    newFeatures: false,
  });

  const userDisplayName =
    session?.user.name || session?.user.email?.split("@")[0] || "U";
  const userInitial = userDisplayName.charAt(0).toUpperCase();

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSavingProfile(false);
  };

  const handleSavePassword = async () => {
    if (newPassword !== confirmPassword) return;
    setIsSavingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsSavingPassword(false);
  };

  const handleRevokeKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
  };

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <h1 className="text-foreground font-display text-base font-semibold">
            Ayarlar
          </h1>
        </div>
      </DashboardHeader>

      <div className="scrollbar-thin flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-secondary h-10 gap-1 p-1">
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 text-xs"
              >
                <User className="h-3.5 w-3.5" />
                Profil
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex items-center gap-2 text-xs"
              >
                <Shield className="h-3.5 w-3.5" />
                Güvenlik
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2 text-xs"
              >
                <Bell className="h-3.5 w-3.5" />
                Bildirimler
              </TabsTrigger>
              <TabsTrigger
                value="api"
                className="flex items-center gap-2 text-xs"
              >
                <Key className="h-3.5 w-3.5" />
                API Anahtarları
              </TabsTrigger>
              <TabsTrigger
                value="organization"
                className="flex items-center gap-2 text-xs"
              >
                <Building2 className="h-3.5 w-3.5" />
                Organizasyon
              </TabsTrigger>
            </TabsList>

            {/* ─── Profil ─────────────────────────────────────────── */}
            <TabsContent value="profile" className="space-y-6">
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-xs"
                    >
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
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="timezone" className="text-xs font-medium">
                      Saat Dilimi
                    </Label>
                    <div className="relative">
                      <Globe className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
                      <select
                        id="timezone"
                        className="border-border bg-background text-foreground focus:ring-ring h-9 w-full rounded-md border pr-3 pl-9 text-sm focus:ring-2 focus:outline-none"
                      >
                        <option>Europe/Istanbul (UTC+3)</option>
                        <option>Europe/London (UTC+0)</option>
                        <option>America/New_York (UTC-5)</option>
                        <option>America/Los_Angeles (UTC-8)</option>
                      </select>
                    </div>
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

              {/* Danger Zone */}
              <div className="border-destructive/30 bg-destructive/5 rounded-xl border p-6">
                <h2 className="text-destructive mb-1 text-sm font-semibold">
                  Tehlikeli Bölge
                </h2>
                <p className="text-muted-foreground mb-4 text-xs">
                  Bu işlemler geri alınamaz. Lütfen dikkatli olun.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2 text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Hesabı Sil
                </Button>
              </div>
            </TabsContent>

            {/* ─── Güvenlik ───────────────────────────────────────── */}
            <TabsContent value="security" className="space-y-6">
              {/* Şifre Değiştir */}
              <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
                <h2 className="text-foreground mb-1 text-sm font-semibold">
                  Şifre Değiştir
                </h2>
                <p className="text-muted-foreground mb-6 text-xs">
                  Hesap güvenliğiniz için güçlü bir şifre kullanın.
                </p>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="current-password"
                      className="text-xs font-medium"
                    >
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
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="new-password"
                      className="text-xs font-medium"
                    >
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
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="confirm-password"
                      className="text-xs font-medium"
                    >
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
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-destructive text-[11px]">
                        Şifreler eşleşmiyor.
                      </p>
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

              {/* Aktif Oturumlar */}
              <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
                <h2 className="text-foreground mb-1 text-sm font-semibold">
                  Aktif Oturumlar
                </h2>
                <p className="text-muted-foreground mb-6 text-xs">
                  Hesabınızda oturum açık olan cihazları yönetin.
                </p>

                <div className="space-y-3">
                  {MOCK_SESSIONS.map(session => (
                    <div
                      key={session.id}
                      className="border-border flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-foreground text-xs font-medium">
                            {session.device}
                          </span>
                          {session.current && (
                            <Badge
                              variant="secondary"
                              className="bg-success/10 text-success border-0 px-1.5 py-0 text-[10px]"
                            >
                              Mevcut
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-[11px]">
                          {session.location} · {session.lastActive}
                        </p>
                      </div>
                      {!session.current && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive h-7 gap-1.5 px-2 text-[11px]"
                        >
                          <LogOut className="h-3 w-3" />
                          Sonlandır
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    <LogOut className="h-3.5 w-3.5" />
                    Tüm Oturumları Sonlandır
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* ─── Bildirimler ────────────────────────────────────── */}
            <TabsContent value="notifications" className="space-y-6">
              <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
                <h2 className="text-foreground mb-1 text-sm font-semibold">
                  Bildirim Tercihleri
                </h2>
                <p className="text-muted-foreground mb-6 text-xs">
                  Hangi bildirimleri almak istediğinizi seçin.
                </p>

                <div className="space-y-1">
                  <p className="text-muted-foreground mb-3 text-[10px] font-semibold tracking-widest uppercase">
                    Çağrı Bildirimleri
                  </p>
                  <NotificationRow
                    label="Çağrı Tamamlandı"
                    description="Her başarılı çağrının ardından bildirim al."
                    checked={notifications.callCompleted}
                    onToggle={() => handleToggleNotification("callCompleted")}
                  />
                  <NotificationRow
                    label="Çağrı Başarısız"
                    description="Çağrı bağlanamadığında veya hata oluştuğunda bildirim al."
                    checked={notifications.callFailed}
                    onToggle={() => handleToggleNotification("callFailed")}
                  />
                </div>

                <Separator className="my-5" />

                <div className="space-y-1">
                  <p className="text-muted-foreground mb-3 text-[10px] font-semibold tracking-widest uppercase">
                    Raporlar
                  </p>
                  <NotificationRow
                    label="Haftalık Rapor"
                    description="Her Pazartesi haftalık özet e-postası al."
                    checked={notifications.weeklyReport}
                    onToggle={() => handleToggleNotification("weeklyReport")}
                  />
                  <NotificationRow
                    label="Aylık Rapor"
                    description="Her ayın başında aylık performans raporu al."
                    checked={notifications.monthlyReport}
                    onToggle={() => handleToggleNotification("monthlyReport")}
                  />
                </div>

                <Separator className="my-5" />

                <div className="space-y-1">
                  <p className="text-muted-foreground mb-3 text-[10px] font-semibold tracking-widest uppercase">
                    Sistem & Diğer
                  </p>
                  <NotificationRow
                    label="Sistem Uyarıları"
                    description="Servis kesintileri veya kritik güncellemeler."
                    checked={notifications.systemAlerts}
                    onToggle={() => handleToggleNotification("systemAlerts")}
                  />
                  <NotificationRow
                    label="Faturalama Uyarıları"
                    description="Ödeme tarihleri ve fatura bildirimleri."
                    checked={notifications.billingAlerts}
                    onToggle={() => handleToggleNotification("billingAlerts")}
                  />
                  <NotificationRow
                    label="Yeni Özellikler"
                    description="Ürün güncellemeleri ve yeni özellik duyuruları."
                    checked={notifications.newFeatures}
                    onToggle={() => handleToggleNotification("newFeatures")}
                  />
                </div>
              </div>
            </TabsContent>

            {/* ─── API Anahtarları ─────────────────────────────────── */}
            <TabsContent value="api" className="space-y-6">
              <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-foreground mb-1 text-sm font-semibold">
                      API Anahtarları
                    </h2>
                    <p className="text-muted-foreground text-xs">
                      Calling AI API'sine erişim için anahtarlarınızı yönetin.
                    </p>
                  </div>
                  <Button size="sm" className="gap-2 text-xs">
                    <Key className="h-3.5 w-3.5" />
                    Yeni Anahtar
                  </Button>
                </div>

                <div className="space-y-3">
                  {apiKeys.map(apiKey => (
                    <div
                      key={apiKey.id}
                      className="border-border flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="min-w-0 space-y-1">
                        <p className="text-foreground text-xs font-medium">
                          {apiKey.name}
                        </p>
                        <p className="text-muted-foreground font-mono text-[11px]">
                          {apiKey.key}
                        </p>
                        <p className="text-muted-foreground text-[11px]">
                          Oluşturuldu: {apiKey.createdAt} · Son kullanım:{" "}
                          {apiKey.lastUsed}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive ml-4 h-7 gap-1.5 px-2 text-[11px]"
                        onClick={() => handleRevokeKey(apiKey.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                        İptal Et
                      </Button>
                    </div>
                  ))}

                  {apiKeys.length === 0 && (
                    <div className="border-border rounded-lg border border-dashed p-8 text-center">
                      <Key className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
                      <p className="text-muted-foreground text-xs">
                        Henüz API anahtarınız yok.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
                <h2 className="text-foreground mb-1 text-sm font-semibold">
                  Webhook Ayarları
                </h2>
                <p className="text-muted-foreground mb-6 text-xs">
                  Çağrı olayları için bir webhook URL'si tanımlayın.
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="webhook-url" className="text-xs font-medium">
                    Webhook URL
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook-url"
                      placeholder="https://your-server.com/webhook"
                      className="h-9 flex-1 text-sm"
                    />
                    <Button size="sm" variant="outline" className="text-xs">
                      Kaydet
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-[11px]">
                    POST isteği: çağrı tamamlandığında, başarısız olduğunda ve
                    kayıt hazır olduğunda tetiklenir.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* ─── Organizasyon ───────────────────────────────────── */}
            <TabsContent value="organization" className="space-y-6">
              <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
                <h2 className="text-foreground mb-1 text-sm font-semibold">
                  Organizasyon Bilgileri
                </h2>
                <p className="text-muted-foreground mb-6 text-xs">
                  Şirket profili ve iletişim bilgilerini güncelleyin.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label
                      htmlFor="company-name"
                      className="text-xs font-medium"
                    >
                      Şirket Adı
                    </Label>
                    <Input
                      id="company-name"
                      placeholder="Şirket Adı A.Ş."
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="company-website"
                      className="text-xs font-medium"
                    >
                      Website
                    </Label>
                    <Input
                      id="company-website"
                      placeholder="https://sirket.com"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="company-phone"
                      className="text-xs font-medium"
                    >
                      İletişim Telefonu
                    </Label>
                    <Input
                      id="company-phone"
                      placeholder="+90 212 000 00 00"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label
                      htmlFor="company-address"
                      className="text-xs font-medium"
                    >
                      Adres
                    </Label>
                    <Input
                      id="company-address"
                      placeholder="Mah. Sok. No: 1, İlçe, İstanbul"
                      className="h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button size="sm" className="gap-2 text-xs">
                    Kaydet
                  </Button>
                </div>
              </div>

              <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
                <h2 className="text-foreground mb-1 text-sm font-semibold">
                  Ekip Üyeleri
                </h2>
                <p className="text-muted-foreground mb-6 text-xs">
                  Ekip üyelerinizi davet edin ve rollerini yönetin.
                </p>

                <div className="border-border rounded-lg border border-dashed p-8 text-center">
                  <Building2 className="text-muted-foreground mx-auto mb-2 h-6 w-6" />
                  <p className="text-foreground mb-1 text-xs font-medium">
                    Takım özelliği yakında
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    Birden fazla kullanıcı desteği çok yakında geliyor.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

interface NotificationRowProps {
  label: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
}

function NotificationRow({
  label,
  description,
  checked,
  onToggle,
}: NotificationRowProps) {
  return (
    <div className="hover:bg-secondary/50 flex items-center justify-between rounded-lg px-3 py-3 transition-colors">
      <div className="space-y-0.5">
        <p className="text-foreground text-xs font-medium">{label}</p>
        <p className="text-muted-foreground text-[11px]">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onToggle} />
    </div>
  );
}
