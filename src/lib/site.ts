export const site = {
  name: "Maruf Ahmed Raj",
  shortName: "Maruf Raj",
  initials: "MR",
  role: "Web Developer & Marketer",
  tagline: "ওয়েবসাইট বানাই আর ডিজিটাল মার্কেটিং দিয়ে আসল কাস্টমার আনি — একদম কম খরচে।",
  location: "Mohammadpur, Dhaka",
  timezone: "GMT+6",
  url: "https://marufraj.com",
  email: "marufhasan22312@gmail.com",
  phone: "+880 1603 746079",
  whatsapp: "https://wa.me/8801603746079",
  facebook: "https://www.facebook.com/FM032",
  resume: "/resume.pdf",
  availability: "নতুন প্রজেক্ট নিচ্ছি",
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/FM032", handle: "/FM032" },
    { label: "YouTube", href: "https://www.youtube.com/@learnwithmaruff", handle: "@learnwithmaruff" },
    { label: "Instagram", href: "https://www.instagram.com/fmmar_uf", handle: "@fmmar_uf" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/md-maruf-hasan-ai", handle: "/in/md-maruf-hasan-ai" },
    { label: "GitHub", href: "https://github.com/marufraj3", handle: "@marufraj3" },
  ],
} as const;

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const stats = [
  { value: 3, suffix: "+", label: "Years experience", sub: "ওয়েব ও মার্কেটিং" },
  { value: 60, suffix: "+", label: "Projects delivered", sub: "সাইট ও ক্যাম্পেইন" },
  { value: 45, suffix: "+", label: "Happy clients", sub: "দেশে ও বিদেশে" },
  { value: 100, suffix: "%", label: "Client focused", sub: "সময়মতো ডেলিভারি" },
];

export const marqueeWords = [
  "PHP",
  "Laravel",
  "JavaScript",
  "MySQL",
  "WordPress",
  "React",
  "Tailwind",
  "SEO",
  "Meta Ads",
  "Google Ads",
  "AI Automation",
  "WooCommerce",
  "Shopify",
  "n8n",
];

// Tools & platforms shown in the marquee / "platforms I work with" strip.
export const clients = [
  "WordPress",
  "Laravel",
  "Shopify",
  "WooCommerce",
  "Meta Ads",
  "Google Ads",
  "OpenAI",
  "n8n",
];

export const about = {
  eyebrow: "About",
  heading: "Web development আর digital marketing — এক ছাদের নিচে।",
  body: [
    "আমি মারুফ — ঢাকার মোহাম্মদপুর থেকে কাজ করা একজন ওয়েব ডেভেলপার আর ডিজিটাল মার্কেটার। ছোট বিজনেস থেকে ব্র্যান্ড — সবাইকে অনলাইনে দাঁড় করাতে সাহায্য করি, একদম কম খরচে।",
    "PHP, Laravel, JavaScript আর MySQL দিয়ে ওয়েবসাইট বানাই, আর Facebook/Google অ্যাড দিয়ে সেই সাইটে আসল কাস্টমার আনি। পাশাপাশি AI অটোমেশন, ওয়েবসাইট অডিট, রিডিজাইন আর SMM প্যানেলের কাজও করি।",
    "আমার লক্ষ্য সহজ — কম খরচে প্রফেশনাল কাজ, সময়মতো ডেলিভারি, আর এমন রেজাল্ট যেটা আপনার বিজনেসে আসলেই কাজে লাগে।",
  ],
  highlights: [
    { k: "Currently", v: "Freelance dev ও marketer" },
    { k: "Focus", v: "Web · E-commerce · Ads · AI" },
    { k: "Based in", v: "Mohammadpur, Dhaka" },
    { k: "Reply time", v: "১২ ঘণ্টার মধ্যে" },
  ],
  principles: [
    {
      title: "Affordable pricing",
      body: "BD-এর জন্য একদম কম রেট — স্টুডেন্ট, স্টার্টআপ আর ছোট বিজনেসের বাজেটে মানানসই।",
    },
    {
      title: "On-time delivery",
      body: "কাজ শুরুর আগেই সময় আর দাম ফিক্সড করে দিই। কোনো লুকানো চার্জ নেই।",
    },
    {
      title: "Real results",
      body: "শুধু সুন্দর সাইট নয় — যেটা দ্রুত লোড হয়, Google-এ আসে আর কাস্টমার আনে।",
    },
  ],
};

export type SkillGroup = {
  title: string;
  blurb: string;
  accent: string;
  items: { name: string; level: number }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Web Development",
    blurb: "PHP, Laravel, JS আর MySQL — ফাস্ট আর সিকিউর।",
    accent: "#4fd7ff",
    items: [
      { name: "PHP / Laravel", level: 92 },
      { name: "JavaScript", level: 88 },
      { name: "MySQL / Database", level: 90 },
      { name: "HTML / CSS / Tailwind", level: 94 },
      { name: "REST API", level: 85 },
    ],
  },
  {
    title: "Digital Marketing",
    blurb: "টার্গেটেড অ্যাড আর স্ট্র্যাটেজি দিয়ে আসল সেল।",
    accent: "#8b7cff",
    items: [
      { name: "Facebook / Meta Ads", level: 90 },
      { name: "Google Ads", level: 84 },
      { name: "SEO", level: 86 },
      { name: "Social Media Marketing", level: 92 },
      { name: "Content Strategy", level: 82 },
    ],
  },
  {
    title: "AI & Automation",
    blurb: "রিপিটেটিভ কাজ অটোমেট করে সময় বাঁচান।",
    accent: "#ff5fa2",
    items: [
      { name: "AI Automation", level: 88 },
      { name: "Chatbot / GPT", level: 85 },
      { name: "n8n / Zapier", level: 82 },
      { name: "Data Scraping", level: 80 },
    ],
  },
  {
    title: "Growth & Services",
    blurb: "ই-কমার্স, অডিট, রিডিজাইন আর SMM প্যানেল।",
    accent: "#5ff2c0",
    items: [
      { name: "E-commerce Setup", level: 90 },
      { name: "Website Audit", level: 88 },
      { name: "SMM Panel", level: 86 },
      { name: "UI / Redesign", level: 89 },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  accent: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "fashion-ecommerce",
    title: "Fashion Store",
    category: "E-commerce",
    year: "2025",
    summary:
      "একটি লোকাল ফ্যাশন ব্র্যান্ডের জন্য সম্পূর্ণ অনলাইন স্টোর — bKash পেমেন্ট আর অর্ডার ট্র্যাকিং সহ।",
    challenge:
      "ব্র্যান্ডটি শুধু Facebook পেজে বিক্রি করত — অর্ডার হারিয়ে যেত আর সব ম্যানুয়ালি সামলাতে হতো।",
    solution:
      "Laravel + MySQL দিয়ে দ্রুত স্টোর, অটো অর্ডার সিস্টেম, bKash/SSLCommerz পেমেন্ট আর সহজ অ্যাডমিন প্যানেল।",
    metrics: [
      { label: "অর্ডার বৃদ্ধি", value: "+65%" },
      { label: "লোড টাইম", value: "1.4s" },
      { label: "মোবাইল রেডি", value: "100%" },
    ],
    stack: ["Laravel", "MySQL", "bKash API", "Tailwind"],
    accent: "#4fd7ff",
    featured: true,
  },
  {
    slug: "restaurant-website",
    title: "Restaurant Website",
    category: "Business Website",
    year: "2025",
    summary:
      "একটি রেস্টুরেন্টের জন্য মেন্যু, অনলাইন রিজার্ভেশন আর হোম-ডেলিভারি সহ মডার্ন ওয়েবসাইট।",
    challenge:
      "রেস্টুরেন্টটির কোনো ওয়েবসাইট ছিল না, সব বুকিং ফোনে — নতুন কাস্টমার অনলাইনে খুঁজে পেত না।",
    solution:
      "PHP + JavaScript দিয়ে ফাস্ট সাইট, অনলাইন মেন্যু, রিজার্ভেশন ফর্ম আর Google-এ SEO সেটআপ।",
    metrics: [
      { label: "বুকিং বৃদ্ধি", value: "+120%" },
      { label: "স্পিড স্কোর", value: "96" },
      { label: "বাউন্স রেট", value: "-40%" },
    ],
    stack: ["PHP", "JavaScript", "MySQL", "SEO"],
    accent: "#8b7cff",
    featured: true,
  },
  {
    slug: "meta-ads-campaign",
    title: "Meta Ads Campaign",
    category: "Digital Marketing",
    year: "2025",
    summary:
      "একটি স্কিনকেয়ার ব্র্যান্ডের জন্য Facebook ও Instagram অ্যাড ক্যাম্পেইন — কম খরচে বেশি সেল।",
    challenge:
      "বিজ্ঞাপনে টাকা খরচ হচ্ছিল কিন্তু সেল আসছিল না — টার্গেটিং আর ক্রিয়েটিভ দুটোই দুর্বল ছিল।",
    solution:
      "অডিয়েন্স রিসার্চ, নতুন ক্রিয়েটিভ, A/B টেস্ট আর রিটার্গেটিং দিয়ে ROAS কয়েকগুণ বাড়ানো হয়।",
    metrics: [
      { label: "ROAS", value: "4.2x" },
      { label: "রিচ", value: "250K+" },
      { label: "কস্ট/লিড", value: "-55%" },
    ],
    stack: ["Meta Ads", "Instagram", "Pixel", "Analytics"],
    accent: "#5ff2c0",
    featured: true,
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    category: "AI Automation",
    year: "2024",
    summary:
      "একটি সার্ভিস বিজনেসের জন্য অটো-রিপ্লাই চ্যাটবট — ২৪/৭ কাস্টমার সাপোর্ট, কোনো এজেন্ট ছাড়াই।",
    challenge:
      "কাস্টমারের মেসেজের উত্তর দিতে দেরি হতো, রাতে কেউ থাকত না — অনেক লিড হারিয়ে যেত।",
    solution:
      "n8n + GPT দিয়ে চ্যাটবট, কমন প্রশ্নের অটো-রিপ্লাই আর জরুরি মেসেজ মানুষের কাছে ফরওয়ার্ড।",
    metrics: [
      { label: "রিপ্লাই টাইম", value: "<1 min" },
      { label: "অটো-হ্যান্ডেল", value: "70%" },
      { label: "সার্ভিস", value: "24/7" },
    ],
    stack: ["n8n", "GPT", "WhatsApp API"],
    accent: "#ff5fa2",
    featured: true,
  },
  {
    slug: "smm-panel",
    title: "SMM Panel",
    category: "SMM Panel",
    year: "2024",
    summary: "একটি রিসেলার SMM প্যানেল — অটো-অর্ডার, পেমেন্ট গেটওয়ে আর API সহ।",
    challenge:
      "ক্লায়েন্ট নিজে SMM সার্ভিস রিসেল করতে চেয়েছিল কিন্তু অর্ডার আর পেমেন্ট ম্যানুয়ালি সামলানো কঠিন ছিল।",
    solution:
      "PHP + MySQL দিয়ে রেডি প্যানেল, প্রোভাইডার API ইন্টিগ্রেশন আর অটোমেটেড পেমেন্ট গেটওয়ে।",
    metrics: [
      { label: "অর্ডার/দিন", value: "500+" },
      { label: "অটোমেটেড", value: "100%" },
    ],
    stack: ["PHP", "MySQL", "API"],
    accent: "#4fd7ff",
  },
  {
    slug: "corporate-redesign",
    title: "Corporate Redesign",
    category: "Redesign",
    year: "2024",
    summary: "একটি পুরনো কর্পোরেট সাইটকে মডার্ন, দ্রুত আর মোবাইল-ফ্রেন্ডলি লুকে রূপান্তর।",
    challenge:
      "সাইটটি স্লো ছিল, মোবাইলে ভাঙা দেখাত আর Google-এ কোথাও খুঁজে পাওয়া যেত না।",
    solution:
      "মডার্ন UI-তে রিডিজাইন, স্পিড অপটিমাইজেশন আর অন-পেজ SEO — পুরো লুক নতুন।",
    metrics: [
      { label: "স্পিড", value: "+180%" },
      { label: "মোবাইল", value: "100%" },
    ],
    stack: ["WordPress", "Tailwind", "SEO"],
    accent: "#8b7cff",
  },
];

export type Service = {
  title: string;
  price: string;
  timeline: string;
  description: string;
  includes: string[];
  popular?: boolean;
  icon: "code" | "cart" | "megaphone" | "bot" | "palette" | "gauge" | "clipboard" | "panel";
};

export const services: Service[] = [
  {
    title: "Web Development",
    price: "৳6,000+",
    timeline: "5–14 দিন",
    description:
      "PHP, Laravel, JavaScript আর MySQL দিয়ে দ্রুত, সিকিউর আর মোবাইল-ফ্রেন্ডলি ওয়েবসাইট। বিজনেস, পোর্টফোলিও বা কাস্টম ওয়েব অ্যাপ।",
    includes: [
      "Laravel / PHP ব্যাকএন্ড",
      "রেসপন্সিভ ডিজাইন",
      "MySQL ডাটাবেজ",
      "অ্যাডমিন প্যানেল",
    ],
    icon: "code",
  },
  {
    title: "Digital Marketing",
    price: "৳3,000+/মাস",
    timeline: "মাসিক প্যাকেজ",
    description:
      "Facebook ও Google-এ টার্গেটেড অ্যাড, কনটেন্ট আর স্ট্র্যাটেজি দিয়ে আপনার ব্র্যান্ডে আসল কাস্টমার আর সেল আনি।",
    includes: [
      "Meta ও Google Ads",
      "কনটেন্ট প্ল্যান",
      "অডিয়েন্স টার্গেটিং",
      "মাসিক রিপোর্ট",
    ],
    icon: "megaphone",
    popular: true,
  },
  {
    title: "E-commerce Website",
    price: "৳15,000+",
    timeline: "10–25 দিন",
    description:
      "অনলাইনে প্রোডাক্ট বিক্রির জন্য সম্পূর্ণ ই-কমার্স সাইট — কার্ট, পেমেন্ট, অর্ডার ম্যানেজমেন্ট আর ডেলিভারি ট্র্যাকিং সহ।",
    includes: [
      "প্রোডাক্ট ক্যাটালগ",
      "কার্ট ও চেকআউট",
      "bKash / SSLCommerz",
      "অর্ডার ড্যাশবোর্ড",
    ],
    icon: "cart",
  },
  {
    title: "AI Automation",
    price: "৳8,000+",
    timeline: "5–15 দিন",
    description:
      "রিপিটেটিভ কাজ অটোমেট করুন — চ্যাটবট, অটো-রিপ্লাই, ডেটা এন্ট্রি আর ওয়ার্কফ্লো, যাতে সময় ও খরচ দুটোই বাঁচে।",
    includes: [
      "চ্যাটবট সেটআপ",
      "Auto-reply / DM",
      "n8n / Zapier ফ্লো",
      "GPT ইন্টিগ্রেশন",
    ],
    icon: "bot",
  },
  {
    title: "Website Redesign",
    price: "৳5,000+",
    timeline: "4–10 দিন",
    description:
      "পুরনো বা স্লো ওয়েবসাইটকে মডার্ন, দ্রুত আর প্রফেশনাল লুক দিই — যাতে ভিজিটর থাকে আর কাস্টমারে পরিণত হয়।",
    includes: [
      "মডার্ন UI",
      "স্পিড অপটিমাইজেশন",
      "মোবাইল ফিক্স",
      "SEO বেসিক",
    ],
    icon: "palette",
  },
  {
    title: "SEO & Speed",
    price: "৳2,500+",
    timeline: "3–7 দিন",
    description:
      "Google-এ র‍্যাংক বাড়ানোর জন্য অন-পেজ SEO আর ওয়েবসাইট স্পিড অপটিমাইজেশন — বেশি ট্রাফিক, বেশি সেল।",
    includes: [
      "কীওয়ার্ড রিসার্চ",
      "অন-পেজ SEO",
      "Core Web Vitals",
      "Google indexing",
    ],
    icon: "gauge",
  },
  {
    title: "Website Audit",
    price: "৳1,500+",
    timeline: "2–4 দিন",
    description:
      "আপনার ওয়েবসাইটের সম্পূর্ণ চেকআপ — স্পিড, SEO, সিকিউরিটি আর UX সমস্যা খুঁজে বের করে সমাধানসহ রিপোর্ট দিই।",
    includes: [
      "Performance রিপোর্ট",
      "SEO চেক",
      "সিকিউরিটি স্ক্যান",
      "Fix-list সহ PDF",
    ],
    icon: "clipboard",
  },
  {
    title: "SMM Panel",
    price: "৳5,000+",
    timeline: "3–7 দিন",
    description:
      "নিজের SMM প্যানেল বা রিসেলার সাইট চান? অটো-অর্ডার, পেমেন্ট গেটওয়ে আর API সহ রেডি প্যানেল সেটআপ করে দিই।",
    includes: [
      "রেডি SMM প্যানেল",
      "পেমেন্ট গেটওয়ে",
      "API ইন্টিগ্রেশন",
      "রিসেলার সিস্টেম",
    ],
    icon: "panel",
  },
];

export const testimonials = [
  {
    quote:
      "কম বাজেটে এত সুন্দর ওয়েবসাইট পাব ভাবিনি। সময়মতো ডেলিভারি দিয়েছে আর লঞ্চের পরেও সাপোর্ট করেছে।",
    name: "Rakib Hasan",
    title: "Owner",
    company: "RH Fashion",
    rating: 5,
  },
  {
    quote:
      "Facebook অ্যাড থেকে আগে কোনো সেল আসত না। মারুফের ক্যাম্পেইনের পর অর্ডার প্রায় ডাবল হয়েছে।",
    name: "Nusrat Jahan",
    title: "Founder",
    company: "Glow Skincare",
    rating: 5,
  },
  {
    quote:
      "আমাদের রেস্টুরেন্টের ওয়েবসাইট আর অনলাইন অর্ডার সিস্টেম দারুণ হয়েছে। কাস্টমাররা খুব খুশি।",
    name: "Tanvir Ahmed",
    title: "Manager",
    company: "Spice Kitchen",
    rating: 5,
  },
  {
    quote:
      "SMM প্যানেলটা একদম রেডি করে দিয়েছে, API সহ। এখন নিজেই সহজে রিসেল করছি।",
    name: "Sabbir Rahman",
    title: "Reseller",
    company: "BoostBD",
    rating: 5,
  },
  {
    quote:
      "পুরনো সাইট স্লো ছিল, Google-এ আসত না। রিডিজাইনের পর স্পিড আর ভিজিটর দুটোই বেড়েছে।",
    name: "Farhana Akter",
    title: "Owner",
    company: "Craft House",
    rating: 5,
  },
  {
    quote:
      "AI চ্যাটবট বসানোর পর কাস্টমারের মেসেজ অটো রিপ্লাই হয়। অনেক সময় বাঁচে, লিডও হারাই না।",
    name: "Imran Khan",
    title: "CEO",
    company: "QuickServe",
    rating: 5,
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discuss",
    duration: "১ দিন",
    body: "আপনার আইডিয়া, লক্ষ্য আর বাজেট নিয়ে কথা বলি। তারপর ফিক্সড দাম আর সময় জানিয়ে দিই — কোনো লুকানো চার্জ নেই।",
    deliverables: ["ফ্রি পরামর্শ", "ফিক্সড কোটেশন", "টাইমলাইন"],
  },
  {
    step: "02",
    title: "Plan",
    duration: "১–২ দিন",
    body: "ডিজাইন, ফিচার আর স্ট্রাকচার ঠিক করি। কোড শুরুর আগেই সব সিদ্ধান্ত নেওয়া হয়, যাতে পরে কোনো সমস্যা না হয়।",
    deliverables: ["ডিজাইন প্ল্যান", "ফিচার লিস্ট", "স্ট্রাকচার"],
  },
  {
    step: "03",
    title: "Build",
    duration: "৩–১৫ দিন",
    body: "কাজ শুরু। প্রতিটি ধাপে আপডেট দিই আর লাইভ প্রিভিউ দেখাই, যাতে আপনি সময়মতো ফিডব্যাক দিতে পারেন।",
    deliverables: ["লাইভ প্রিভিউ", "নিয়মিত আপডেট", "রিভিশন"],
  },
  {
    step: "04",
    title: "Launch",
    duration: "১–২ দিন",
    body: "স্পিড, মোবাইল আর SEO চেক করে ওয়েবসাইট লাইভ করি। সব ঠিক থাকলে তবেই হ্যান্ডওভার।",
    deliverables: ["স্পিড টেস্ট", "SEO সেটআপ", "লাইভ ডেপ্লয়"],
  },
  {
    step: "05",
    title: "Support",
    duration: "চলমান",
    body: "লঞ্চের পরেও সাপোর্ট দিই। ছোট ফিক্স, আপডেট বা নতুন ফিচার — যখন দরকার, পাশে আছি।",
    deliverables: ["ফ্রি সাপোর্ট", "ট্রেনিং", "আপডেট"],
  },
];

export const faqs = [
  {
    q: "কীভাবে কাজ শুরু করব?",
    a: "সহজ — WhatsApp বা ইমেইলে মেসেজ দিন। আপনার প্রয়োজন শুনে ফিক্সড দাম আর সময় জানিয়ে দেব। রাজি হলে অল্প অ্যাডভান্সে কাজ শুরু।",
  },
  {
    q: "একটা ওয়েবসাইটের খরচ কত?",
    a: "সাধারণ ওয়েবসাইট ৳6,000 থেকে শুরু, ই-কমার্স ৳15,000 থেকে। BD-এর বাজেটের কথা মাথায় রেখে রেট একদম কম রাখি — কাজ দেখে ফিক্সড দাম দিই।",
  },
  {
    q: "পুরনো ওয়েবসাইট ঠিক বা রিডিজাইন করেন?",
    a: "অবশ্যই। স্লো সাইট, পুরনো ডিজাইন বা বাগ — সব ঠিক করি। দরকার হলে আগে অডিট করে বলে দিই কী কী লাগবে।",
  },
  {
    q: "পেমেন্ট কীভাবে নেন?",
    a: "bKash, Nagad বা ব্যাংক — যেকোনোভাবে। সাধারণত অল্প অ্যাডভান্স নিয়ে কাজ শুরু, বাকিটা কাজ শেষে।",
  },
  {
    q: "কাজ শেষে সাপোর্ট পাব?",
    a: "হ্যাঁ। ডেলিভারির পরেও ফ্রি সাপোর্ট থাকে আর ছোট আপডেট/ফিক্স করে দিই। বড় কাজে মাসিক প্যাকেজও আছে।",
  },
];
