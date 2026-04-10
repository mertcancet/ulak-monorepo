import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="bg-mesh relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-40 text-white">
      <div className="hero-blob -right-20 -top-20"></div>
      <div className="hero-blob -left-20 bottom-0"></div>
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          Next-Gen Voice Intelligence
        </div>
        <h1 className="mb-8 font-display text-6xl font-bold leading-[1.1] tracking-tight md:text-7xl">
          The Future of Customer <br />
          <span className="gradient-text">Experience is Autonomous</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-slate-400">
          Deploy human-like AI voice agents that handle support, sales, and scheduling 24/7 with
          zero latency and perfect sentiment.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent-purple px-8 py-7 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:scale-105 sm:w-auto">
            Get Started Free
          </Button>
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-xl border-white/10 bg-white/5 px-8 py-7 text-lg font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
          >
            <PlayCircle size={20} />
            Watch Demo
          </Button>
        </div>
      </div>

      {/* Abstract Neural Network Visualization */}
      <div className="relative mx-auto mt-20 w-full max-w-6xl px-6">
        <div className="glass group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          <img
            className="h-full w-full scale-110 object-cover opacity-40 mix-blend-screen transition-transform duration-700 group-hover:scale-100"
            alt="Abstract neural network connections in deep blue"
            src="https://images.unsplash.com/photo-1620712943543-bcc4638d9980?q=80&w=2000&auto=format&fit=crop"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="glass flex flex-col items-center rounded-2xl border-white/20 p-8">
              <div className="mb-4 flex gap-1">
                <div className="h-8 w-1 animate-pulse rounded-full bg-accent-mint"></div>
                <div className="h-12 w-1 animate-bounce rounded-full bg-primary"></div>
                <div className="h-16 w-1 animate-pulse rounded-full bg-accent-purple"></div>
                <div className="h-12 w-1 animate-bounce rounded-full bg-primary"></div>
                <div className="h-8 w-1 animate-pulse rounded-full bg-accent-mint"></div>
              </div>
              <p className="font-mono text-sm tracking-tighter text-accent-mint">
                AI AGENT ONLINE // READY TO ASSIST
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
