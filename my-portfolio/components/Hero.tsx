'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

const ParticleField = dynamic(() => import('./three/ParticleField'), {
  ssr: false,
  loading: () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#0a0a0a' }} />,
});

const tags = ['#FULLSTACK', '#AI/ML', '#REACT', '#NEXT.JS', '#NODE.JS'];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-tag',
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.8,
        }
      );

      gsap.fromTo(
        '.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.4 }
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 1.8 }
      );

      gsap.fromTo(
        '.hero-image-wrapper',
        { opacity: 0, scale: 0.8, rotation: -5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <ParticleField />

      {/* Radial gradient overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.9) 100%)',
        zIndex: 1,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 24px 80px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Profile Image */}
        <motion.div
          className="hero-image-wrapper"
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid rgba(245, 197, 24, 0.3)',
            marginBottom: '32px',
            position: 'relative',
          }}
        >
          <Image
            src="/DSC_1344.jpeg"
            alt="Raghav Karnatak"
            fill
            
            style={{ objectFit: 'cover', transform: 'scale(1.2)', objectPosition: 'top' }}
            priority
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)',
          }} />
        </motion.div>

        {/* Name */}
        <motion.h1
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-2px',
            marginBottom: '20px',
            color: '#fff',
          }}
        >
          RAGHAV
          <br />
          <span className="gradient-text">KARNATAK</span>
        </motion.h1>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '28px',
        }}>
          {tags.map((tag) => (
            <motion.span
              key={tag}
              className="hero-tag"
              whileHover={{ scale: 1.1, background: 'rgba(245, 197, 24, 0.15)' }}
              style={{
                padding: '6px 16px',
                borderRadius: '50px',
                border: '1px solid rgba(245, 197, 24, 0.3)',
                fontSize: '12px',
                fontWeight: 500,
                color: '#f5c518',
                letterSpacing: '1px',
                cursor: 'default',
                background: 'rgba(245, 197, 24, 0.05)',
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Description */}
        <p
          className="hero-description"
          style={{
            fontSize: '18px',
            lineHeight: 1.7,
            color: '#aaa',
            maxWidth: '600px',
            marginBottom: '36px',
          }}
        >
          Welcome to my portfolio! I&apos;m a{' '}
          <span style={{ color: '#fff', fontWeight: 600 }}>Full Stack Developer</span>{' '}
          &amp; <span style={{ color: '#fff', fontWeight: 600 }}>AI Engineer</span>{' '}
          with expertise in building production-grade applications. I craft visually stunning, 
          functional systems that deliver exceptional user experiences.
        </p>

        {/* CTA */}
        <a href="#projects" onClick={(e) => {
          e.preventDefault();
          const elem = document.getElementById('projects');
          if (elem) {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: elem, offsetY: 80 },
              ease: 'power4.inOut',
            });
          }
        }} style={{ textDecoration: 'none' }}>
          <motion.div
            className="hero-cta"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(245, 197, 24, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #f5c518, #ff6b35)',
              color: '#0a0a0a',
              fontSize: '16px',
              fontWeight: 700,
              borderRadius: '50px',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Start a Project Now
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </a>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '24px',
              height: '40px',
              borderRadius: '12px',
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px',
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0], y: [0, 12] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '3px',
                height: '8px',
                borderRadius: '2px',
                background: '#f5c518',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
