import { Navbar } from './Navbar';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 pt-56">
        <h1
          className="bg-clip-text text-[clamp(3.5rem,18vw,230px)] font-normal leading-[1.02] tracking-[-0.024em] text-transparent"
          style={{
            fontFamily: 'General Sans, Geist Sans, Inter, system-ui, sans-serif',
            backgroundImage: 'linear-gradient(223deg, #E8E8E9 0%, #3A7BBF 104.15%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Ulak AI
        </h1>
      </div>
    </section>
  );
}
