'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = 80;
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: elem, offsetY: offset },
        ease: 'power4.inOut',
      });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f5c518, #ff6b35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: '#0a0a0a',
              }}>
                R
              </div>
              <span style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.5px',
              }}>
                Portfolio
              </span>
            </motion.div>
          </a>

          {/* Desktop Nav */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                style={{ textDecoration: 'none' }}
              >
                <motion.span
                  whileHover={{ color: '#f5c518' }}
                  style={{
                    fontSize: '14px',
                    fontWeight: activeSection === link.href.replace('#', '') ? 600 : 400,
                    color: activeSection === link.href.replace('#', '') ? '#f5c518' : '#aaa',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.name}
                  {activeSection === link.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeNav"
                      style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: '#f5c518',
                        borderRadius: '1px',
                      }}
                    />
                  )}
                </motion.span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            style={{ textDecoration: 'none' }}
            className="hidden md:flex"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '10px 24px',
                background: 'linear-gradient(135deg, #f5c518, #ff6b35)',
                color: '#0a0a0a',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '50px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Let&apos;s Talk
            </motion.div>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <div style={{
              width: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}>
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 10 : 0 }}
                style={{ display: 'block', height: '2px', background: '#fff', borderRadius: '1px' }}
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                style={{ display: 'block', height: '2px', background: '#fff', borderRadius: '1px' }}
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -10 : 0 }}
                style={{ display: 'block', height: '2px', background: '#fff', borderRadius: '1px' }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '70px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(30px)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '32px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: activeSection === link.href.replace('#', '') ? '#f5c518' : '#fff',
                    textDecoration: 'none',
                  }}
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
