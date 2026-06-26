import { Globe, LogOut, Monitor, Smartphone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

// API'den gelen JSON şemasının TypeScript tipi
interface Session {
  id: string;
  expiresAt: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
  userId: string;
}

// User Agent string'inden daha okunabilir cihaz/tarayıcı bilgisi çıkarma fonksiyonu
const parseUserAgent = (userAgent: string) => {
  const ua = userAgent.toLowerCase();
  let os = "Bilinmeyen Cihaz";
  let browser = "Tarayıcı";

  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("macintosh") || ua.includes("mac os")) os = "macOS";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("linux")) os = "Linux";

  if (ua.includes("chrome")) browser = "Chrome";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("edg")) browser = "Edge";

  const isMobile = /iphone|ipad|android/i.test(ua);

  return { deviceString: `${os} · ${browser}`, isMobile };
};

// Tarihi okunabilir formata çeviren yardımcı fonksiyon
const formatActiveTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ActiveSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: currentSession } = authClient.useSession();

  // 1. Oturumları API'den Çeken Fonksiyon (useCallback ile sonsuz döngü engellendi)
  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      await authClient.listSessions({
        fetchOptions: {
          onSuccess: ({ data }) => {
            console.log("Oturum verileri alındı:", data);
            setSessions(Array.isArray(data) ? data : []);
          },
        },
      });
    } catch (error) {
      console.error("Oturum verileri alınırken bir hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Bileşen ilk açıldığında verileri çekiyoruz
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // 2. Tekil Oturum Sonlandırma Aksiyonu
  const handleRevokeSession = async (id: string) => {
    try {
      await authClient.revokeSession({ token: id });
      // Başarılı olursa listeyi yenile
      fetchSessions();
    } catch (error) {
      console.error("Oturum sonlandırılamadı:", error);
    }
  };

  // 3. Tüm Oturumları Sonlandırma Aksiyonu
  const handleRevokeAllSessions = async () => {
    try {
      await authClient.revokeOtherSessions();
      fetchSessions();
    } catch (error) {
      console.error("Tüm oturumlar sonlandırılamadı:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-muted-foreground animate-pulse py-12 text-center text-xs">
        Oturumlar yükleniyor...
      </div>
    );
  }

  return (
    <div>
      <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
        <h2 className="text-foreground mb-1 text-sm font-semibold">
          Aktif Oturumlar
        </h2>
        <p className="text-muted-foreground mb-6 text-xs">
          Hesabınızda oturum açık olan cihazları yönetin.
        </p>

        <div className="space-y-3">
          {sessions.length === 0 ? (
            <p className="text-muted-foreground py-4 text-center text-xs">
              Aktif oturum bulunamadı.
            </p>
          ) : (
            sessions.map(session => {
              const { deviceString, isMobile } = parseUserAgent(
                session.userAgent,
              );

              // Kütüphanenizin aktif token'ı kontrol etme metoduna göre burayı düzenleyebilirsiniz.
              // Eğer kütüphane her session içine 'isCurrent: boolean' koyuyorsa direkt onu kullanmak daha iyidir.
              const isCurrentSession =
                session.token === currentSession?.session?.token;

              return (
                <div
                  key={session.id}
                  className="border-border flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    {/* Cihaz tipine göre dinamik ikon */}
                    <div className="text-muted-foreground bg-secondary rounded-md p-1.5">
                      {isMobile ? (
                        <Smartphone className="h-4 w-4" />
                      ) : (
                        <Monitor className="h-4 w-4" />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground text-xs font-medium">
                          {deviceString}
                        </span>
                        {isCurrentSession && (
                          <Badge
                            variant="secondary"
                            className="bg-success/10 text-success border-0 px-1.5 py-0 text-[10px]"
                          >
                            Mevcut Cihaz
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground flex items-center gap-1 text-[11px]">
                        <Globe className="inline h-3 w-3" />
                        {session.ipAddress} · Son Görülme:{" "}
                        {formatActiveTime(session.updatedAt)}
                      </p>
                    </div>
                  </div>

                  {!isCurrentSession && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRevokeSession(session.token)}
                      className="text-destructive hover:text-destructive h-7 gap-1.5 px-2 text-[11px]"
                    >
                      <LogOut className="h-3 w-3" />
                      Sonlandır
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {sessions.length > 1 && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRevokeAllSessions}
              className="gap-2 text-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
              Diğer Tüm Oturumları Sonlandır
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveSessions;
