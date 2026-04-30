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
        const rect = placeholder.getBoundingClientRect();
        return { 
          x: rect.left, 
          y: rect.top 
        };
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

    // 2. State Proxy for unified animation
    const proxy = { move: 0, about: 0, leave: 0 };

    gsap.to(proxy, {
      move: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom 40%',
        scrub: 0.3,
        id: 'avatar-move'
      }
    });

    gsap.to(proxy, {
      about: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'top bottom',
        end: 'top 20%',
        scrub: 0.5,
        id: 'avatar-about'
      }
    });

    gsap.to(proxy, {
      leave: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#about',
        start: 'bottom 80%',
        end: 'bottom 20%',
        scrub: 0.5,
        id: 'avatar-leave-about'
      }
    });

    // 3. Centralized Renderer
    const renderAvatar = () => {
      if (!el) return;

      const scrollY = window.scrollY;
      const aboutSec = document.getElementById('about');
      const aboutPh = document.getElementById('about-image-placeholder');
      
      const currentStartPos = getPlaceholderPos();

      // State 1: Start (Hero Placeholder)
      const stateStart = {
        x: currentStartPos.x, y: currentStartPos.y, width: startSize, height: startSize,
        borderRadius: '50%', borderWidth: '3px', borderColor: 'rgba(245, 197, 24, 0.4)',
        opacity: 1
      };

      // State 2: Float (Corner)
      const stateFloat = {
        x: targetLeft, y: window.innerHeight - targetBottom - targetSize, width: targetSize, height: targetSize,
        borderRadius: '50%', borderWidth: '3px', borderColor: 'rgba(245, 197, 24, 0.4)',
        opacity: 1
      };

      // State 3: About (Placeholder Screen Position)
      let phX = targetLeft;
      let phY = window.innerHeight - targetBottom - targetSize;
      let phW = targetSize;
      let phH = targetSize;

      if (aboutPh) {
        const phRect = aboutPh.getBoundingClientRect();
        phX = phRect.left;
        phY = phRect.top;
        phW = aboutPh.offsetWidth;
        phH = aboutPh.offsetHeight;
      }

      const stateAbout = {
        x: phX, y: phY, width: phW, height: phH,
        borderRadius: '16px', borderWidth: '0px', borderColor: 'rgba(255,255,255,0.08)',
        opacity: 1
      };

      let finalState;

      // Smooth phase transitions based on scroll triggers
      if (proxy.leave > 0) {
        // Transition from About position back to Float (corner)
        finalState = gsap.utils.interpolate(stateAbout, stateFloat, proxy.leave);
      } else if (proxy.about > 0) {
        // Transition from Float (corner) to About position
        finalState = gsap.utils.interpolate(stateFloat, stateAbout, proxy.about);
      } else {
        // Transition from Start (Hero) to Float (corner)
        finalState = gsap.utils.interpolate(stateStart, stateFloat, proxy.move);
      }

      gsap.set(el, finalState);

      // Match image styling during the About phase
      const img = el.querySelector('img');
      if (img) {
        const targetScale = gsap.utils.interpolate(1.3, 1.05, proxy.about);
        const targetObjPos = proxy.about > 0.5 ? 'center' : 'top';
        gsap.set(img, { scale: targetScale, objectPosition: targetObjPos });
      }
    };

    gsap.ticker.add(renderAvatar);

    // 4. Standalone Visibility Trigger (Only for refreshing ScrollTrigger)
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        // Force refresh if needed, but ticker handles positioning
      }
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    return () => {
      popTl.kill();
      gsap.ticker.remove(renderAvatar);
      ScrollTrigger.getById('avatar-move')?.kill();
      ScrollTrigger.getById('avatar-about')?.kill();
      ScrollTrigger.getById('avatar-leave-about')?.kill();
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
