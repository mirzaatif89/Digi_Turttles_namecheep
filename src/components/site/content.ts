import classroom from "@/assets/classroom.jpg";
import analytics from "@/assets/project-analytics.jpg";
import branding from "@/assets/project-branding.jpg";
import ahmed from "@/assets/team-ahmed.jpg";
import ayesha from "@/assets/team-ayesha.jpg";
import bilal from "@/assets/team-bilal.jpg";
import sana from "@/assets/team-sana.jpg";

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Blog", href: "#blog" },
  { label: "Contact Us", href: "#contact" },
];

export const COURSES = [
  "AI Automation",
  "Digital Marketing",
  "Finance & Budgeting",
  "Graphic Designing",
  "SEO",
  "Photography & Videography",
  "Video Editing",
  "Acting",
];

export const SERVICES = [
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
] as const;

export const PHILOSOPHY = [
  { title: "Start Small", text: "Every expert begins as a beginner." },
  { title: "Keep Moving", text: "Small steps compound over time." },
  { title: "Learn by Doing", text: "Knowledge matters when applied." },
  { title: "Build Independence", text: "No permanent dependence." },
  { title: "Help Others Grow", text: "Skilled turtles lift the next." },
];

export const PROJECTS = [
  { title: "Retail Brand Refresh", tag: "Brand Building", img: branding },
  { title: "Lead Engine for a Clinic", tag: "Lead Generation", img: analytics },
  { title: "Student Showcase Cohort", tag: "Institute", img: classroom },
];

export const TEAM = [
  {
    name: "Ahmed Raza",
    role: "Founder & CEO",
    bio: "Started Digi Turtles to turn beginners into independent professionals.",
    img: ahmed,
  },
  {
    name: "Ayesha Khan",
    role: "Head of Institute",
    bio: "Designs the Learn → Practice → Build learning paths.",
    img: ayesha,
  },
  {
    name: "Bilal Hussain",
    role: "AI Automation Lead",
    bio: "Builds AI workflows that save businesses hours every week.",
    img: bilal,
  },
  {
    name: "Sana Malik",
    role: "Digital Marketing Strategist",
    bio: "Plans campaigns that turn attention into leads.",
    img: sana,
  },
];

export const POSTS = [
  {
    title: "Why We Chose the Turtle",
    meta: "Our Story · Nov 2, 2026",
    text: "Not because it is the fastest — because it keeps moving.",
    img: classroom,
  },
  {
    title: "AI Automation for Small Businesses",
    meta: "AI · Oct 24, 2026",
    text: "Where to start automating without a big tech team.",
    img: analytics,
  },
  {
    title: "Learn → Practice → Build → Showcase",
    meta: "Institute · Oct 12, 2026",
    text: "How our teaching model turns knowledge into income.",
    img: classroom,
  },
];

export const PARTNERS = [
  "NEXORA",
  "Urban Nest",
  "Kite & Co.",
  "VELORA",
  "Northstar",
  "Olive Studio",
  "Peakline",
  "Mosaic",
];

export const REVIEWS = [
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
];

export const FAQS = [
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
];
