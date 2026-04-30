'use client';

import { motion } from 'framer-motion';
import ParticleMorph from './three/ParticleMorph';

export default function InteractiveSection() {
  return (
    <section
      style={{
        padding: '100px 24px',
        background: '#0a0a0a',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#FD7731',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '16px',
          }}>
            ✦ One Last Thing
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-2px',
            color: '#fff',
            marginBottom: '20px'
          }}>
            Made with <span style={{ color: '#f5c518' }}>Passion</span> & Code
          </h2>
          <p style={{
            color: '#666',
            fontSize: '16px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Interactive experiences are the soul of the web.
            Move your mouse over the heart to see the particles react!
          </p>
        </motion.div>

        {/* The Particle Animation */}
        <div style={{ position: 'relative', marginTop: '-40px' }}>
          <ParticleMorph />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          style={{ marginTop: '40px' }}
        >
          
        </motion.div>
      </div>
    </section>
  );
}
