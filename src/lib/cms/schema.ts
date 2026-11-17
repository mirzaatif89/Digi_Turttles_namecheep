import classroomAsset from "@/assets/classroom.jpg";
import logoAsset from "@/assets/logo.png";
import analyticsAsset from "@/assets/project-analytics.jpg";
import brandingAsset from "@/assets/project-branding.jpg";
import adilAsset from "@/assets/team-adil-syed.jpeg";
import atifAsset from "@/assets/team-atif-mehmood.jpeg";
import hamzaAsset from "@/assets/team-hamza.jpeg";
import zeeshanAsset from "@/assets/team-syed-zeeshan-ali.jpeg";

/**
 * Single source of truth for every editable piece of the website.
 * Admin forms, the public site and the database seed are all driven from here.
 */

export type FieldType = "text" | "textarea" | "image" | "url" | "icon";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  help?: string;
};

export type Data = Record<string, string>;

export type SingletonDef = {
  kind: "singleton";
  key: string;
  label: string;
  description: string;
  icon: string;
  group: AdminGroup;
  fields: Field[];
  defaults: Data;
};

export type CollectionDef = {
  kind: "collection";
  key: string;
  label: string;
  description: string;
  icon: string;
  group: AdminGroup;
  itemLabel: string;
  titleField: string;
  subtitleField?: string;
  imageField?: string;
  fields: Field[];
  /** Section heading shown above the list on the website (stored as `section_<key>`). */
  heading?: { fields: Field[]; defaults: Data };
  defaults: Data[];
};

export type AdminGroup = "Website" | "Content";

export const ICON_NAMES = [
  "Target",
  "Megaphone",
  "Bot",
  "Search",
  "Gem",
  "GraduationCap",
  "ChartNoAxesCombined",
  "Palette",
  "Code2",
  "Camera",
  "Video",
  "PenTool",
  "Rocket",
  "ShoppingCart",
  "Globe",
  "Sparkles",
] as const;
export type IconName = (typeof ICON_NAMES)[number];

const A = {
  classroom: classroomAsset,
  logo: logoAsset,
  analytics: analyticsAsset,
  branding: brandingAsset,
  adil: adilAsset,
  atif: atifAsset,
  hamza: hamzaAsset,
  zeeshan: zeeshanAsset,
};
export const DEFAULT_LOGO = A.logo;

const t = (name: string, label: string, extra: Partial<Field> = {}): Field => ({
  name,
  label,
  type: "text",
  ...extra,
});
const ta = (name: string, label: string, extra: Partial<Field> = {}): Field => ({
  name,
  label,
  type: "textarea",
  ...extra,
});
const img = (name: string, label: string): Field => ({ name, label, type: "image" });
const heading = (eyebrow: string, title: string, text = "") => ({
  fields: [t("eyebrow", "Small label"), t("title", "Heading"), ta("text", "Intro text")],
  defaults: { eyebrow, title, text },
});

export const SINGLETONS: SingletonDef[] = [
  {
    kind: "singleton",
    key: "brand",
    label: "Logo & Branding",
    description: "Website name, tagline and logo shown in the menu and footer.",
    icon: "Palette",
    group: "Website",
    fields: [
      t("siteName", "Website name"),
      t("tagline", "Tagline under the name"),
      img("logo", "Logo"),
    ],
    defaults: { siteName: "DIGI TURTLES", tagline: "Where Ideas Evolve", logo: A.logo },
  },
  {
    kind: "singleton",
    key: "hero",
    label: "Home (Top Banner)",
    description: "The first thing visitors see: headline, buttons, numbers and floating tags.",
    icon: "House",
    group: "Website",
    fields: [
      t("badge", "Small badge"),
      t("titleLine1", "Headline – line 1"),
      t("titleHighlight", "Headline – highlighted word"),
      t("titleLine2", "Headline – line 3"),
      ta("subtitle", "Sub-heading"),
      t("primaryText", "Main button text"),
      t("primaryLink", "Main button link", { type: "url" }),
      t("secondaryText", "Second button text"),
      t("secondaryLink", "Second button link", { type: "url" }),
      t("stat1Value", "Number 1", { help: "Leave empty to hide it from the website." }),
      t("stat1Label", "Number 1 label"),
      t("stat2Value", "Number 2", { help: "Leave empty to hide it from the website." }),
      t("stat2Label", "Number 2 label"),
      t("stat3Value", "Number 3", { help: "Leave empty to hide it from the website." }),
      t("stat3Label", "Number 3 label"),
      t("chip1", "Floating tag 1", { help: "Leave empty to hide it from the website." }),
      t("chip2", "Floating tag 2", { help: "Leave empty to hide it from the website." }),
      t("chip3", "Floating tag 3", { help: "Leave empty to hide it from the website." }),
      t("chip4", "Floating tag 4", { help: "Leave empty to hide it from the website." }),
      t("scrollText", "Scroll hint text"),
    ],
    defaults: {
      badge: "Institute + Agency",
      titleLine1: "Learn. Build.",
      titleHighlight: "Grow.",
      titleLine2: "Become Independent.",
      subtitle:
        "Digital skills + the turtle mindset. Practical education for learners and real growth for businesses — under one roof.",
      primaryText: "Explore Services",
      primaryLink: "#services",
      secondaryText: "Contact Us",
      secondaryLink: "#contact",
      stat1Value: "8",
      stat1Label: "Courses",
      stat2Value: "5+",
      stat2Label: "Agency services",
      stat3Value: "1",
      stat3Label: "Growth ecosystem",
      chip1: "AI Automation",
      chip2: "Brand Building",
      chip3: "8 Practical Courses",
      chip4: "SEO & Growth",
      scrollText: "Scroll to hatch",
    },
  },
  {
    kind: "singleton",
    key: "story",
    label: "Turtle Story Cards",
    description: "The three cards shown while the turtle hatches, crawls and dives.",
    icon: "Sparkles",
    group: "Website",
    fields: [
      t("hatchStep", "Card 1 – label"),
      t("hatchTitle", "Card 1 – heading"),
      ta("hatchText", "Card 1 – text"),
      t("walkStep", "Card 2 – label"),
      t("walkTitle", "Card 2 – heading"),
      ta("walkText", "Card 2 – text"),
      t("diveStep", "Card 3 – label"),
      t("diveTitle", "Card 3 – heading"),
      ta("diveText", "Card 3 – text"),
    ],
    defaults: {
      hatchStep: "01 · Hatch",
      hatchTitle: "Every expert begins as a beginner.",
      hatchText: "One small crack, then another. Growth starts from the inside.",
      walkStep: "02 · Keep moving",
      walkTitle: "Small steps compound over time.",
      walkText: "Not the fastest across the sand — but always heading for the sea.",
      diveStep: "03 · Dive in",
      diveTitle: "Knowledge matters when applied.",
      diveText: "The moment you stop watching and start doing, the whole ocean opens up.",
    },
  },
  {
    kind: "singleton",
    key: "about",
    label: "About Us",
    description: "The “Who we are” section with photo.",
    icon: "HeartHandshake",
    group: "Website",
    fields: [
      img("image", "Photo"),
      t("imageCaption", "Caption on photo"),
      t("eyebrow", "Small label"),
      t("titleStart", "Heading"),
      t("titleHighlight", "Heading – highlighted part"),
      ta("text", "Text"),
      t("buttonText", "Button text"),
      t("buttonLink", "Button link", { type: "url" }),
    ],
    defaults: {
      image: A.classroom,
      imageCaption: "Learn → Build → Showcase → Monetize",
      eyebrow: "Who we are",
      titleStart: "Not the fastest.",
      titleHighlight: "The one that keeps moving.",
      text: "Digi Turtles brings an Institute for practical skills and an Agency for real business growth together — so learners become professionals and businesses become stronger, more independent brands.",
      buttonText: "Our story",
      buttonLink: "#team",
    },
  },
  {
    kind: "singleton",
    key: "cta",
    label: "Contact Section",
    description: "The “Your journey starts here” block and the contact form.",
    icon: "MousePointerClick",
    group: "Website",
    fields: [
      t("titleStart", "Heading"),
      t("titleHighlight", "Heading – highlighted part"),
      ta("text", "Text"),
      t("buttonText", "Button text"),
      t("buttonLink", "Button link", { type: "url", help: "e.g. mailto:hello@digiturtles.com" }),
      t("formTitle", "Contact form heading"),
    ],
    defaults: {
      titleStart: "Your journey",
      titleHighlight: "starts here.",
      text: "Take the first bold step — join a course or let our agency grow your brand.",
      buttonText: "Get in touch",
      buttonLink: "mailto:hello@digiturtles.com",
      formTitle: "Or send us a message",
    },
  },
  {
    kind: "singleton",
    key: "footer",
    label: "Footer & Contact Info",
    description: "Footer text, contact details and social media links.",
    icon: "PanelTop",
    group: "Website",
    fields: [
      ta("about", "Footer description"),
      t("ctaTitle", "Footer heading"),
      t("ctaText", "Footer text"),
      t("ctaButton", "Footer button text"),
      t("email", "Email"),
      t("phone", "Phone", { help: "Leave empty to hide it from the website." }),
      t("address", "Address", { help: "Leave empty to hide it from the website." }),
      t("facebook", "Facebook link", {
        type: "url",
        help: "Leave empty to hide it from the website.",
      }),
      t("instagram", "Instagram link", {
        type: "url",
        help: "Leave empty to hide it from the website.",
      }),
      t("linkedin", "LinkedIn link", {
        type: "url",
        help: "Leave empty to hide it from the website.",
      }),
      t("youtube", "YouTube link", {
        type: "url",
        help: "Leave empty to hide it from the website.",
      }),
      t("copyright", "Copyright line"),
    ],
    defaults: {
      about: "Institute + Agency. Learn. Build. Grow. Become Independent.",
      ctaTitle: "Keep Moving. Keep Growing.",
      ctaText: "Your journey starts with one bold first step.",
      ctaButton: "Start Today",
      email: "hello@digiturtles.com",
      phone: "",
      address: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      copyright: "© 2026 Digi Turtles · Learn | Create | Grow",
    },
  },
  {
    kind: "singleton",
    key: "seo",
    label: "SEO (Google)",
    description: "How the website appears on Google and when shared on social media.",
    icon: "SearchCheck",
    group: "Website",
    fields: [
      t("title", "Page title"),
      ta("description", "Description"),
      t("shareTitle", "Title when shared"),
      ta("shareDescription", "Description when shared"),
    ],
    defaults: {
      title: "Digi Turtles — Learn. Build. Grow. Become Independent.",
      description:
        "Digi Turtles is an Institute + Agency: practical digital skills for learners and real growth for businesses, under one roof.",
      shareTitle: "Digi Turtles — Learn. Build. Grow.",
      shareDescription:
        "Practical digital skills and real business growth. Follow the turtle from egg to ocean.",
    },
  },
];

export const COLLECTIONS: CollectionDef[] = [
  {
    kind: "collection",
    key: "nav_links",
    label: "Menu Links",
    description: "Links in the top menu.",
    icon: "Menu",
    group: "Website",
    itemLabel: "Link",
    titleField: "label",
    subtitleField: "href",
    fields: [
      t("label", "Text"),
      t("href", "Link", { type: "url", help: "e.g. #about or https://…" }),
    ],
    defaults: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Team", href: "#team" },
      { label: "Blog", href: "#blog" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    kind: "collection",
    key: "services",
    label: "Services",
    description: "Agency services shown as cards.",
    icon: "BriefcaseBusiness",
    group: "Content",
    itemLabel: "Service",
    titleField: "title",
    subtitleField: "text",
    fields: [
      t("title", "Title"),
      ta("text", "Description"),
      { name: "icon", label: "Icon", type: "icon" },
    ],
    heading: heading("Agency services", "Your growth partner, not a vendor"),
    defaults: [
      {
        title: "Lead Generation",
        text: "Finding and developing qualified business opportunities through targeted digital systems.",
        icon: "Target",
      },
      {
        title: "Digital Marketing",
        text: "Strategy, campaigns, social media, content and digital growth execution.",
        icon: "Megaphone",
      },
      {
        title: "AI Automation",
        text: "Automating repetitive workflows, customer processes and business operations with AI.",
        icon: "Bot",
      },
      {
        title: "SEO",
        text: "Improving organic visibility, search performance and long-term discoverability.",
        icon: "Search",
      },
      {
        title: "Brand Building",
        text: "Positioning, identity, content direction and digital presence designed for growth.",
        icon: "Gem",
      },
      {
        title: "Training for Teams",
        text: "Practical workshops from our Institute so your own team becomes independent.",
        icon: "GraduationCap",
      },
    ],
  },
  {
    kind: "collection",
    key: "courses",
    label: "Courses",
    description: "Course names in the scrolling strip.",
    icon: "GraduationCap",
    group: "Content",
    itemLabel: "Course",
    titleField: "title",
    fields: [t("title", "Course name")],
    defaults: [
      "AI Automation",
      "Digital Marketing",
      "Finance & Budgeting",
      "Graphic Designing",
      "SEO",
      "Photography & Videography",
      "Video Editing",
      "Acting",
    ].map((title) => ({ title })),
  },
  {
    kind: "collection",
    key: "philosophy",
    label: "Turtle Philosophy",
    description: "The numbered philosophy cards.",
    icon: "Sparkles",
    group: "Content",
    itemLabel: "Card",
    titleField: "title",
    subtitleField: "text",
    fields: [t("title", "Title"), t("text", "Text")],
    heading: heading("The turtle philosophy", "Don't just learn. Become independent."),
    defaults: [
      { title: "Start Small", text: "Every expert begins as a beginner." },
      { title: "Keep Moving", text: "Small steps compound over time." },
      { title: "Learn by Doing", text: "Knowledge matters when applied." },
      { title: "Build Independence", text: "No permanent dependence." },
      { title: "Help Others Grow", text: "Skilled turtles lift the next." },
    ],
  },
  {
    kind: "collection",
    key: "projects",
    label: "Portfolio",
    description: "Recent work shown with photos.",
    icon: "FolderKanban",
    group: "Content",
    itemLabel: "Project",
    titleField: "title",
    subtitleField: "tag",
    imageField: "image",
    fields: [
      t("title", "Title"),
      t("tag", "Category"),
      img("image", "Photo"),
      t("link", "Link (optional)", { type: "url" }),
    ],
    heading: {
      fields: [t("eyebrow", "Small label"), t("title", "Heading"), t("buttonText", "Button text")],
      defaults: { eyebrow: "Portfolio", title: "Recent work", buttonText: "Start a project" },
    },
    defaults: [
      { title: "Retail Brand Refresh", tag: "Brand Building", image: A.branding, link: "" },
      { title: "Lead Engine for a Clinic", tag: "Lead Generation", image: A.analytics, link: "" },
      { title: "Student Showcase Cohort", tag: "Institute", image: A.classroom, link: "" },
    ],
  },
  {
    kind: "collection",
    key: "team",
    label: "Team",
    description: "Team members with photo, role and short bio.",
    icon: "UsersRound",
    group: "Content",
    itemLabel: "Member",
    titleField: "name",
    subtitleField: "role",
    imageField: "image",
    fields: [t("name", "Name"), t("role", "Role"), ta("bio", "Short bio"), img("image", "Photo")],
    heading: heading("Our team", "Meet the turtles"),
    defaults: [
      {
        name: "Adil Syed",
        role: "Founder & CEO",
        bio: "Leads Digi Turtles with a vision for practical growth and lasting impact.",
        image: A.adil,
      },
      {
        name: "Hamza",
        role: "Co-Founder & Technical Director",
        bio: "Directs the technical strategy and builds reliable digital experiences.",
        image: A.hamza,
      },
      {
        name: "Syed Zeeshan Ali",
        role: "Co-Founder & Creative Director",
        bio: "Shapes the creative vision and visual direction behind Digi Turtles.",
        image: A.zeeshan,
      },
      {
        name: "Atif Mehmood",
        role: "Senior Developer",
        bio: "Builds high-quality digital products and dependable web experiences.",
        image: A.atif,
      },
    ],
  },
  {
    kind: "collection",
    key: "posts",
    label: "Blog",
    description: "Blog posts shown on the home page.",
    icon: "Newspaper",
    group: "Content",
    itemLabel: "Post",
    titleField: "title",
    subtitleField: "meta",
    imageField: "image",
    fields: [
      t("title", "Title"),
      t("meta", "Category · Date"),
      ta("text", "Short summary"),
      img("image", "Cover photo"),
      t("link", "Read more link (optional)", { type: "url" }),
    ],
    heading: heading("From the blog", "Ideas that help you grow"),
    defaults: [
      {
        title: "Why We Chose the Turtle",
        meta: "Our Story · Nov 2, 2026",
        text: "Not because it is the fastest — because it keeps moving.",
        image: A.classroom,
        link: "",
      },
      {
        title: "AI Automation for Small Businesses",
        meta: "AI · Oct 24, 2026",
        text: "Where to start automating without a big tech team.",
        image: A.analytics,
        link: "",
      },
      {
        title: "Learn → Practice → Build → Showcase",
        meta: "Institute · Oct 12, 2026",
        text: "How our teaching model turns knowledge into income.",
        image: A.classroom,
        link: "",
      },
    ],
  },
  {
    kind: "collection",
    key: "partners",
    label: "Partners",
    description: "Brand names in the partners strip.",
    icon: "Handshake",
    group: "Content",
    itemLabel: "Partner",
    titleField: "name",
    fields: [t("name", "Brand name")],
    heading: heading(
      "Trusted partnerships",
      "Brands we've worked with",
      "Helping teams turn ideas into systems, campaigns and growth.",
    ),
    defaults: [
      "NEXORA",
      "Urban Nest",
      "Kite & Co.",
      "VELORA",
      "Northstar",
      "Olive Studio",
      "Peakline",
      "Mosaic",
    ].map((name) => ({ name })),
  },
  {
    kind: "collection",
    key: "reviews",
    label: "Reviews",
    description: "Client testimonials.",
    icon: "MessageCircleHeart",
    group: "Content",
    itemLabel: "Review",
    titleField: "name",
    subtitleField: "role",
    fields: [
      ta("quote", "Review text"),
      t("name", "Client name"),
      t("role", "Client role / company"),
    ],
    heading: heading(
      "Client reviews",
      "Work that keeps people moving",
      "A few words about the systems, campaigns and learning experiences we create together.",
    ),
    defaults: [
      {
        quote:
          "Digi Turtles turned a scattered marketing effort into a clear lead-generation system our team can actually run.",
        name: "Areeba Shah",
        role: "Co-founder, Northstar Clinics",
      },
      {
        quote:
          "The team understood our brand quickly, then gave us a visual system that made every campaign feel connected.",
        name: "Hamza Malik",
        role: "Director, Urban Nest",
      },
      {
        quote:
          "Our AI assistant now handles routine questions around the clock, while our people focus on real conversations.",
        name: "Sana Rehman",
        role: "Operations Lead, Kite & Co.",
      },
      {
        quote:
          "The SEO roadmap was practical, clearly explained and built around the searches our customers were already making.",
        name: "Fahad Ali",
        role: "Founder, Peakline Commerce",
      },
      {
        quote:
          "We appreciated the balance of strategy and execution. Every deliverable had a purpose and a next step.",
        name: "Maha Khan",
        role: "Marketing Manager, Velora",
      },
      {
        quote:
          "The training gave our in-house team the confidence to create better content and keep improving after the workshop.",
        name: "Usman Ahmed",
        role: "People Lead, Mosaic Group",
      },
    ],
  },
  {
    kind: "collection",
    key: "faqs",
    label: "FAQs",
    description: "Frequently asked questions.",
    icon: "CircleHelp",
    group: "Content",
    itemLabel: "Question",
    titleField: "q",
    fields: [t("q", "Question"), ta("a", "Answer")],
    heading: {
      fields: [
        t("eyebrow", "Small label"),
        t("title", "Heading"),
        ta("text", "Intro text"),
        t("boxTitle", "Box heading"),
        t("boxButton", "Box button text"),
      ],
      defaults: {
        eyebrow: "FAQ",
        title: "Questions before your first step?",
        text: "Here are the answers to the things clients and learners ask us most often.",
        boxTitle: "Still have questions?",
        boxButton: "Contact us",
      },
    },
    defaults: [
      {
        q: "Which services can Digi Turtles help my business with?",
        a: "Lead generation, digital marketing, AI automation, SEO, brand building and hands-on training for your team.",
      },
      {
        q: "How do you price a project?",
        a: "Every project is scoped around your goals. After a short discovery call we share a clear, fixed proposal.",
      },
      {
        q: "How long does a typical project take?",
        a: "Most projects run between two and eight weeks, depending on scope. We agree on milestones up front.",
      },
      {
        q: "Are revisions included?",
        a: "Yes. Each deliverable includes review rounds so the final result fits your brand and goals.",
      },
      {
        q: "Do you provide support after launch?",
        a: "We offer ongoing support and growth plans, so your systems keep improving after launch.",
      },
      {
        q: "Can you train our internal team?",
        a: "Absolutely. Our Institute runs practical workshops so your team becomes independent.",
      },
      {
        q: "How do we get started?",
        a: "Send us a message through the contact section and we will schedule a free discovery call.",
      },
    ],
  },
];

export type SectionDef = SingletonDef | CollectionDef;

export const ALL_SECTIONS: SectionDef[] = [...SINGLETONS, ...COLLECTIONS];

export function findSection(key: string): SectionDef | undefined {
  return ALL_SECTIONS.find((s) => s.key === key);
}

export const headingKey = (collection: string) => `section_${collection}`;

/** Fills missing keys from defaults; values saved by the admin (even empty) win. */
export function mergeData(defaults: Data, saved: Data | null | undefined): Data {
  return { ...defaults, ...(saved ?? {}) };
}

/** Defaults for every settings key, including collection headings. */
export function settingsDefaults(): Record<string, Data> {
  const out: Record<string, Data> = {};
  for (const s of SINGLETONS) out[s.key] = s.defaults;
  for (const c of COLLECTIONS) if (c.heading) out[headingKey(c.key)] = c.heading.defaults;
  return out;
}
