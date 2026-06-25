export type Locale = "ru" | "uk" | "en";

export interface Dict {
  locale: Locale;
  header: {
    nav: { home: string; about: string; services: string; program: string; results: string; contact: string };
    cta: string;
  };
  hero: {
    eyebrow: string;
    badge: string;
    desc1: string;
    desc2: string;
    btn1: string;
    btn2: string;
    badges: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    desc: string;
    cta: string;
    stats: { value: string; label: string }[];
    features: { title: string; desc: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      price: string;
      oldPrice: string | null;
      period: string;
      features: string[];
      cta: string;
      tag: string | null;
      ctaHref: string;
      featured: boolean;
      color: string;
    }[];
  };
  program: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    structureLabel: string;
    weeks: { range: string; title: string; desc: string }[];
    badge: string;
    programTitle: string;
    programSubtitle: string;
    buyBtn: string;
    accessNote: string;
    includes: string[];
  };
  whyMe: {
    eyebrow: string;
    title: string;
    subtitle: string;
    reasons: { num: string; title: string; desc: string }[];
  };
  results: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    desc: string;
    startBtn: string;
    items: { icon: string; text: string }[];
    stats: { num: string; label: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    btn1: string;
    btn2: string;
    btn3: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    selectService: string;
    services: { value: string; label: string; price: string }[];
    nameLabel: string;
    namePlaceholder: string;
    contactLabel: string;
    contactPlaceholder: string;
    goalLabel: string;
    goalPlaceholder: string;
    submitBtn: string;
    loadingBtn: string;
    privacyText: string;
    privacyLink: string;
    successTitle: string;
    successMsg: string;
    programSuccessMsg: string;
  };
  footer: {
    tagline: string;
    followLabel: string;
    documentsLabel: string;
    privacy: string;
    terms: string;
    payment: string;
    copyright: string;
  };
}
