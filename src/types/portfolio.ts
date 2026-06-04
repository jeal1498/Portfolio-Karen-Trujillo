import { LucideIcon } from 'lucide-react';

export interface Service {
  slug: string;
  icon: LucideIcon;
  label: string;
  title: string;
  age: string;
  desc: string;
  price: string;
  tests: string[];
  cta: string;
  color: string;
  borderHover: string;
}

export interface Credential {
  icon: LucideIcon;
  text: string;
}

export interface Review {
  name: string;
  text: string;
  stars: number;
  service: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
