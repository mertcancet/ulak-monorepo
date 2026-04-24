import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { UseCaseId } from '@/features/useCases/types';
import { Play, Volume2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type DemoScript = {
  customer: string;
  agent: string;
};

type DemoScenario = {
  id: UseCaseId;
  label: string;
  scripts: DemoScript[];
};

const scenarios: DemoScenario[] = [
  {
    id: 'healthcare',
    label: 'Saglik',
    scripts: [
      {
        customer: 'Merhaba, yarin kardiyoloji icin uygun randevu var mi?',
        agent: 'Merhaba, sigorta bilginizi kontrol ediyorum. Yarin saat 14:00 uygun, sizin adiniza rezerve ediyorum.',
      },
      {
        customer: 'Harika, SMS ile hatirlatma alabilir miyim?',
        agent: 'Elbette. Randevudan 24 saat once ve 2 saat once otomatik hatirlatma gonderecegim.',
      },
    ],
  },
  {
    id: 'banking',
    label: 'Banka',
    scripts: [
      {
        customer: 'Ihtiyac kredisi icin uygunlugumu ogrenmek istiyorum.',
        agent: 'Gelir ve mevcut odeme gecmisinizi kontrol ettim. On degerlendirme sonucu uygun gorunuyorsunuz.',
      },
      {
        customer: 'Basvuruyu telefonda tamamlayabilir miyim?',
        agent: 'Evet. Gerekli bilgileri aliyorum, formu sizin adiniza doldurup onaya gonderiyorum.',
      },
    ],
  },
  {
    id: 'ecommerce',
    label: 'E-Ticaret',
    scripts: [
      {
        customer: 'Siparisim nerede kaldi, iki gundur guncelleme yok.',
        agent: 'Siparisinizi kontrol ettim, dagitim merkezinde. Tahmini teslimat yarin 11:00-14:00 arasi.',
      },
      {
        customer: 'Gecikirse ne olacak?',
        agent: 'Gecikme durumunda kargo ucreti iadesi tanimlayip size anlik bildirim gonderecegim.',
      },
    ],
  },
  {
    id: 'restaurant',
    label: 'Restoran',
    scripts: [
      {
        customer: 'Cumartesi aksami 4 kisilik masa ayirtmak istiyorum.',
        agent: 'Saat 20:30 icin uygun masa var. Vegan menu talebinizi de not aliyorum.',
      },
      {
        customer: 'Dogum gunu icin kucuk bir surpriz de isterim.',
        agent: 'Kutlama notunu ekledim, ekibimiz servis sirasinda sizi destekleyecek.',
      },
    ],
  },
  {
    id: 'education',
    label: 'Egitim',
    scripts: [
      {
        customer: 'Yazilim test uzmanligi kursu icin bilgi alabilir miyim?',
        agent: 'Elbette. Baslangic seviyesi icin haftada iki gun programimiz mevcut.',
      },
      {
        customer: 'Odeme plani nasil?',
        agent: 'Pesin veya 3 taksit secenekleri var. Size uygun plana gore kaydi tamamlayabiliriz.',
      },
    ],
  },
  {
    id: 'realEstate',
    label: 'Emlak',
    scripts: [
      {
        customer: 'Kadikoyde 2+1 kiralik daire bakiyorum.',
        agent: 'Butcenize uygun 3 ilan buldum. Dilerseniz yarin 10:00 icin gorus ayarlayabilirim.',
      },
      {
        customer: 'Aidat ve ulasim bilgileri de onemli.',
        agent: 'Tum ilanlarin aidat, ulasim ve okul mesafesi bilgilerini sizinle paylasiyorum.',
      },
    ],
  },
];

const supportsSpeech = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

export function TestCaseSection() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<UseCaseId>('healthcare');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const selectedScenario = useMemo(
    () => scenarios.find(scenario => scenario.id === selectedScenarioId) ?? scenarios[0],
    [selectedScenarioId],
  );

  useEffect(() => {
    return () => {
      if (supportsSpeech()) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const runDemo = (): void => {
    if (!supportsSpeech()) {
      return;
    }

    window.speechSynthesis.cancel();

    const fullText = selectedScenario.scripts
      .map(script => `Musteri: ${script.customer}. Ajan: ${script.agent}.`)
      .join(' ');

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.98;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className='px-14 container' id='test-case'>






    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Test Case</CardTitle>
            <CardDescription>
              Senaryoyu sec, tek tikla AI ajan konusma demosunu dinle.
            </CardDescription>
          </div>
          <Badge variant={isSpeaking ? 'success' : 'secondary'}>
            {isSpeaking ? 'Konusuyor' : 'Hazir'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-2">
            <label htmlFor="test-case-scenario" className="text-sm font-medium text-foreground">
              Sektor sec
            </label>
            <select
              id="test-case-scenario"
              value={selectedScenarioId}
              onChange={event => setSelectedScenarioId(event.target.value as UseCaseId)}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring"
            >
              {scenarios.map(scenario => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={runDemo}
            disabled={isSpeaking || !supportsSpeech()}
            className="h-10 min-w-52 gap-2"
          >
            <Play className="h-4 w-4" />
            {isSpeaking ? 'Demo Calisiyor...' : 'Demo Baslat ve Konustur'}
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Volume2 className="h-3.5 w-3.5" />
            Ornek Konusma Akisi
          </div>

          <div className="space-y-3">
          {selectedScenario.scripts.map(script => (
              <div key={script.customer} className="rounded-md border border-border/70 bg-background p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Musteri
                </p>
                <p className="mt-1 text-sm text-foreground">{script.customer}</p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  AI Ajan
                </p>
                <p className="mt-1 text-sm text-foreground">{script.agent}</p>
              </div>
          ))}
          </div>
        </div>

        {!supportsSpeech() && (
          <p className="text-xs text-muted-foreground">
            Bu tarayici sesli demo ozelligini desteklemiyor. Guncel bir Chrome/Safari deneyin.
          </p>
        )}
      </CardContent>
    </Card>

    </section>

  );
}
