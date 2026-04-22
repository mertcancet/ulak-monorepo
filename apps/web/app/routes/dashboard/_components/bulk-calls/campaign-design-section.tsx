import { Bot, CircleAlert } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Textarea } from "~/components/ui/textarea";

export function CampaignDesignSection() {
  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      <article className="bg-card border-border rounded-2xl border p-5 shadow-sm xl:col-span-7">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-sm font-semibold">
            Kampanya Tasarimi
          </h2>
          <Badge className="bg-brand/10 text-brand border-brand/20">
            AI Destekli
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="campaign-name"
              className="text-muted-foreground text-xs"
            >
              Kampanya Adi
            </label>
            <Input
              id="campaign-name"
              placeholder="Orn. Bahar Kontrol Bilgilendirme"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="audience-name"
              className="text-muted-foreground text-xs"
            >
              Hedef Kitle Adi
            </label>
            <Input
              id="audience-name"
              placeholder="Orn. Son 90 Gun Pasif Musteriler"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="call-window"
              className="text-muted-foreground text-xs"
            >
              Arama Penceresi
            </label>
            <select
              id="call-window"
              className="border-border bg-background text-foreground h-9 w-full rounded-md border px-3 text-sm"
            >
              <option>09:00 - 18:00</option>
              <option>10:00 - 20:00</option>
              <option>Hafta ici 12:00 - 21:00</option>
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label
              htmlFor="audience-numbers"
              className="text-muted-foreground text-xs"
            >
              Hedef Kitle Numaralari
            </label>
            <Textarea
              id="audience-numbers"
              rows={4}
              placeholder={
                "Her satira bir numara ekleyin\n+90 532 111 22 33\n+90 533 444 55 66"
              }
            />
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <label
            htmlFor="conversation-script"
            className="text-muted-foreground text-xs"
          >
            Cagri Scripti
          </label>
          <Textarea
            id="conversation-script"
            rows={5}
            placeholder="Ajanin telefonda okuyacagi acilis, teklif ve kapanis metnini yazin."
          />
        </div>
      </article>

      <article className="bg-card border-border rounded-2xl border p-5 shadow-sm xl:col-span-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-sm font-semibold">
            AI Konusma Akisi Onizleme
          </h2>
          <Bot className="text-brand h-4 w-4" />
        </div>

        <div className="from-brand/8 to-brand/3 border-brand/20 mb-4 space-y-3 rounded-xl border bg-linear-to-br p-4">
          <p className="text-foreground text-sm font-medium">
            "Merhaba, ben Calling AI asistani. Sizi en fazla 40 saniye
            bilgilendirecegim. Uygun musunuz?"
          </p>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <CircleAlert className="h-3.5 w-3.5" />
            Red durumunda nazik cikis, kabulde teklif adimina gecis.
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
              <span>Cevaplama Tahmini</span>
              <span>%41</span>
            </div>
            <Progress value={41} />
          </div>

          <div>
            <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
              <span>Olumlu Niyet Tahmini</span>
              <span>%34</span>
            </div>
            <Progress value={34} />
          </div>

          <div>
            <div className="text-muted-foreground mb-1 flex items-center justify-between text-xs">
              <span>Randevuye Donusum Tahmini</span>
              <span>%22</span>
            </div>
            <Progress value={22} />
          </div>
        </div>
      </article>
    </section>
  );
}
