export const SocialProof = () => {
  return (
    <section className="border-y border-white/5 bg-background-dark/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          Trusted by Global Enterprises
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 contrast-125 grayscale md:gap-24">
          {/* Replace these with Generic Logos or Placeholders */}
          <span className="text-2xl font-bold tracking-widest text-white">TECHCORP</span>
          <span className="text-2xl font-bold tracking-widest text-white">GLOBALCON</span>
          <span className="text-2xl font-bold tracking-widest text-white">NEXUS</span>
          <span className="text-2xl font-bold tracking-widest text-white">VANGUARD</span>
          <span className="text-2xl font-bold tracking-widest text-white">QUANTUM</span>
        </div>
      </div>
    </section>
  );
};
