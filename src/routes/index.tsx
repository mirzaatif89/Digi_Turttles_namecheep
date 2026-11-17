import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { lazy, memo, Suspense, useEffect, useMemo, useState } from "react";
import { JourneyHud } from "@/components/site/JourneyHud";
import { Nav } from "@/components/site/Nav";
import {
  About,
  ANCHOR,
  Blog,
  Courses,
  Cta,
  Faq,
  Footer,
  Hero,
  Interlude,
  Partners,
  Philosophy,
  Portfolio,
  Reviews,
  Services,
  Team,
} from "@/components/site/Sections";
import { resolveSite, SiteContext, siteContentQuery } from "@/lib/cms/site";
import { startScrollStory } from "@/scene/scrollState";

// three.js only loads in the browser, after hydration.
const OceanScene = lazy(() => import("@/scene/OceanScene"));

export const Route = createFileRoute("/")({
  loader: async () => {
    const raw = import.meta.env.SSR
      ? await (await import("@/lib/cms/content.server")).publicContent()
      : await (await import("@/lib/cms/site.functions")).getSiteContent();
    return { seo: resolveSite(raw).get("seo"), content: raw };
  },
  head: ({ loaderData }) => {
    const seo = loaderData?.seo ?? resolveSite(undefined).get("seo");
    return {
      meta: [
        { title: seo["title"] },
        { name: "description", content: seo["description"] },
        { property: "og:title", content: seo["shareTitle"] || seo["title"] },
        { property: "og:description", content: seo["shareDescription"] || seo["description"] },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Index,
});

function Index() {
  const initial = Route.useLoaderData().content;
  const { data } = useQuery({ ...siteContentQuery, initialData: initial });
  const site = useMemo(() => resolveSite(data), [data]);
  useEffect(() => {
    return startScrollStory();
  }, []);

  return (
    <SiteContext.Provider value={site}>
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
          <Interlude id="hatch" story={ANCHOR.hatch} beat="hatch" />
          <Courses />
          <About />
          <Interlude id="crawl" story={ANCHOR.walk} beat="walk" />
          <Services />
          <Philosophy />
          <Interlude id="dive" story={ANCHOR.dive} beat="dive" />
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
    </SiteContext.Provider>
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
