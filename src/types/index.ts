// ═══════════════════════════════════════
// Portfolio Config Types
// ═══════════════════════════════════════

export interface PortfolioConfig {
  meta: MetaConfig;
  character: CharacterConfig;
  nav: NavConfig;
  hero: HeroConfig;
  about: AboutConfig;
  skills: SkillsConfig;
  projects: ProjectsConfig;
  experience: ExperienceConfig;
  extras: ExtrasConfig;
  contact: ContactConfig;
  footer: FooterConfig;
}

// ── Character (plug-and-play) ──
export type CharacterConfig =
  | { type: 'glb'; src: string; scale?: number; position?: [number, number, number]; rotation?: [number, number, number]; animationName?: string }
  | { type: 'image'; src: string; width?: number; height?: number }
  | { type: 'none' };

// ── Meta ──
export interface MetaConfig {
  name: string;
  title: string;
  description: string;
  url?: string;
  ogImage?: string;
  jobTitle?: string;
}

// ── Nav ──
export interface NavConfig {
  logo: string;
  links: { label: string; href: string }[];
}

// ── Hero ──
export interface HeroConfig {
  overline: string;
  headline: string;
  subhead: string;
  ctas: { label: string; href: string }[];
}

// ── About ──
export interface AboutConfig {
  text: string;
}

// ── Skills ──
export interface SkillItem {
  name: string;
  icon: string; // tech-stack-icons name (e.g. 'react', 'nextjs', 'typescript')
}

export interface SkillGroup {
  label: string;
  items: SkillItem[];
}

export interface SkillsConfig {
  label: string;
  headline: string;
  description: string;
  items: SkillItem[]; // kept for backwards compat
  groups: SkillGroup[];
}

// ── Projects ──
export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  featured?: boolean;
  gradient?: string; // CSS gradient for card header art
  icon?: string; // emoji or symbol for card header
  category?: 'featured' | 'personal'; // 'featured' = built at company, 'personal' = side projects
}

export interface ProjectsConfig {
  label: string;
  headline: string;
  description: string;
  items: ProjectItem[];
}

// ── Experience ──
export interface ExperienceItem {
  role: string;
  company: string;
  companyUrl?: string;
  companyLogo?: string;
  showLogo?: boolean;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
}

export interface ExperienceConfig {
  label: string;
  headline: string;
  description: string;
  items: ExperienceItem[];
}

// ── Extras (Certifications, Education, Interests) ──
export interface CertificationItem {
  name: string;
  issuer: string;
  year?: string;
  link?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface LanguageItem {
  name: string;
  proficiency: string;
}

export interface SoftSkillItem {
  name: string;
  emoji: string;
  description?: string;
}

export interface ExtrasConfig {
  label: string;
  headline: string;
  certifications: CertificationItem[];
  education: EducationItem[];
  languages: LanguageItem[];
  softSkills: SoftSkillItem[];
  interests: { name: string; emoji: string }[];
}

// ── Contact ──
export interface ContactLink {
  label: string;
  href: string;
  icon: string; // SVG string
  variant: 'primary' | 'secondary';
}

export interface ContactConfig {
  headline: string;
  subhead: string;
  links: ContactLink[];
  email: string;
  web3formsKey?: string; // Get free key at web3forms.com
}

// ── Footer ──
export interface FooterConfig {
  links: { label: string; href: string }[];
  copyright: string;
}

// ── 3D Scene ──
export interface SceneKeyframe {
  px: number; py: number; pz: number;
  rx: number; ry: number; rz: number;
  lid: number;
  scale: number;
}
