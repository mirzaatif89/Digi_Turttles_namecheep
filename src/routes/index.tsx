import { createFileRoute } from "@tanstack/react-router";
import { lazy, memo, Suspense, useEffect, useState } from "react";
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
import { SERVICES } from "@/components/site/content";
import { getPublishedServices } from "@/lib/services.functions";
import type { PublicService } from "@/lib/services.schemas";
import { startScrollStory } from "@/scene/scrollState";

// three.js only loads in the browser, after hydration.
const OceanScene = lazy(() => import("@/scene/OceanScene"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digi Turtles — Learn. Build. Grow. Become Independent." },
      {
        name: "description",
        content:
          "Digi Turtles is an Institute + Agency: practical digital skills for learners and real growth for businesses, under one roof.",
      },
      { property: "og:title", content: "Digi Turtles — Learn. Build. Grow." },
      {
        property: "og:description",
        content:
          "Practical digital skills and real business growth. Follow the turtle from egg to ocean.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    return startScrollStory();
  }, []);

  return (
    <div className="relative">
      <SceneLayer />
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[image:var(--gradient-veil)]"
        aria-hidden
      />
      <Nav />
      <JourneyHud />
      <main className="relative z-10">
        <Hero />
        <Interlude
          id="hatch"
          story={ANCHOR.hatch}
          step="01 · Hatch"
          title="Every expert begins as a beginner."
          text="One small crack, then another. Growth starts from the inside."
        />
        <Marquee items={COURSES} />
        <About />
        <Interlude
          id="crawl"
          story={ANCHOR.walk}
          step="02 · Keep moving"
          title="Small steps compound over time."
          text="Not the fastest across the sand — but always heading for the sea."
        />
        <ServicesLoader />
        <Philosophy />
        <Interlude
          id="dive"
          story={ANCHOR.dive}
          step="03 · Dive in"
          title="Knowledge matters when applied."
          text="The moment you stop watching and start doing, the whole ocean opens up."
        />
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

/** Isolates post-paint scene loading and readiness renders from page sections. */
const SceneLayer = memo(function SceneLayer() {
  const [loadScene, setLoadScene] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.requestIdleCallback?.(() => setLoadScene(true), { timeout: 1200 });
    const fallback = id === undefined ? window.setTimeout(() => setLoadScene(true), 0) : undefined;
    return () => {
      if (id !== undefined) window.cancelIdleCallback?.(id);
      if (fallback !== undefined) window.clearTimeout(fallback);
    };
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
      data-scene-ready={ready ? "" : undefined}
      aria-hidden
    >
      {loadScene && (
        <Suspense fallback={null}>
          <OceanScene onReady={() => setReady(true)} />
        </Suspense>
      )}
    </div>
  );
});

const fallbackServices: PublicService[] = SERVICES.map((service, index) => ({
  id: `bundled-service-${index + 1}`,
  title: service.title,
  text: service.text,
  icon: service.icon,
  sortOrder: index,
}));

/** Keeps the home route DB-free during SSR, then upgrades the bundled cards at idle. */
const ServicesLoader = memo(function ServicesLoader() {
  const [services, setServices] = useState<PublicService[]>(fallbackServices);
  useEffect(() => {
    let cancelled = false;
    const load = () => {
      void getPublishedServices()
        .then((result) => {
          if (!cancelled && Array.isArray(result)) setServices(result as PublicService[]);
        })
        .catch(() => {
          // Bundled content is already visible and is the deliberate fallback.
        });
    };
    const idleId = window.requestIdleCallback?.(load, { timeout: 1500 });
    const timeoutId = idleId === undefined ? window.setTimeout(load, 0) : undefined;
    return () => {
      cancelled = true;
      if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);
  return <Services services={services} />;
});
