import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { JourneyHud } from "@/components/site/JourneyHud";
import { Nav } from "@/components/site/Nav";
import {
  About,
  ANCHOR,
  Blog,
  COURSES,
  Cta,
  Faq,
  Footer,
  Hero,
  Interlude,
  Marquee,
  Partners,
  Philosophy,
  Portfolio,
  Reviews,
  Services,
  Team,
} from "@/components/site/Sections";
import { startScrollStory } from "@/scene/scrollState";

// three.js only loads in the browser, after hydration.
const OceanScene = lazy(() => import("@/scene/OceanScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digi Turtles — Learn. Build. Grow. Become Independent." },
      { name: "description", content: "Digi Turtles is an Institute + Agency: practical digital skills for learners and real growth for businesses, under one roof." },
      { property: "og:title", content: "Digi Turtles — Learn. Build. Grow." },
      { property: "og:description", content: "Practical digital skills and real business growth. Follow the turtle from egg to ocean." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setMounted(true);
    return startScrollStory();
  }, []);

  return (
    <div className="relative">
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: ready ? 1 : 0 }}
        data-scene-ready={ready ? "" : undefined}
        aria-hidden
      >
        {mounted && (
          <Suspense fallback={null}>
            <OceanScene onReady={() => setReady(true)} />
          </Suspense>
        )}
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[image:var(--gradient-veil)]" aria-hidden />
      <Nav />
      <JourneyHud />
      <main className="relative z-10">
        <Hero />
        <Interlude id="hatch" story={ANCHOR.hatch} step="01 · Hatch" title="Every expert begins as a beginner." text="One small crack, then another. Growth starts from the inside." />
        <Marquee items={COURSES} />
        <About />
        <Interlude id="crawl" story={ANCHOR.walk} step="02 · Keep moving" title="Small steps compound over time." text="Not the fastest across the sand — but always heading for the sea." />
        <Services />
        <Philosophy />
        <Interlude id="dive" story={ANCHOR.dive} step="03 · Dive in" title="Knowledge matters when applied." text="The moment you stop watching and start doing, the whole ocean opens up." />
        <Portfolio />
        <Team />
        <Blog />
        <Cta />
        <Partners />
        <Reviews />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}
