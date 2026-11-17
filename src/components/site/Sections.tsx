import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plus,
  Quote,
  Sparkles,
  Youtube,
} from "lucide-react";
import { memo, useState, type FormEvent } from "react";
import { z } from "zod";
import { sendContactMessage, subscribe } from "@/lib/cms/inbox.functions";
import { useSite } from "@/lib/cms/site";
import { ANCHOR } from "@/scene/story";
import { serviceIcon } from "./icons";
import { Tilt } from "./Tilt";

function Heading({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow?: string | undefined;
  title?: string | undefined;
  text?: string | undefined;
  center?: boolean;
}) {
  return (
    <div className={`text-depth mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-8 bg-primary" />
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          {title}
        </h2>
      )}
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </div>
  );
}

const CHIP_POS = [
  { pos: "left-[4%] top-[18%]", delay: "0s" },
  { pos: "right-[6%] top-[24%]", delay: "1.2s" },
  { pos: "right-[2%] bottom-[22%]", delay: "2.1s" },
  { pos: "left-[14%] bottom-[12%]", delay: "0.6s" },
];

function HeroSection() {
  const h = useSite().get("hero");
  const chips = [h["chip1"], h["chip2"], h["chip3"], h["chip4"]];
  const stats = [
    [h["stat1Value"], h["stat1Label"]],
    [h["stat2Value"], h["stat2Label"]],
    [h["stat3Value"], h["stat3Label"]],
  ].filter(([n, l]) => n || l);
  return (
    <section id="home" className="relative flex min-h-screen items-center px-6 pt-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="text-depth">
          {h["badge"] && (
            <span className="glass-pill inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary-glow">
              {h["badge"]}
            </span>
          )}
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
            {h["titleLine1"]}
            <br />
            <span className="text-gradient">{h["titleHighlight"]}</span>
            <br />
            {h["titleLine2"]}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">{h["subtitle"]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {h["primaryText"] && (
              <a href={h["primaryLink"] || "#services"} className="btn-hero">
                {h["primaryText"]} <ArrowRight className="h-4 w-4" />
              </a>
            )}
            {h["secondaryText"] && (
              <a href={h["secondaryLink"] || "#contact"} className="btn-glass">
                {h["secondaryText"]}
              </a>
            )}
          </div>
          {stats.length > 0 && (
            <div className="glass mt-10 grid max-w-lg grid-cols-3 gap-4 rounded-3xl p-5">
              {stats.map(([n, l], i) => (
                <div key={i}>
                  <div className="text-gradient font-display text-3xl font-bold">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative hidden h-[520px] lg:block" aria-hidden>
          {chips.map((label, i) =>
            label ? (
              <span
                key={i}
                className={`glass-pill absolute ${CHIP_POS[i]!.pos} animate-float rounded-full px-4 py-2 text-sm font-semibold`}
                style={{ animationDelay: CHIP_POS[i]!.delay }}
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary shadow-[var(--shadow-glow)]" />
                {label}
              </span>
            ) : null,
          )}
        </div>
      </div>
      <a
        href="#hatch"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
      >
        {h["scrollText"]}
        <span className="animate-bob block h-8 w-5 rounded-full border border-border">
          <span className="mx-auto mt-1.5 block h-2 w-1 rounded-full bg-primary" />
        </span>
      </a>
    </section>
  );
}

/** Tall breathing-room sections where the 3D story takes centre stage. */
function InterludeSection({
  id,
  story,
  beat,
}: {
  id: string;
  story: number;
  beat: "hatch" | "walk" | "dive";
}) {
  const s = useSite().get("story");
  return (
    <section
      id={id}
      data-story={story}
      className="relative flex min-h-[115vh] items-start px-6 pt-[16vh] md:items-center md:pt-0"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="glass max-w-sm rounded-3xl p-7">
          <span className="eyebrow">{s[`${beat}Step`]}</span>
          <h3 className="mt-3 text-3xl font-bold leading-tight">{s[`${beat}Title`]}</h3>
          <p className="mt-3 text-muted-foreground">{s[`${beat}Text`]}</p>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection({ items, big }: { items: string[]; big?: boolean }) {
  if (items.length === 0) return null;
  const row = [...items, ...items];
  return (
    <div className="glass-pill relative overflow-hidden border-x-0 py-5">
      <div className="animate-marquee flex w-max gap-10">
        {row.map((c, i) => (
          <span
            key={i}
            className={`flex items-center gap-10 whitespace-nowrap font-display font-semibold ${big ? "text-2xl tracking-widest text-muted-foreground" : "text-lg"}`}
          >
            {c}
            <Sparkles className="h-4 w-4 text-primary" />
          </span>
        ))}
      </div>
    </div>
  );
}

function CoursesMarquee() {
  const courses = useSite().list("courses");
  return <MarqueeSection items={courses.map((c) => c["title"] ?? "").filter(Boolean)} />;
}

function AboutSection() {
  const a = useSite().get("about");
  return (
    <section id="about" className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <Tilt className="overflow-hidden rounded-[2rem] p-3">
          {a["image"] && (
            <img
              src={a["image"]}
              alt={a["titleStart"] || "About us"}
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
              loading="lazy"
              decoding="async"
              width={640}
              height={800}
            />
          )}
          {a["imageCaption"] && (
            <div className="glass-pill tilt-pop absolute bottom-8 left-8 right-8 rounded-2xl p-4 font-display font-semibold">
              {a["imageCaption"]}
            </div>
          )}
        </Tilt>
        <div className="glass rounded-[2rem] p-8 md:p-12">
          <span className="eyebrow">{a["eyebrow"]}</span>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            {a["titleStart"]} <span className="text-gradient">{a["titleHighlight"]}</span>
          </h2>
          <p className="mt-6 whitespace-pre-line text-lg text-muted-foreground">{a["text"]}</p>
          {a["buttonText"] && (
            <a href={a["buttonLink"] || "#team"} className="btn-glass mt-8">
              {a["buttonText"]} <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const site = useSite();
  const head = site.heading("services");
  const services = site.list("services");
  if (services.length === 0) return null;
  return (
    <section id="services" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow={head["eyebrow"]} title={head["title"]} text={head["text"]} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = serviceIcon(s["icon"]);
            return (
              <Tilt key={s.id} className="rounded-3xl p-7">
                <span className="tilt-pop grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary-glow shadow-[var(--shadow-glow)]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{s["title"]}</h3>
                <p className="mt-2 text-muted-foreground">{s["text"]}</p>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const site = useSite();
  const head = site.heading("philosophy");
  const cards = site.list("philosophy");
  if (cards.length === 0) return null;
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow={head["eyebrow"]} title={head["title"]} text={head["text"]} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((p, i) => (
            <Tilt key={p.id} className="rounded-3xl p-6">
              <span className="text-gradient font-display text-4xl font-extrabold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{p["title"]}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p["text"]}</p>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaybeLink({ href, children }: { href?: string | undefined; children: React.ReactNode }) {
  if (!href) return <>{children}</>;
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  );
}

function PortfolioSection() {
  const site = useSite();
  const head = site.heading("projects");
  const projects = site.list("projects");
  if (projects.length === 0) return null;
  return (
    <section id="portfolio" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading eyebrow={head["eyebrow"]} title={head["title"]} />
          {head["buttonText"] && (
            <a href="#contact" className="btn-glass mb-12">
              {head["buttonText"]} <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <Tilt key={p.id} className="group overflow-hidden rounded-3xl p-2.5">
              <MaybeLink href={p["link"]}>
                <div className="overflow-hidden rounded-[1.25rem]">
                  {p["image"] && (
                    <img
                      src={p["image"]}
                      alt={p["title"]}
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={480}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary-glow">
                    {p["tag"]}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold">{p["title"]}</h3>
                </div>
              </MaybeLink>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const site = useSite();
  const head = site.heading("team");
  const team = site.list("team");
  if (team.length === 0) return null;
  return (
    <section id="team" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow={head["eyebrow"]} title={head["title"]} text={head["text"]} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <Tilt key={m.id} className="rounded-3xl p-2.5">
              {m["image"] && (
                <img
                  src={m["image"]}
                  alt={`${m["name"]}, ${m["role"]}`}
                  loading="lazy"
                  decoding="async"
                  width={640}
                  height={800}
                  className="aspect-[4/5] w-full rounded-[1.25rem] object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{m["name"]}</h3>
                <p className="text-sm font-medium text-primary-glow">{m["role"]}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m["bio"]}</p>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const site = useSite();
  const head = site.heading("posts");
  const posts = site.list("posts");
  if (posts.length === 0) return null;
  return (
    <section id="blog" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading eyebrow={head["eyebrow"]} title={head["title"]} text={head["text"]} />
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((p) => (
            <Tilt key={p.id} className="group rounded-3xl p-2.5">
              <MaybeLink href={p["link"]}>
                <div className="overflow-hidden rounded-[1.25rem]">
                  {p["image"] && (
                    <img
                      src={p["image"]}
                      alt={p["title"]}
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={400}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {p["meta"]}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{p["title"]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p["text"]}</p>
                </div>
              </MaybeLink>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(254),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1, "Please write a message").max(4000),
});

function ContactForm({ title }: { title?: string | undefined }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone") || undefined,
      message: form.get("message"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setError("");
    setState("sending");
    try {
      await sendContactMessage({ data: parsed.data });
      setState("sent");
    } catch (error) {
      setState("idle");
      setError(
        error instanceof Error ? error.message : "Could not send your message. Please try again.",
      );
    }
  };
  if (state === "sent") {
    return (
      <p className="glass mx-auto mt-10 max-w-xl rounded-2xl p-6 text-left font-semibold">
        Thank you! Your message has been sent — we'll get back to you soon.
      </p>
    );
  }
  return (
    <form onSubmit={submit} noValidate className="mx-auto mt-10 grid max-w-xl gap-3 text-left">
      {title && <p className="font-display text-lg font-semibold">{title}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="Your name" className="login-input px-4" maxLength={120} />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="login-input px-4"
          maxLength={254}
        />
      </div>
      <input
        name="phone"
        placeholder="Phone (optional)"
        className="login-input px-4"
        maxLength={40}
      />
      <textarea
        name="message"
        placeholder="How can we help?"
        rows={4}
        maxLength={4000}
        className="login-input h-auto px-4 py-3"
      />
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-hero justify-center disabled:opacity-70"
      >
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function CtaSection() {
  const c = useSite().get("cta");
  return (
    <section id="contact" className="px-6 py-20">
      <Tilt
        max={4}
        className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16"
      >
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
        <h2 className="text-4xl font-bold md:text-6xl">
          {c["titleStart"]} <span className="text-gradient">{c["titleHighlight"]}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{c["text"]}</p>
        {c["buttonText"] && (
          <a href={c["buttonLink"] || "#contact"} className="btn-hero mt-8">
            {c["buttonText"]} <ArrowRight className="h-4 w-4" />
          </a>
        )}
        <ContactForm title={c["formTitle"]} />
      </Tilt>
    </section>
  );
}

function PartnersSection() {
  const site = useSite();
  const head = site.heading("partners");
  const partners = site
    .list("partners")
    .map((p) => p["name"] ?? "")
    .filter(Boolean);
  if (partners.length === 0) return null;
  return (
    <section className="py-20">
      <div className="px-6">
        <Heading center eyebrow={head["eyebrow"]} title={head["title"]} text={head["text"]} />
      </div>
      <MarqueeSection items={partners} big />
    </section>
  );
}

function ReviewsSection() {
  const site = useSite();
  const head = site.heading("reviews");
  const reviews = site.list("reviews");
  if (reviews.length === 0) return null;
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <Heading center eyebrow={head["eyebrow"]} title={head["title"]} text={head["text"]} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Tilt key={r.id} className="flex flex-col rounded-3xl p-7">
              <Quote className="h-7 w-7 text-primary" />
              <blockquote className="mt-4 flex-1 text-foreground/90">“{r["quote"]}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-accent font-display text-sm font-bold text-primary-glow">
                  {(r["name"] ?? "")
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 3)}
                </span>
                <div>
                  <p className="font-semibold">{r["name"]}</p>
                  <p className="text-sm text-muted-foreground">{r["role"]}</p>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const site = useSite();
  const head = site.heading("faqs");
  const faqs = site.list("faqs");
  if (faqs.length === 0) return null;
  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <Heading eyebrow={head["eyebrow"]} title={head["title"]} text={head["text"]} />
          {head["boxTitle"] && (
            <div className="glass rounded-3xl p-6">
              <p className="font-semibold">{head["boxTitle"]}</p>
              <a href="#contact" className="btn-hero mt-4">
                {head["boxButton"] || "Contact us"} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.id} className="faq glass group rounded-2xl px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold">
                {f["q"]}
                <Plus className="faq-icon h-5 w-5 shrink-0 text-primary transition-transform duration-300" />
              </summary>
              <p className="mt-3 whitespace-pre-line text-muted-foreground">{f["a"]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubscribeForm() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "")
      .trim()
      .toLowerCase();
    if (!z.string().email().max(254).safeParse(email).success) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setState("sending");
    try {
      await subscribe({ data: { email } });
      setState("done");
    } catch (error) {
      setState("idle");
      setError(error instanceof Error ? error.message : "Could not subscribe right now.");
    }
  };
  if (state === "done")
    return (
      <p className="mt-4 text-sm font-semibold text-primary-glow">You're subscribed. Thank you!</p>
    );
  return (
    <form onSubmit={submit} noValidate className="mt-4 flex max-w-sm gap-2">
      <input
        name="email"
        type="email"
        placeholder="Your email"
        className="login-input px-4"
        maxLength={254}
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-hero shrink-0 px-5 py-2 text-sm"
      >
        Subscribe
      </button>
      {error && (
        <p className="mt-2 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

function FooterSection() {
  const site = useSite();
  const f = site.get("footer");
  const brand = site.get("brand");
  const nav = site.list("nav_links");
  const socials = [
    { href: f["facebook"], Icon: Facebook, label: "Facebook" },
    { href: f["instagram"], Icon: Instagram, label: "Instagram" },
    { href: f["linkedin"], Icon: Linkedin, label: "LinkedIn" },
    { href: f["youtube"], Icon: Youtube, label: "YouTube" },
  ].filter((s) => s["href"]);
  return (
    <footer className="px-6 pb-8 pt-16">
      <div className="glass glass-strong mx-auto max-w-7xl rounded-[2rem] p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold">{brand["siteName"]}</p>
            <p className="mt-2 text-muted-foreground">{f["about"]}</p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {f["email"] && (
                <a
                  href={`mailto:${f["email"]}`}
                  className="flex items-center gap-2 hover:text-primary-glow"
                >
                  <Mail className="h-4 w-4" /> {f["email"]}
                </a>
              )}
              {f["phone"] && (
                <a
                  href={`tel:${f["phone"]}`}
                  className="flex items-center gap-2 hover:text-primary-glow"
                >
                  <Phone className="h-4 w-4" /> {f["phone"]}
                </a>
              )}
              {f["address"] && (
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {f["address"]}
                </p>
              )}
            </div>
            {socials.length > 0 && (
              <div className="mt-4 flex gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="glass-pill grid h-9 w-9 place-items-center rounded-full hover:text-primary-glow"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {nav.map((l) => (
                <a key={l.id} href={l["href"]} className="hover:text-primary-glow">
                  {l["label"]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-display text-lg font-semibold">{f["ctaTitle"]}</p>
            <p className="mt-2 text-sm text-muted-foreground">{f["ctaText"]}</p>
            {f["ctaButton"] && (
              <a href="#contact" className="btn-hero mt-4">
                {f["ctaButton"]}
              </a>
            )}
            <SubscribeForm />
          </div>
        </div>
        <div className="mt-10 border-t pt-6 text-sm text-muted-foreground">{f["copyright"]}</div>
      </div>
    </footer>
  );
}

const Hero = memo(HeroSection);
const Interlude = memo(InterludeSection);
const Courses = memo(CoursesMarquee);
const About = memo(AboutSection);
const Services = memo(ServicesSection);
const Philosophy = memo(PhilosophySection);
const Portfolio = memo(PortfolioSection);
const Team = memo(TeamSection);
const Blog = memo(BlogSection);
const Cta = memo(CtaSection);
const Partners = memo(PartnersSection);
const Reviews = memo(ReviewsSection);
const Faq = memo(FaqSection);
const Footer = memo(FooterSection);

export {
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
};
