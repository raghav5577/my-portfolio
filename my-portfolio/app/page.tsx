'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Achievements from '@/components/Achievements';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

import TechMarquee from '@/components/TechMarquee';

const Projects = dynamic(() => import('@/components/Projects'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee size="large" />
      <Services />
      <Projects />
      <About />
      <Skills />
      <Achievements />
      <FAQ />
      <Contact />
    </>
  );
}
