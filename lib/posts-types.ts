export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  excerpt: string;
  category: string;
  date: string;
  updated?: string;
  readMins: number;
  takeaways: string[];
  sections: { h: string; p: string[] }[];
  faqs: { q: string; a: string }[];
};
