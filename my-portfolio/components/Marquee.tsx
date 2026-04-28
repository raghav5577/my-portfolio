'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Navigating this portfolio feels natural. Everything is elegant and easy to use.",
    author: "Hackathon Judge",
    rating: 5,
  },
  {
    text: "Raghav turned our vision into reality, building a confident and reliable product.",
    author: "Project Collaborator",
    rating: 5,
  },
  {
    text: "The experience feels smooth, fast, and exactly how a modern website should be.",
    author: "Team Lead",
    rating: 5,
  },
  {
    text: "Perfectly designed — everything is responsive and functional across devices.",
    author: "Beta User",
    rating: 5,
  },
];

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.marquee-container',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '60px 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px',
        background: 'linear-gradient(to right, #0a0a0a, transparent)', zIndex: 2
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px',
        background: 'linear-gradient(to left, #0a0a0a, transparent)', zIndex: 2
      }} />

      <motion.div
        className="marquee-container"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        ref={marqueeRef}
        style={{
          display: 'flex',
          width: 'max-content',
        }}
      >
        <div className="marquee-track" style={{ display: 'flex', gap: '40px', paddingRight: '40px' }}>
          {[...testimonials, ...testimonials].map((item, i) => (
            <div
              key={i}
              style={{
                minWidth: '350px',
                padding: '28px',
                borderRadius: '16px',
                background: 'rgba(17, 17, 17, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: item.rating }).map((_, j) => (
                  <span key={j} style={{ color: '#f5c518', fontSize: '14px' }}>★</span>
                ))}
              </div>
              <p style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: '#ccc',
                fontStyle: 'italic',
              }}>
                &ldquo;{item.text}&rdquo;
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #333, #555)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#fff',
                  fontWeight: 600,
                }}>
                  {item.author[0]}
                </div>
                <span style={{ fontSize: '13px', color: '#888' }}>{item.author}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
