'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function FloatingAvatar() {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Listen for the Hero intro animation to complete
  useEffect(() => {
    const onIntroComplete = () => setVisible(true);
    window.addEventListener('introComplete', onIntroComplete);
    return () => window.removeEventListener('introComplete', onIntroComplete);
  }, []);

  // Pop-in + scroll-driven animation to bottom-left
  useEffect(() => {
    if (!visible || !avatarRef.current) return;

    const el = avatarRef.current;

    // Calculate where we need to end up:
    // bottom-left corner with some padding
    const targetLeft = 32;           // px from left
    const targetBottom = 32;         // px from bottom
    const targetSize = 56;           // final diameter in px
    const startSize = 140;           // initial diameter in px

    const getPlaceholderPos = () => {
      const placeholder = document.getElementById('avatar-placeholder');
      if (placeholder) {
        // Calculate position relative to the document, ignoring CSS transforms (like translateY)
        let x = 0;
        let y = 0;
        let curr: HTMLElement | null = placeholder;
        while (curr) {
          x += curr.offsetLeft;
          y += curr.offsetTop;
          curr = curr.offsetParent as HTMLElement | null;
        }
        return { x, y: y - window.scrollY };
      }
      // Fallback
      return {
        x: window.innerWidth / 2 - startSize / 2,
        y: window.innerHeight * 0.38 - startSize / 2,
      };
    };

    const initialPos = getPlaceholderPos();
    const startX = initialPos.x;
    const startY = initialPos.y;

    // End: bottom-left
    const endX = targetLeft;
    const endY = window.innerHeight - targetBottom - targetSize;

    gsap.set(el, {
      x: startX,
      y: startY + 40,
      width: startSize,
      height: startSize,
      opacity: 0,
      scale: 0.85,
    });

    // 1. Professional "Float and Settle" entrance animation
    const popTl = gsap.timeline();
    popTl.to(el, {
      y: startY,
      opacity: 1,
      scale: 1,
      duration: 1.6,
      ease: 'expo.out',
      delay: 0.1,
    });

    // 2. Scroll-driven: move from center to bottom-left
    popTl.add(() => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom 40%',
          scrub: 0.6,
          invalidateOnRefresh: true,
          id: 'avatar-move',
        },
        x: endX,
        y: endY,
        width: targetSize,
        height: targetSize,
        ease: 'power2.inOut',
      });
    });

    // Recalculate positions on resize
    const onResize = () => {
      ScrollTrigger.getById('avatar-move')?.kill();
      
      const newPos = getPlaceholderPos();
      const newStartX = newPos.x;
      const newStartY = newPos.y;
      const newEndX = targetLeft;
      const newEndY = window.innerHeight - targetBottom - targetSize;

      // Only update if we haven't scrolled past the trigger
      const scrollProgress = ScrollTrigger.getById('avatar-move')?.progress ?? 0;
      if (scrollProgress < 1) {
        gsap.set(el, { x: newStartX, y: newStartY });
      }

      gsap.to(el, {
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom 40%',
          scrub: 0.6,
          invalidateOnRefresh: true,
          id: 'avatar-move',
        },
        x: newEndX,
        y: newEndY,
        width: targetSize,
        height: targetSize,
        ease: 'power2.inOut',
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      popTl.kill();
      ScrollTrigger.getById('avatar-move')?.kill();
      window.removeEventListener('resize', onResize);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={avatarRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 140,
        height: 140,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid rgba(245, 197, 24, 0.4)',
        boxShadow: '0 0 30px rgba(245, 197, 24, 0.15), 0 4px 20px rgba(0,0,0,0.6)',
        zIndex: 9999,
        cursor: 'pointer',
        willChange: 'transform',
        pointerEvents: 'auto',
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { scale: 1.15, duration: 0.3, ease: 'power2.out' });
        e.currentTarget.style.borderColor = 'rgba(245, 197, 24, 0.8)';
        e.currentTarget.style.boxShadow = '0 0 50px rgba(245, 197, 24, 0.3), 0 4px 20px rgba(0,0,0,0.6)';
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power2.out' });
        e.currentTarget.style.borderColor = 'rgba(245, 197, 24, 0.4)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(245, 197, 24, 0.15), 0 4px 20px rgba(0,0,0,0.6)';
      }}
      onClick={() => {
        gsap.to(window, { duration: 0.8, scrollTo: { y: 0 }, ease: 'power3.out' });
      }}
    >
      <Image
        src="/DSC_1344.jpeg"
        alt="Raghav Karnatak"
        fill
        style={{ objectFit: 'cover', transform: 'scale(1.3)', objectPosition: 'top' }}
        priority
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        boxShadow: 'inset 0 0 25px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
