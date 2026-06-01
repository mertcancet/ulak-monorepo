import { ArrowLeft, CheckCircle2, Clock3, Headphones, ShieldCheck } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLocalizedPath, useTranslations } from '@/i18n';
import { Footer } from '@/pages/landing/components/Footer';
import { Navbar } from '@/pages/landing/components/Navbar';

type DemoFormData = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  callVolume: string;
  useCase: string;
};

const initialFormData: DemoFormData = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  callVolume: '',
  useCase: '',
};

export function DemoRequestPage() {
  const t = useTranslations();
  const homePath = useLocalizedPath('/');
  const [formData, setFormData] = useState<DemoFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const highlights = [
    {
      icon: Clock3,
      title: t('demoPage.highlights.setup.title'),
      description: t('demoPage.highlights.setup.description'),
    },
    {
      icon: Headphones,
      title: t('demoPage.highlights.voice.title'),
      description: t('demoPage.highlights.voice.description'),
    },
    {
      icon: ShieldCheck,
      title: t('demoPage.highlights.security.title'),
      description: t('demoPage.highlights.security.description'),
    },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData(initialFormData);
  }

  function updateField<K extends keyof DemoFormData>(field: K, value: DemoFormData[K]) {
    setFormData((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(92,141,255,0.2),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.16),_transparent_22%),linear-gradient(180deg,#0b1020_0%,#090d18_45%,#060810_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px] opacity-20" />
        <Navbar />

        <main className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-20 pt-32 lg:flex-row lg:items-start lg:gap-14 lg:pt-40">
          <section className="w-full lg:max-w-xl">
            <Link
              to={homePath}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-primary/40 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('demoPage.backToHome')}
            </Link>

            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_rgba(92,141,255,0.8)]" />
              {t('demoPage.badge')}
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              {t('demoPage.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              {t('demoPage.description')}
            </p>

            <div className="mt-10 grid gap-4">
              {highlights.map(({ icon: Icon, title, description }) => (
                <div key={title} className="glass flex items-start gap-4 rounded-2xl p-5 text-left">
                  <div className="rounded-2xl border border-primary/15 bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-semibold text-white">15 dk</div>
                <div className="mt-2 text-sm text-slate-400">{t('demoPage.metrics.discovery')}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-semibold text-white">24/7</div>
                <div className="mt-2 text-sm text-slate-400">
                  {t('demoPage.metrics.availability')}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-semibold text-white">500+</div>
                <div className="mt-2 text-sm text-slate-400">{t('demoPage.metrics.teams')}</div>
              </div>
            </div>
          </section>

          <section className="w-full lg:max-w-2xl lg:flex-1">
            <Card className="border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <CardHeader className="space-y-3 border-b border-white/10 pb-6">
                <CardTitle className="text-2xl text-white">{t('demoPage.form.title')}</CardTitle>
                <CardDescription className="text-base leading-7 text-slate-400">
                  {t('demoPage.form.description')}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                {isSubmitted ? (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-6 text-left">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 text-emerald-300" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {t('demoPage.success.title')}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-emerald-50/80">
                          {t('demoPage.success.description')}
                        </p>
                      </div>
                    </div>
                    <Button type="button" className="mt-6" onClick={() => setIsSubmitted(false)}>
                      {t('demoPage.success.reset')}
                    </Button>
                  </div>
                ) : (
                  <form className="grid gap-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 md:grid-cols-2">
                      <span className="grid gap-2 text-sm font-medium text-slate-200">
                        <span>{t('demoPage.form.fields.fullName')}</span>
                        <Input
                          required
                          value={formData.fullName}
                          onChange={(event) => updateField('fullName', event.target.value)}
                          placeholder={t('demoPage.form.placeholders.fullName')}
                          className="h-12 border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500"
                        />
                      </span>

                      <span className="grid gap-2 text-sm font-medium text-slate-200">
                        <span>{t('demoPage.form.fields.company')}</span>
                        <Input
                          required
                          value={formData.company}
                          onChange={(event) => updateField('company', event.target.value)}
                          placeholder={t('demoPage.form.placeholders.company')}
                          className="h-12 border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500"
                        />
                      </span>

                      <span className="grid gap-2 text-sm font-medium text-slate-200">
                        <span>{t('demoPage.form.fields.email')}</span>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(event) => updateField('email', event.target.value)}
                          placeholder={t('demoPage.form.placeholders.email')}
                          className="h-12 border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500"
                        />
                      </span>

                      <span className="grid gap-2 text-sm font-medium text-slate-200">
                        <span>{t('demoPage.form.fields.phone')}</span>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(event) => updateField('phone', event.target.value)}
                          placeholder={t('demoPage.form.placeholders.phone')}
                          className="h-12 border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500"
                        />
                      </span>
                    </div>

                    <span className="grid gap-2 text-sm font-medium text-slate-200">
                      <span>{t('demoPage.form.fields.callVolume')}</span>
                      <select
                        required
                        value={formData.callVolume}
                        onChange={(event) => updateField('callVolume', event.target.value)}
                        className="flex h-12 w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
                      >
                        <option value="" disabled className="bg-slate-950 text-slate-400">
                          {t('demoPage.form.placeholders.callVolume')}
                        </option>
                        <option value="0-500" className="bg-slate-950 text-white">
                          {t('demoPage.form.options.callVolume.low')}
                        </option>
                        <option value="500-5000" className="bg-slate-950 text-white">
                          {t('demoPage.form.options.callVolume.mid')}
                        </option>
                        <option value="5000+" className="bg-slate-950 text-white">
                          {t('demoPage.form.options.callVolume.high')}
                        </option>
                      </select>
                    </span>

                    <span className="grid gap-2 text-sm font-medium text-slate-200">
                      <span>{t('demoPage.form.fields.useCase')}</span>
                      <textarea
                        required
                        rows={5}
                        value={formData.useCase}
                        onChange={(event) => updateField('useCase', event.target.value)}
                        placeholder={t('demoPage.form.placeholders.useCase')}
                        className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-3 text-sm text-white shadow-sm outline-none transition placeholder:text-slate-500 focus:border-primary focus:ring-2 focus:ring-primary/40"
                      />
                    </span>

                    <div className="flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-md text-sm leading-6 text-slate-400">
                        {t('demoPage.form.disclaimer')}
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="min-w-44 bg-primary text-white shadow-lg shadow-primary/20"
                      >
                        {isSubmitting ? t('demoPage.form.submitting') : t('demoPage.form.submit')}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
