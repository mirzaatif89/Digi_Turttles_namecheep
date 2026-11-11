import { ArrowRight, Bot, Gem, GraduationCap, Megaphone, Plus, Quote, Search, Sparkles, Target } from "lucide-react";
import classroom from "@/assets/classroom.jpg";
import { ANCHOR } from "@/scene/story";
import { COURSES, FAQS, PARTNERS, PHILOSOPHY, POSTS, PROJECTS, REVIEWS, SERVICES, TEAM } from "./content";
import { Tilt } from "./Tilt";

const ICONS = { Target, Megaphone, Bot, Search, Gem, GraduationCap };

function Heading({ eyebrow, title, text, center }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`text-depth mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow">
        <span className="h-px w-8 bg-primary" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </div>
  );
}

export function Hero() {
  const chips = [
    { label: "AI Automation", pos: "left-[4%] top-[18%]", delay: "0s" },
    { label: "Brand Building", pos: "right-[6%] top-[24%]", delay: "1.2s" },
    { label: "8 Practical Courses", pos: "right-[2%] bottom-[22%]", delay: "2.1s" },
    { label: "SEO & Growth", pos: "left-[14%] bottom-[12%]", delay: "0.6s" },
  ];
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="text-depth">
          <span className="glass-pill inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary-glow">Institute + Agency</span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
            Learn. Build.
            <br />
            <span className="text-gradient">Grow.</span>
            <br />
            Become Independent.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Digital skills + the turtle mindset. Practical education for learners and real growth for businesses — under one roof.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#services" className="btn-hero">
              Explore Services <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-glass">
              Contact Us
            </a>
          </div>
          <div className="glass mt-10 grid max-w-lg grid-cols-3 gap-4 rounded-3xl p-5">
            {[
              ["8", "Courses"],
              ["5+", "Agency services"],
              ["1", "Growth ecosystem"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-gradient font-display text-3xl font-bold">{n}</div>
                <div className="text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden h-[520px] lg:block" aria-hidden>
          {chips.map((c) => (
            <span key={c.label} className={`glass-pill absolute ${c.pos} animate-float rounded-full px-4 py-2 text-sm font-semibold`} style={{ animationDelay: c.delay }}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
              {c.label}
            </span>
          ))}
        </div>
      </div>
      <a href="#hatch" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        Scroll to hatch
        <span className="animate-bob block h-8 w-5 rounded-full border border-border">
          <span className="mx-auto mt-1.5 block h-2 w-1 rounded-full bg-primary" />
        </span>
      </a>
    </section>
  );
}

/** Tall breathing-room sections where the 3D story takes centre stage. */
export function Interlude({ id, story, step, title, text }: { id: string; story: number; step: string; title: string; text: string }) {
  return (
    <section id={id} data-story={story} className="relative flex min-h-[115vh] items-start px-6 pt-[16vh] md:items-center md:pt-0">
      <div className="mx-auto w-full max-w-7xl">
        <div className="glass max-w-sm rounded-3xl p-7">
          <span className="eyebrow">{step}</span>
          <h3 className="mt-3 text-3xl font-bold leading-tight">{title}</h3>
          <p className="mt-3 text-muted-foreground">{text}</p>
        </div>
      </div>
    </section>
  );
}

export function Marquee({ items, big }: { items: string[]; big?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="glass-pill relative overflow-hidden border-x-0 py-5">
      <div className="animate-marquee flex w-max gap-10">
        {row.map((c, i) => (
          <span key={i} className={`flex items-center gap-10 whitespace-nowrap font-display font-semibold ${big ? "text-2xl tracking-widest text-muted-foreground" : "text-lg"}`}>
            {c}
            <Sparkles className="h-4 w-4 text-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <Tilt className="overflow-hidden rounded-[2rem] p-3">
          <img src={classroom} alt="Students learning digital skills" className="aspect-[4/5] w-full rounded-[1.5rem] object-cover" loading="lazy" width={640} height={800} />
          <div className="glass-pill tilt-pop absolute bottom-8 left-8 right-8 rounded-2xl p-4 font-display font-semibold">
            Learn → Build <span className="text-muted-foreground">→ Showcase → Monetize</span>
          </div>
        </Tilt>
        <div className="glass rounded-[2rem] p-8 md:p-12">
          <span className="eyebrow">Who we are</span>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Not the fastest. <span className="text-gradient">The one that keeps moving.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Digi Turtles brings an Institute for practical skills and an Agency for real business growth together — so learners become professionals and businesses become stronger, more independent brands.
          </p>
          <a href="#team" className="btn-glass mt-8">
            Our story <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow="Agency services" title="Your growth partner, not a vendor" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <Tilt key={s.title} className="rounded-3xl p-7">
                <span className="tilt-pop grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary-glow shadow-[var(--shadow-glow)]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.text}</p>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow="The turtle philosophy" title="Don't just learn. Become independent." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PHILOSOPHY.map((p, i) => (
            <Tilt key={p.title} className="rounded-3xl p-6">
              <span className="text-gradient font-display text-4xl font-extrabold">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow="Portfolio" title="Recent work" />
          <a href="#contact" className="btn-glass mb-12">
            Start a project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <Tilt key={p.title} className="group overflow-hidden rounded-3xl p-2.5">
              <div className="overflow-hidden rounded-[1.25rem]">
                <img src={p.img} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary-glow">{p.tag}</span>
                <h3 className="mt-1 text-xl font-semibold">{p.title}</h3>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow="Our team" title="Meet the turtles" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <Tilt key={m.name} className="rounded-3xl p-2.5">
              <img src={m.img} alt={`${m.name}, ${m.role}`} loading="lazy" className="aspect-[4/5] w-full rounded-[1.25rem] object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{m.name}</h3>
                <p className="text-sm font-medium text-primary-glow">{m.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.bio}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section id="blog" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow="From the blog" title="Ideas that help you grow" />
        <div className="grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <Tilt key={p.title} className="group rounded-3xl p-2.5">
              <div className="overflow-hidden rounded-[1.25rem]">
                <img src={p.img} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{p.meta}</p>
                <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section id="contact" className="px-6 py-20">
      <Tilt max={4} className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
        <h2 className="text-4xl font-bold md:text-6xl">
          Your journey <span className="text-gradient">starts here.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Take the first bold step — join a course or let our agency grow your brand.</p>
        <a href="mailto:hello@digiturtles.com" className="btn-hero mt-8">
          Get in touch <ArrowRight className="h-4 w-4" />
        </a>
      </Tilt>
    </section>
  );
}

export function Partners() {
  return (
    <section className="py-20">
      <div className="px-6">
        <Heading center eyebrow="Trusted partnerships" title="Brands we've worked with" text="Helping teams turn ideas into systems, campaigns and growth." />
      </div>
      <Marquee items={PARTNERS} big />
    </section>
  );
}

export function Reviews() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading center eyebrow="Client reviews" title="Work that keeps people moving" text="A few words about the systems, campaigns and learning experiences we create together." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <Tilt key={r.name} className="flex flex-col rounded-3xl p-7">
              <Quote className="h-7 w-7 text-primary" />
              <blockquote className="mt-4 flex-1 text-foreground/90">“{r.quote}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent font-display text-sm font-bold text-primary-glow">
                  {r.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Heading eyebrow="FAQ" title="Questions before your first step?" text="Here are the answers to the things clients and learners ask us most often." />
          <div className="glass rounded-3xl p-6">
            <p className="font-semibold">Still have questions?</p>
            <a href="#contact" className="btn-hero mt-4">
              Contact us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="faq glass group rounded-2xl px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold">
                {f.q}
                <Plus className="faq-icon h-5 w-5 shrink-0 text-primary transition-transform duration-300" />
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-6 pb-8 pt-16">
      <div className="glass glass-strong mx-auto max-w-7xl rounded-[2rem] p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold">DIGI TURTLES</p>
            <p className="mt-2 text-muted-foreground">Institute + Agency. Learn. Build. Grow. Become Independent.</p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {["Home", "About", "Services", "Portfolio", "Team", "Blog"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-primary-glow">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-lg font-semibold">Keep Moving. Keep Growing.</p>
            <p className="mt-2 text-sm text-muted-foreground">Your journey starts with one bold first step.</p>
            <a href="#contact" className="btn-hero mt-4">
              Start Today
            </a>
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">© 2026 Digi Turtles · Learn | Create | Grow</div>
      </div>
    </footer>
  );
}

export { ANCHOR, COURSES };
