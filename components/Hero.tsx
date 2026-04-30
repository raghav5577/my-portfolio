'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import dynamic from 'next/dynamic';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin, TextPlugin);
}

const ParticleField = dynamic(() => import('./three/ParticleField'), {
  ssr: false,
  loading: () => <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: '#0a0a0a' }} />,
});



export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsIntroComplete(true);
          // Tell FloatingAvatar it's time to show
          window.dispatchEvent(new CustomEvent('introComplete'));
        }
      });

      // 1. Initial wait
      tl.set(typingRef.current, { text: "" })
        .delay(0.5)

        // 2. Type: Hi I am Raghav Karnatak
        .to(typingRef.current, {
          duration: 1.3,
          text: "Hi, I'm Raghav Karnatak...",
          ease: 'none',
        })
        .to({}, { duration: 0.8 }) // Pause

        // 3. Backspace EVERYTHING
        .to(typingRef.current, {
          duration: 1.0,
          text: "",
          ease: "none",
        })
        .to({}, { duration: 0.3 }) // Short pause

        // 4. Type: Full Stack Developer
        .to(typingRef.current, {
          duration: 1.0,
          text: "...Full Stack Developer",
          ease: "none",
        })
        .to({}, { duration: 0.8 }) // Pause

        // 5. Fade out intro
        .to('.intro-container', {
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)',
          duration: 0.8,
          ease: 'power2.inOut',
        });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Animation for the final static elements
  useEffect(() => {
    if (isIntroComplete) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        gsap.set('.static-content', { opacity: 0, y: 30 });

        tl.to('.static-content', {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.25,
          ease: 'power4.out',
        })
      }, heroRef);
      return () => ctx.revert();
    }
  }, [isIntroComplete]);

  return (
    <section
      id="home"
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0a0a',
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
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.6) 50%, #0a0a0a 100%)',
        zIndex: 1,
      }} />

      {/* Intro Typewriter Animation */}
      {!isIntroComplete && (
        <div className="intro-container" style={{
          position: 'absolute',
          zIndex: 10,
          textAlign: 'center',
          width: '100%',
          padding: '0 20px',
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-2px',
            lineHeight: 1.2,
          }}>
            <span ref={typingRef}></span>
            <span className="cursor" style={{
              display: 'inline-block',
              width: '4px',
              height: '0.9em',
              background: '#f5c518',
              marginLeft: '8px',
              verticalAlign: 'middle',
              animation: 'blink 0.8s step-end infinite',
              boxShadow: '0 0 15px rgba(245, 197, 24, 0.5)',
            }}></span>
          </h1>
          <style jsx>{`
            @keyframes blink {
              from, to { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Final Static Layout */}
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
        opacity: isIntroComplete ? 1 : 0,
        visibility: isIntroComplete ? 'visible' : 'hidden',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        transform: isIntroComplete ? 'translateY(0)' : 'translateY(20px)',
      }}>

        {/* Placeholder for Floating Avatar to maintain spacing and provide position */}
        <div
          id="avatar-placeholder"
          style={{
            width: '140px',
            height: '140px',
            marginBottom: '40px',
            visibility: 'hidden',
            pointerEvents: 'none',
          }}
        />

        {/* Headline Container */}
        <div className="static-content" style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-4px',
            color: '#fff',
            marginBottom: '16px',
          }}>
            Hi, I'm <span className="gradient-text">Raghav Karnatak</span>
          </h1>

          <div style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.8)',
            letterSpacing: '-1px',
          }}>
            Full Stack Developer
          </div>
        </div>

        {/* Description */}
        <p
          className="static-content"
          style={{
            fontSize: '18px',
            lineHeight: 1.8,
            color: '#aaa',
            maxWidth: '700px',
            marginBottom: '48px',
            fontWeight: 450,
          }}
        >
          Building cool stuff for the web, end to end.
          <br />
          High end aesthetics and seamless experiences backed with AI services.
        </p>

        {/* CTA Buttons */}
        <div className="static-content" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}>
          <a href="#projects" onClick={(e) => {
            e.preventDefault();
            const elem = document.getElementById('projects');
            if (elem) {
              gsap.to(window, {
                duration: 0.8,
                scrollTo: { y: elem, offsetY: 80 },
                ease: 'power3.out',
              });
            }
          }} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(245, 197, 24, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 42px',
                background: 'linear-gradient(135deg, #f5c518, #ff6b35)',
                color: '#0a0a0a',
                fontSize: '17px',
                fontWeight: 800,
                borderRadius: '50px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Explore Projects
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </a>

          <a href="/resume.pdf" download="Raghav_Karnatak_Resume.pdf" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{
                scale: 1.05,
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: '#f5c518'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 42px',
                background: 'transparent',
                color: '#fff',
                fontSize: '17px',
                fontWeight: 700,
                borderRadius: '50px',
                cursor: 'pointer',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
            >
              Resume
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
              </svg>
            </motion.div>
          </a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: isIntroComplete ? 'block' : 'none',
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '26px',
              height: '44px',
              borderRadius: '13px',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '10px',
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0], y: [0, 15] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '4px',
                height: '10px',
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
