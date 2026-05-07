import { TestCaseSection } from "@/components/layout/TestCaseSection";
import { AnalyticsPreview } from "./components/AnalyticsPreview";
import { CTA } from "./components/CTA";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { HowItWorks } from "./components/HowItWorks";
import { PainPointsSection } from "./components/PainPointsSection";
import { PositioningSection } from "./components/PositioningSection";
import { SocialProofSection } from "./components/SocialProffSection";
import { UseCasesSection } from "./components/UseCasesSection";

export default function LandingPage() {
  return (
    <div className="dark min-h-screen bg-background font-sans text-foreground selection:bg-primary/30">
      <main>
        <HeroSection />
        <SocialProofSection />
        <PositioningSection />
        <PainPointsSection />
        <Features />
        <UseCasesSection />
        <TestCaseSection />
        <HowItWorks />
        <AnalyticsPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
