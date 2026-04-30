'use client';

export default function TechMarquee({ size = 'normal' }: { size?: 'normal' | 'large' }) {
  const isLarge = size === 'large';
  
  return (
    <div style={{
      padding: isLarge ? '40px 0' : '24px 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      overflow: 'hidden',
      position: 'relative',
      background: '#0a0a0a',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: isLarge ? '150px' : '100px',
        background: 'linear-gradient(to right, #0a0a0a, transparent)', zIndex: 2
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: isLarge ? '150px' : '100px',
        background: 'linear-gradient(to left, #0a0a0a, transparent)', zIndex: 2
      }} />
      
      <div className="marquee-track" style={{
        display: 'flex',
        gap: isLarge ? '60px' : '40px',
        alignItems: 'center',
        width: 'max-content',
      }}>
        {[
          'React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL',
          'MongoDB', 'Redis', 'Docker', 'Tailwind', 'GSAP', 'Three.js',
          'Framer Motion', 'Express', 'FastAPI', 'Supabase', 'Socket.io', 'Git',
          'React', 'Next.js', 'Node.js', 'TypeScript', 'Python', 'PostgreSQL',
          'MongoDB', 'Redis', 'Docker', 'Tailwind', 'GSAP', 'Three.js',
          'Framer Motion', 'Express', 'FastAPI', 'Supabase', 'Socket.io', 'Git',
        ].map((tech, i) => (
          <span key={`${tech}-${i}`} style={{
            fontSize: isLarge ? '24px' : '14px',
            fontWeight: 800,
            color: isLarge ? '#555' : '#444',
            whiteSpace: 'nowrap',
            letterSpacing: isLarge ? '2px' : '1px',
            textTransform: 'uppercase',
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
