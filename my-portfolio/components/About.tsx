'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);




  return (
    <section
      id="about"
      ref={sectionRef}
      className="grid-bg"
      style={{
        padding: '120px 24px',
        position: 'relative',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '40px' }}
        >
          <span style={{
            fontSize: '14px',
            color: '#888',
            marginBottom: '8px',
            display: 'block'
          }}>
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '-0.5px'
          }}>
            About Me
          </h2>
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          {/* Left: Image */}
          <div 
            id="about-image-placeholder"
            className="about-card w-full md:w-[350px] shrink-0"
            style={{
              position: 'relative',
              aspectRatio: '1/1',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(17, 17, 17, 0.6)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <Image 
              src="/DSC_1344.jpeg" 
              alt="Raghav Karnatak" 
              fill 
              style={{ objectFit: 'cover', objectPosition: 'center', transform: 'scale(1.05)' }} 
            />
          </div>

          {/* Right: Text Content */}
          <div className="about-card flex flex-col gap-6 pt-2">
            <h3 style={{ 
              fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', 
              fontWeight: 700, 
              color: '#fff',
              letterSpacing: '-0.5px'
            }}>
              Raghav Karnatak
            </h3>
            
            <p style={{ 
              fontSize: '18px', 
              color: '#ddd', 
              fontWeight: 500 
            }}>
              <span style={{ color: '#888' }}></span> Full Stack Developer bringing seamless solutions to life — with a taste for premium aesthetics.
            </p>
            
            <p style={{ 
              fontSize: '16px', 
              lineHeight: 1.8, 
              color: '#999' 
            }}>
              Hey there! Raghav this side — a Full Stack Developer who obsesses over building production-grade web apps that don't just work, they look stunning doing it. From pixel-perfect frontends to robust backends, and sprinkling AI integrations wherever they make things smarter — that's the sweet spot. When not shipping code, you'll find me strumming the guitar, smashing it on the badminton court, or out on a morning run.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
