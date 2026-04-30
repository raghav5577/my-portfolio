'use client';

import { useRef } from 'react';
import TechMarquee from './TechMarquee';

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        padding: '60px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Tech logos marquee */}
        <div>
          <TechMarquee />
        </div>
      </div>
    </section>
  );
}
