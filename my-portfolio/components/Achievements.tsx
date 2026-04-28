'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    title: 'Winner, Hackathon at BITS Pilani',
    event: 'APOGEE 2025',
    icon: '🏆',
    color: '#f5c518',
  },
  {
    title: '1st Runner Up, Mappls Tech Hackathon',
    event: 'BITS Pilani — APOGEE 2026',
    icon: '🥈',
    color: '#c0c0c0',
  },
];

const coursework = [
  'Full Stack Development',
  'DBMS',
  'OOP (Python & Java)',
  'Operating Systems',
  'Data Structures & Algorithms',
  'Computer Networks',
  'Design & Analysis of Algorithms',
  'Microprocessors',
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.achievement-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.course-chip',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.coursework-section',
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
        padding: '120px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Achievements */}
        <div style={{ marginBottom: '80px' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#f5c518',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            ✦ Achievements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-1px',
              marginBottom: '40px',
            }}
          >
            Awards &amp; <span className="gradient-text">Recognition</span>
          </motion.h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '20px',
          }}>
            {achievements.map((a) => (
              <motion.div
                key={a.title}
                className="achievement-card"
                whileHover={{ y: -4, borderColor: `${a.color}33` }}
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                  background: 'rgba(17, 17, 17, 0.6)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: `${a.color}15`,
                  border: `1px solid ${a.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0,
                }}>
                  {a.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {a.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888' }}>
                    {a.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coursework */}
        <div className="coursework-section">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#f5c518',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            ✦ Relevant Coursework
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              marginBottom: '32px',
            }}
          >
            Academic <span className="gradient-text">Foundation</span>
          </motion.h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {coursework.map((course) => (
              <motion.span
                key={course}
                className="course-chip"
                whileHover={{ scale: 1.05, borderColor: 'rgba(245, 197, 24, 0.3)' }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: 500,
                  background: 'rgba(17, 17, 17, 0.6)',
                  color: '#aaa',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                }}
              >
                {course}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
