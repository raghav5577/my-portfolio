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

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Independent / Hackathon Projects',
      period: '2024 — Present',
      description: 'Building production-grade applications using Next.js, React, Node.js, and modern cloud infrastructure.',
    },
    {
      title: 'AI/ML Engineer',
      company: 'Voice AI & NLP Systems',
      period: '2025 — Present',
      description: 'Designing STT, LLM, and TTS pipelines for real-time voice-based applications and AI systems.',
    },
  ];

  const contact = [
    { label: 'Phone', value: '+91 9389765205' },
    { label: 'Email', value: 'raghavmil425@gmail.com' },
    { label: 'GitHub', value: 'github.com/raghav5577' },
    { label: 'Location', value: 'India' },
  ];

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
          style={{ marginBottom: '16px' }}
        >
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#f5c518',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            ✦ About Me
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '48px',
            letterSpacing: '-1px',
          }}
        >
          Passionate &amp; Driven
          <br />
          <span className="gradient-text">Full Stack Developer</span>
        </motion.h2>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '48px',
          alignItems: 'start',
        }}>
          {/* Left: Bio + Image */}
          <div className="about-card">
            <p style={{
              fontSize: '16px',
              lineHeight: 1.8,
              color: '#aaa',
              marginBottom: '32px',
            }}>
              I&apos;m Raghav Karnatak, a B.Tech Computer Science student at Bennett University 
              passionate about crafting intuitive, production-grade applications. With a CGPA of 8.70, 
              I&apos;ve completed multiple full-stack projects integrating AI/ML capabilities, 
              turning complex ideas into seamless interfaces.
            </p>

            <motion.a
              href="/Raghav_Karnatak_Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                background: 'rgba(245, 197, 24, 0.1)',
                border: '1px solid rgba(245, 197, 24, 0.3)',
                color: '#f5c518',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '50px',
                textDecoration: 'none',
                cursor: 'pointer',
                marginBottom: '32px',
              }}
            >
              Download Resume
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </motion.a>

            {/* Profile card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(17, 17, 17, 0.6)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
              }}>
                <Image src="/DSC_1344.jpeg" alt="Raghav" fill style={{ objectFit: 'cover', transform: 'scale(1.2)', objectPosition: 'top' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                  Raghav Karnatak
                </h4>
                <p style={{ fontSize: '13px', color: '#888' }}>
                  Full Stack Developer &amp; AI Engineer
                </p>
              </div>
            </div>
          </div>

          {/* Right: Experience + Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Experience */}
            <div className="about-card">
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ color: '#f5c518' }}>✦</span> Experience
              </h3>
              {experience.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'rgba(17, 17, 17, 0.6)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
                      {exp.title}
                    </h4>
                    <span style={{
                      fontSize: '11px',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: 'rgba(245, 197, 24, 0.1)',
                      color: '#f5c518',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                    }}>
                      {exp.period}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
                    {exp.company}
                  </p>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#aaa' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="about-card">
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ color: '#f5c518' }}>✦</span> Contact
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}>
                {contact.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: 'rgba(17, 17, 17, 0.6)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <p style={{ fontSize: '11px', color: '#666', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: '13px', color: '#ccc', fontWeight: 500, wordBreak: 'break-all' }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="about-card">
              <h3 style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{ color: '#f5c518' }}>✦</span> Education
              </h3>
              <div style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(17, 17, 17, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
                    B.Tech in CSE
                  </h4>
                  <span style={{
                    fontSize: '11px',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    background: 'rgba(245, 197, 24, 0.1)',
                    color: '#f5c518',
                    fontWeight: 500,
                  }}>
                    2024 — Present
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>
                  Bennett University
                </p>
                <p style={{ fontSize: '13px', color: '#f5c518', fontWeight: 600 }}>
                  CGPA: 8.70
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
