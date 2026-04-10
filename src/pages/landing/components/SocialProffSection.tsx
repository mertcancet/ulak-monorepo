import { useTranslations } from "@/i18n";
import React from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4";

type Brand = {
  name: string;
};

export function SocialProofSection() {
  const t = useTranslations();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf: number;
    let fadeTimeout: ReturnType<typeof setTimeout> | null = null;
    const fadeDuration = 0.5; // seconds

    function animate() {
      if (!video) return;
      const { currentTime, duration } = video;
      if (duration > 0) {
        if (currentTime < fadeDuration) {
          setOpacity(Math.min(1, currentTime / fadeDuration));
        } else if (currentTime > duration - fadeDuration) {
          setOpacity(Math.max(0, (duration - currentTime) / fadeDuration));
        } else {
          setOpacity(1);
        }
      }
      raf = requestAnimationFrame(animate);
    }

    function handleEnded() {
      setOpacity(0);
      fadeTimeout = setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play();
        }
      }, 100);
    }

    video.addEventListener("ended", handleEnded);
    raf = requestAnimationFrame(animate);

    return () => {
      video.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(raf);
      if (fadeTimeout) clearTimeout(fadeTimeout);
    };
  }, []);

  const modules: Brand[] = [
    { name: t("landing.socialProof.items.agents") },
    { name: t("landing.socialProof.items.flowBuilder") },
    { name: t("landing.socialProof.items.knowledgeBase") },
    { name: t("landing.socialProof.items.callHistory") },
    { name: t("landing.socialProof.items.analytics") },
    { name: t("landing.socialProof.items.numbers") },
  ];

  // Marquee content (duplicate for seamless loop)
  const marqueeBrands: Brand[] = [...modules, ...modules];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity, transition: "opacity 0.3s linear" }}
      />
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-20 px-4 pb-24 pt-16">
        <div className="h-40" />
        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-5xl flex-row items-center gap-8">
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee flex flex-row items-center gap-16">
                <span className="shrink-0 whitespace-nowrap px-8 text-sm font-medium text-foreground/50">
                  {t("landing.socialProof.lead")}
                </span>
                {marqueeBrands.map(brand => (
                  <div key={brand.name} className="flex items-center gap-3">
                    <span className="text-base font-semibold text-foreground">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
