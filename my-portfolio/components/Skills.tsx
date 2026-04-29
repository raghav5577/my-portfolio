'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechMarquee from './TechMarquee';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 88 },
      { name: 'Python', level: 85 },
      { name: 'C++', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'SQL', level: 80 },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Three.js', level: 70 },
      { name: 'GSAP', level: 78 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'Express', level: 90 },
      { name: 'FastAPI', level: 80 },
      { name: 'Django', level: 72 },
      { name: 'Flask', level: 75 },
    ],
  },
  {
    title: 'AI/ML & Tools',
    skills: [
      { name: 'LLMs', level: 85 },
      { name: 'NLP', level: 80 },
      { name: 'STT/TTS Pipelines', level: 82 },
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'WebSocket', level: 85 },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 90 },
      { name: 'MySQL', level: 82 },
      { name: 'Redis', level: 75 },
      { name: 'Supabase', level: 80 },
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-category',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.skill-bar-fill',
        { width: '0%' },
        {
          width: (i, el) => el.getAttribute('data-level') + '%',
          duration: 1.2,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
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
        {/* Header */}
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
          ✦ Technical Skills
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
            marginBottom: '60px',
          }}
        >
          My <span className="gradient-text">Tech Stack</span>
        </motion.h2>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="skill-category"
              whileHover={{ borderColor: 'rgba(245, 197, 24, 0.15)' }}
              style={{
                padding: '28px',
                borderRadius: '20px',
                background: 'rgba(17, 17, 17, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'border-color 0.3s ease',
              }}
            >
              <h3 style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#f5c518',
                  display: 'inline-block',
                }} />
                {category.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}>
                      <span style={{ fontSize: '13px', color: '#ccc', fontWeight: 500 }}>
                        {skill.name}
                      </span>
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{
                      height: '4px',
                      borderRadius: '2px',
                      background: 'rgba(255,255,255,0.05)',
                      overflow: 'hidden',
                    }}>
                      <div
                        className="skill-bar-fill"
                        data-level={skill.level}
                        style={{
                          height: '100%',
                          borderRadius: '2px',
                          background: `linear-gradient(to right, #f5c518, #ff6b35)`,
                          width: '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech logos marquee */}
        <div style={{ marginTop: '60px' }}>
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
