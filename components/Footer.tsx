'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { name: 'GitHub', href: 'https://github.com/raghav5577' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/raghav-karnatak' },
      { name: 'Email', href: 'mailto:raghavmil425@gmail.com' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Web Development', href: '#services' },
      { name: 'AI/ML Engineering', href: '#services' },
      { name: 'UI/UX Design', href: '#services' },
      { name: 'Backend Systems', href: '#services' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{
      padding: '60px 24px 30px',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f5c518, #ff6b35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: '#0a0a0a',
              }}>
                R
              </div>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                Portfolio
              </span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#666', maxWidth: '250px' }}>
              Building modern, scalable applications with cutting-edge technology and a passion for clean code.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#fff',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                {column.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {column.links.map((link) => (
                  <motion.div key={link.name} whileHover={{ x: 4 }}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '13px',
                        color: '#666',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#f5c518'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#666'}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '12px', color: '#444' }}>
            © {new Date().getFullYear()} Raghav Karnatak. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: '#444' }}>
            Built with Next.js, Three.js, GSAP &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
