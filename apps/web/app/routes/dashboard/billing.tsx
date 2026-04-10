import {
  ArrowUpRight,
  CreditCard,
  Download,
  FileText,
  Info,
  Phone,
  Plus,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { cn } from "~/lib/utils";
import DashboardHeader from "./_components/dashboard-header";

const USAGE_BREAKDOWN = [
  {
    id: "inbound",
    title: "Gelen Çağrılar",
    units: 842,
    unitLabel: "dk",
    unitPrice: 0.08,
  },
  {
    id: "outbound",
    title: "Giden Çağrılar",
    units: 391,
    unitLabel: "dk",
    unitPrice: 0.11,
  },
  {
    id: "recording-storage",
    title: "Kayıt Depolama",
    units: 73,
    unitLabel: "GB",
    unitPrice: 0.05,
  },
];

const INVOICES = [
  {
    id: "INV-2026-004",
    date: "1 Nisan 2026",
    period: "Mar 2026",
    usage: "1.288 dk + 64 GB",
    amount: "$124.91",
    status: "Ödendi",
  },
  {
    id: "INV-2026-003",
    date: "1 Mart 2026",
    period: "Şub 2026",
    usage: "1.104 dk + 58 GB",
    amount: "$109.32",
    status: "Ödendi",
  },
  {
    id: "INV-2026-002",
    date: "1 Şubat 2026",
    period: "Oca 2026",
    usage: "912 dk + 51 GB",
    amount: "$89.48",
    status: "Ödendi",
  },
  {
    id: "INV-2026-001",
    date: "1 Ocak 2026",
    period: "Ara 2025",
    usage: "833 dk + 48 GB",
    amount: "$81.34",
    status: "Ödendi",
  },
];

const BILLING_CYCLE_DAY = 1;
const CURRENT_MONTH_SPEND = 146.18;
const MONTHLY_BUDGET = 250;
const NEXT_BILLING_DATE = "1 Mayıs 2026";
const REMAINING_DAYS = 21;
const WALLET_BALANCE = 78.5;

export default function BillingPage() {
  const [isAddingCredit, setIsAddingCredit] = useState(false);
  const [autoRechargeEnabled, setAutoRechargeEnabled] = useState(true);
  const [autoRechargeThreshold, setAutoRechargeThreshold] = useState("25");
  const [autoRechargeAmount, setAutoRechargeAmount] = useState("100");
  const [topupAmount, setTopupAmount] = useState("50");

  const budgetUsagePercent = Math.round(
    (CURRENT_MONTH_SPEND / MONTHLY_BUDGET) * 100,
  );
  const projectedMonthEndSpend = CURRENT_MONTH_SPEND + 34.8;
  const estimatedNextInvoice = projectedMonthEndSpend + WALLET_BALANCE;

  const handleAddCredit = async () => {
    setIsAddingCredit(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingCredit(false);
  };

  return (
    <div className="bg-background flex h-full flex-col overflow-hidden">
      <DashboardHeader>
        <div className="flex items-center gap-3">
          <h1 className="text-foreground font-display text-base font-semibold">
            Faturalandırma
          </h1>
        </div>
      </DashboardHeader>

      <div className="scrollbar-thin flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-8 px-6 py-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-card border-border rounded-xl border p-6 shadow-sm sm:col-span-2">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground mb-1 text-xs">
                    Bu Ay Harcama
                  </p>
                  <div className="flex items-center gap-2">
                    <h2 className="text-foreground text-lg font-bold">
                      ${CURRENT_MONTH_SPEND.toFixed(2)}
                    </h2>
                    <Badge className="bg-brand/10 text-brand border-0 text-[10px]">
                      Kullandığın Kadar Öde
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    Fatura kesim günü: her ayın {BILLING_CYCLE_DAY}. günü ·
                    Sonraki fatura:{" "}
                    <span className="text-foreground font-medium">
                      {NEXT_BILLING_DATE}
                    </span>{" "}
                    ({REMAINING_DAYS} gün kaldı)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-foreground text-2xl font-bold">
                    ${projectedMonthEndSpend.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    tahmini ay sonu
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Phone className="text-muted-foreground h-3.5 w-3.5" />
                    <span className="text-foreground text-xs font-medium">
                      Aylık Bütçe Takibi
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    ${CURRENT_MONTH_SPEND.toFixed(2)} / ${MONTHLY_BUDGET} hedef
                  </span>
                </div>
                <Progress value={budgetUsagePercent} className="h-2" />
                <p
                  className={cn(
                    "text-[11px]",
                    budgetUsagePercent >= 90
                      ? "text-destructive"
                      : budgetUsagePercent >= 70
                        ? "text-yellow-500"
                        : "text-muted-foreground",
                  )}
                >
                  {budgetUsagePercent}% kullanıldı · kalan hedef: $
                  {(MONTHLY_BUDGET - CURRENT_MONTH_SPEND).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
              <p className="text-muted-foreground mb-1 text-xs">
                Cüzdan Bakiyesi
              </p>
              <p className="text-foreground mb-3 text-2xl font-bold">
                ${WALLET_BALANCE.toFixed(2)}
              </p>
              <div className="border-border mb-4 flex items-center gap-3 rounded-lg border p-3">
                <div className="bg-secondary flex h-9 w-14 items-center justify-center rounded-md">
                  <Wallet className="text-muted-foreground h-4 w-4" />
                </div>
                <div>
                  <p className="text-foreground text-xs font-medium">
                    Ön ödemeli bakiye
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    Tahmini sonraki fatura: ${estimatedNextInvoice.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mb-3 space-y-1.5">
                <label
                  htmlFor="topup-amount"
                  className="text-muted-foreground text-[11px]"
                >
                  Bakiye Yükle (USD)
                </label>
                <Input
                  id="topup-amount"
                  value={topupAmount}
                  onChange={event => setTopupAmount(event.target.value)}
                  className="h-9 text-sm"
                />
              </div>

              <Button
                variant="default"
                size="sm"
                className="w-full gap-2 text-xs"
                onClick={handleAddCredit}
                disabled={isAddingCredit}
              >
                {isAddingCredit ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
                Bakiye Ekle
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-card border-border rounded-xl border p-6 shadow-sm sm:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-foreground text-sm font-semibold">
                    Kullanım Kalemleri
                  </h2>
                  <p className="text-muted-foreground text-xs">
                    Sadece kullandığınız kaynaklar için ücretlendirilirsiniz.
                  </p>
                </div>
                <Badge variant="secondary" className="border-0 text-[10px]">
                  Gerçek Zamanlı
                </Badge>
              </div>

              <div className="space-y-3">
                {USAGE_BREAKDOWN.map(item => {
                  const subtotal = item.units * item.unitPrice;

                  return (
                    <div
                      key={item.id}
                      className="border-border bg-background/50 flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p className="text-foreground text-xs font-medium">
                          {item.title}
                        </p>
                        <p className="text-muted-foreground text-[11px]">
                          {item.units.toLocaleString()} {item.unitLabel} x $
                          {item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-foreground text-sm font-semibold">
                        ${subtotal.toFixed(2)}
                      </p>
                    </div>
                  );
                })}

                <div className="border-border bg-secondary/40 flex items-center justify-between rounded-lg border p-4">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                    <Info className="h-3.5 w-3.5" />
                    Dakika fiyatları yön bazlı değişebilir (ülke/operatör).
                  </div>
                  <p className="text-foreground text-sm font-bold">
                    Toplam: ${CURRENT_MONTH_SPEND.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card border-border rounded-xl border p-5 shadow-sm">
                <h3 className="text-foreground mb-1 text-xs font-semibold">
                  Otomatik Bakiye Yükleme
                </h3>
                <p className="text-muted-foreground mb-4 text-[11px]">
                  Bakiye limitin altına düştüğünde kartından otomatik yükleme
                  yapılır.
                </p>

                <div className="mb-4 flex items-center justify-between">
                  <span className="text-foreground text-xs font-medium">
                    Auto-recharge
                  </span>
                  <Switch
                    checked={autoRechargeEnabled}
                    onCheckedChange={setAutoRechargeEnabled}
                  />
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label
                      className="text-muted-foreground text-[11px]"
                      htmlFor="threshold"
                    >
                      Limit altı (USD)
                    </label>
                    <Input
                      id="threshold"
                      value={autoRechargeThreshold}
                      onChange={event =>
                        setAutoRechargeThreshold(event.target.value)
                      }
                      disabled={!autoRechargeEnabled}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      className="text-muted-foreground text-[11px]"
                      htmlFor="auto-amount"
                    >
                      Yüklenecek tutar (USD)
                    </label>
                    <Input
                      id="auto-amount"
                      value={autoRechargeAmount}
                      onChange={event =>
                        setAutoRechargeAmount(event.target.value)
                      }
                      disabled={!autoRechargeEnabled}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                <Button size="sm" className="mt-4 w-full gap-2 text-xs">
                  <RefreshCw className="h-3.5 w-3.5" />
                  Auto-recharge Ayarını Kaydet
                </Button>
              </div>

              <div className="bg-card border-border rounded-xl border p-5 shadow-sm">
                <p className="text-muted-foreground mb-3 text-xs">
                  Ödeme Yöntemi
                </p>
                <div className="border-border mb-4 flex items-center gap-3 rounded-lg border p-3">
                  <div className="bg-secondary flex h-9 w-14 items-center justify-center rounded-md">
                    <CreditCard className="text-muted-foreground h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-foreground text-xs font-medium">
                      •••• •••• •••• 4242
                    </p>
                    <p className="text-muted-foreground text-[11px]">
                      Son. 12/2028
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 text-xs"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                  Kartı Güncelle
                </Button>
              </div>

              <div className="border-border bg-secondary/40 flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="text-foreground text-xs font-semibold">
                    Yüksek Hacim İndirimi
                  </p>
                  <p className="text-muted-foreground text-[11px]">
                    10.000+ dakika/ay için özel birim fiyat teklifi alın.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 gap-2 text-xs"
                >
                  Teklif Al
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-foreground text-sm font-semibold">
                  Fatura Geçmişi
                </h2>
                <p className="text-muted-foreground text-xs">
                  Kullanım bazlı oluşan faturalarınızı indirin.
                </p>
              </div>
            </div>

            <div className="bg-card border-border overflow-hidden rounded-xl border shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-border border-b">
                    <th className="text-muted-foreground px-5 py-3 text-left text-[11px] font-semibold tracking-wide uppercase">
                      Fatura No
                    </th>
                    <th className="text-muted-foreground px-5 py-3 text-left text-[11px] font-semibold tracking-wide uppercase">
                      Tarih
                    </th>
                    <th className="text-muted-foreground px-5 py-3 text-left text-[11px] font-semibold tracking-wide uppercase">
                      Dönem
                    </th>
                    <th className="text-muted-foreground px-5 py-3 text-left text-[11px] font-semibold tracking-wide uppercase">
                      Kullanım
                    </th>
                    <th className="text-muted-foreground px-5 py-3 text-left text-[11px] font-semibold tracking-wide uppercase">
                      Tutar
                    </th>
                    <th className="text-muted-foreground px-5 py-3 text-left text-[11px] font-semibold tracking-wide uppercase">
                      Durum
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {INVOICES.map(invoice => (
                    <tr
                      key={invoice.id}
                      className="hover:bg-secondary/40 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <FileText className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
                          <span className="text-foreground font-mono text-xs">
                            {invoice.id}
                          </span>
                        </div>
                      </td>
                      <td className="text-secondary-foreground px-5 py-3.5 text-xs">
                        {invoice.date}
                      </td>
                      <td className="text-secondary-foreground px-5 py-3.5 text-xs">
                        {invoice.period}
                      </td>
                      <td className="text-secondary-foreground px-5 py-3.5 text-xs">
                        {invoice.usage}
                      </td>
                      <td className="text-foreground px-5 py-3.5 text-xs font-medium">
                        {invoice.amount}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge
                          variant="secondary"
                          className="bg-success/10 text-success border-0 text-[10px]"
                        >
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-foreground h-7 gap-1.5 px-2 text-[11px]"
                        >
                          <Download className="h-3 w-3" />
                          PDF
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
