import { CheckCircle2, Settings2, TrendingUp, Zap } from 'lucide-react';

export const OurApproach = () => {
  const steps = [
    {
      number: '01',
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: 'İhtiyacı ve senaryoları belirleriz',
      description: 'Sizi dinler, operasyonunuzun nerede yavaşladığını anlar ve çağrı akışlarını buna uygun senaryolarla tasarlarız.',
      status: 'Niyet Anlaşıldı',
    },
    {
      number: '02',
      icon: <Settings2 className="h-8 w-8 text-primary" />,
      title: 'Telefon ve veri altyapısına bağlarız',
      description: 'Santral, PBX, CRM ya da gerekli servisleri aynı yapıda birleştirir; gelen ve giden aramaları hazır hale getiririz.',
      status: 'Takım',
    },
    {
      number: '03',
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Kişiselleştirilmiş iletişimi devreye alırız',
      description: 'CleonAI sadece cevap vermez; müşteriye uygun tonla konuşur, bilgi çeker, aksiyon yaratır ve gerektiğinde insana aktarır.',
      status: 'Aksiyon',
    },
    {
      number: '04',
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: 'Analizlerle süreci geliştiririz',
      description: 'Her görüşme sonrası sonuç, kalite ve verimlilik verilerini ölçer; senaryoları ekip geri bildirimleriyle iyileştiririz.',
      status: 'Optimize',
    },
  ];

  return (
    <section id="our-approach" className="relative bg-background px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-20">
          <div className="mb-6">
            <p className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              SUNUM ADIMI
            </p>
          </div>
          <h2 className="mb-6 font-display text-4xl font-bold text-foreground md:text-5xl">
            İster küçük bir ekip olun,
            <br />
            ister büyük bir operasyon;
            <br />
            <span className="text-primary">Yanınızdayız</span>
          </h2>
          <p className="max-w-3xl text-lg text-slate-400">
            Ürün ekibimiz tüm süreç boyunca sizinle birlikte çalışır. Analiz, kurulum ve iyileştirme aşamalarında yanınızda oluruz.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="absolute -bottom-6 left-12 h-6 w-0.5 bg-gradient-to-b from-primary/40 to-transparent"></div>
              )}

              <div className="glass group rounded-xl border border-white/10 p-8 transition-all hover:border-primary/30 hover:bg-white/5">
                <div className="flex gap-6">
                  {/* Step Number & Icon */}
                  <div className="relative flex flex-col items-center pt-1">
                    <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-primary/5 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                      <div className="text-center">
                        <p className="text-xs text-primary/60">ADIM</p>
                        <p className="text-2xl font-bold text-primary">{step.number}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                        <p className="mt-2 leading-relaxed text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="mt-4 inline-block rounded-full bg-primary/10 px-3 py-1">
                      <span className="text-xs font-semibold text-primary">{step.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            Müşteri başarısı bizim başarısı
          </h3>
          <p className="mb-6 text-slate-400">
            Her adımda destek, her aşamada iyileştirme. CleonAI, işletmenizin büyümesinin ortağıdır.
          </p>
          <button type='button' className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-black transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20">
            Süreci Başlatalım
          </button>
        </div>
      </div>
    </section>
  );
};
