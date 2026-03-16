import dynamic from 'next/dynamic';
import config from '@/config/portfolio';
import Nav from '@/components/layout/Nav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Extras from '@/components/sections/Extras';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

// Dynamic import — 3D scene only loads on client (no SSR for Three.js)
const Scene3D = dynamic(() => import('@/components/3d/Scene'), { ssr: false });

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: config.meta.name,
  url: config.meta.url,
  jobTitle: config.meta.jobTitle || 'Software Engineer',
  description: config.meta.description,
  sameAs: [
    process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/Sarthak88-cypher',
    process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/saisarthakmohapatra88',
  ],
  knowsAbout: ['TypeScript', 'React', 'Next.js', 'Node.js', 'AWS', 'GraphQL', 'PostgreSQL', 'Distributed Systems'],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Scene3D characterConfig={config.character} />
      <Nav config={config.nav} />
      <main>
        <Hero config={config.hero} />
        <About config={config.about} />
        <Skills config={config.skills} />
        <Projects config={config.projects} />
        <Experience config={config.experience} />
        <Extras config={config.extras} />
        <Contact config={config.contact} />
      </main>
      <Footer config={config.footer} />
    </>
  );
}
