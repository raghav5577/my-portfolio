'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const services = [
  {
    icon: '💻',
    title: 'Web Development',
    description: 'Crafting full-stack applications that are fast, scalable, and aesthetically sharp — from sleek React frontends to robust Node.js backends, built to perform end to end.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript'],
  },
  {
    icon: '🤖',
    title: 'AI Services',
    description: 'Developing AI-powered intelligent systems, with  MCP server configuration, API setups, AI Agents and shipping complete applications that are actually smart. ',
    tags: ['LLMs', 'STT/TTS', 'NLP', 'Transformers'],
  },
  {
    icon: '🚀',
    title: 'DevOps & Deployment',
    description: 'Deploying production-ready applications on cloud and managing DNS configurations so your project is live, fast, and reliable.',
    tags: ['Docker', 'Vercel', 'Git'],
  },
  {
    icon: '⚡',
    title: 'Backend Systems',
    description: 'Designing scalable APIs, real-time systems, and event-driven architectures with robust database management.',
    tags: ['Express', 'FastAPI', 'PostgreSQL', 'Redis'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
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
      id="services"
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '60px',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
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
              ✦ My Services
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
              }}
            >
              Experience the Impact of
              <br />
              <span className="gradient-text">Developer-Centric Solutions</span>
            </motion.h2>
          </div>

          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            const elem = document.getElementById('contact');
            if (elem) {
              gsap.to(window, {
                duration: 0.1,
                scrollTo: { y: elem, offsetY: 80 },
                ease: 'power3.out',
              });
            }
          }} style={{ textDecoration: 'none' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #f5c518, #ff6b35)',
                color: '#0a0a0a',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '50px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              Start a Project Now →
            </motion.div>
          </a>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
        }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="service-card"
              whileHover={{
                y: -5,
                borderColor: 'rgba(245, 197, 24, 0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}
              style={{
                padding: '32px',
                borderRadius: '20px',
                background: 'rgba(17, 17, 17, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <span style={{ fontSize: '32px' }}>{service.icon}</span>
              <div>
                <p style={{
                  fontSize: '11px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '8px',
                }}>
                  Building high-performance solutions
                </p>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '12px',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: '#aaa',
                  marginBottom: '20px',
                }}>
                  {service.description}
                </p>
              </div>

              {/* Tags */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: 'auto',
              }}>
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 500,
                      background: 'rgba(255,255,255,0.05)',
                      color: '#888',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
