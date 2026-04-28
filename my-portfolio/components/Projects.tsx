'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'orbit',
    title: 'ORBIT – AI 911 Dispatch',
    subtitle: 'Full Stack Development',
    description: 'Built a production-style voice AI system to convert emergency calls into structured incidents and dispatch workflows using Next.js, Mappls API, MCP and LLM.',
    image: '/project-orbit.png',
    tags: ['Next.js', 'React', 'Supabase', 'Twilio', 'LLM API'],
    highlights: [
      'Voice pipeline integrating STT, LLM-based classification',
      'Outbound call automation via Twilio',
      'Webhook pipelines for call events and data normalization',
    ],
    link: '#',
    color: '#7c3aed',
  },
  {
    id: 'campusbuddy',
    title: 'CampusBuddy',
    subtitle: 'Full Stack Development',
    description: 'MERN-based food ordering platform for ordering from multiple outlets with real-time tracking, live order status, and secure role-based authentication.',
    image: '/project-campusbuddy.png',
    tags: ['React.js', 'MongoDB', 'Express', 'Socket.io', 'JWT'],
    highlights: [
      'Multi-outlet ordering with real-time tracking',
      'Live order status updates using Socket.io',
      'Secure authentication with role-based access',
    ],
    link: '#',
    color: '#f59e0b',
  },
  {
    id: 'infuturum',
    title: 'Infuturum 4.0',
    subtitle: 'Frontend Development',
    description: 'Interactive event website for ACM Bennett University with cinematic UI, parallax effects, countdown timers, and media interactions.',
    image: '/project-infuturum.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    highlights: [
      'Cinematic UI with parallax animations',
      'Countdown timers and media interactions',
      'Responsive, modular component architecture',
    ],
    link: '#',
    color: '#06b6d4',
  },
  {
    id: 'voicego',
    title: 'VoiceGo',
    subtitle: 'Full Stack Development',
    description: 'AI-powered real-time voice customer support system using WebSocket audio streaming with analytics dashboard for monitoring support and managing agents.',
    image: '/project-voicego.png',
    tags: ['Next.js', 'WebSocket', 'PostgreSQL', 'Redis', 'Docker'],
    highlights: [
      'Real-time voice streaming via WebSocket',
      'Scalable backend with analytics dashboard',
      'Voice pipeline: STT → LLM → TTS',
    ],
    link: '#',
    color: '#10b981',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60, rotateX: 5 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
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
      id="projects"
      ref={sectionRef}
      className="dot-pattern"
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
              ✦ Featured Work
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
              Showcasing My Work for
              <br />
              <span className="gradient-text">Your Inspiration</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '15px',
              color: '#888',
              maxWidth: '400px',
              lineHeight: 1.7,
            }}
          >
            Discover a showcase of full-stack projects by Raghav Karnatak — 
            from AI-powered voice systems to real-time web platforms.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              whileHover={{ y: -8 }}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'rgba(17, 17, 17, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                transition: 'border-color 0.3s ease',
                borderColor: activeProject === project.id ? `${project.color}33` : 'rgba(255,255,255,0.05)',
              }}
            >
              {/* Image */}
              <div style={{
                position: 'relative',
                height: '240px',
                overflow: 'hidden',
              }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    transform: activeProject === project.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                />
                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 60%)`,
                }} />

                {/* View Project Button */}
                <AnimatePresence>
                  {activeProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <span style={{
                        padding: '10px 24px',
                        background: project.color,
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 600,
                        borderRadius: '50px',
                        whiteSpace: 'nowrap',
                      }}>
                        View Project →
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Date badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 500,
                    background: 'rgba(255,255,255,0.1)',
                    color: '#ccc',
                    backdropFilter: 'blur(10px)',
                  }}>
                    {project.subtitle}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '10px',
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: '#aaa',
                  marginBottom: '16px',
                }}>
                  {project.description}
                </p>

                {/* Highlights */}
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}>
                  {project.highlights.map((h) => (
                    <li key={h} style={{
                      fontSize: '12px',
                      color: '#888',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '6px',
                    }}>
                      <span style={{ color: project.color, fontSize: '8px', marginTop: '5px' }}>●</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        fontWeight: 500,
                        background: `${project.color}15`,
                        color: project.color,
                        border: `1px solid ${project.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: '60px',
            padding: '40px',
            borderRadius: '24px',
            background: 'rgba(17, 17, 17, 0.6)',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '60px',
            flexWrap: 'wrap',
            textAlign: 'center',
          }}
        >
          {[
            { label: 'Projects Completed', value: '10+' },
            { label: 'Technologies Used', value: '20+' },
            { label: 'Hackathons Won', value: '2' },
            { label: 'Lines of Code', value: '50K+' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{
                fontSize: '32px',
                fontWeight: 800,
                color: '#f5c518',
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
