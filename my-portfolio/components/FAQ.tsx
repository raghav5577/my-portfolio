'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'I offer full-stack web development, AI/ML engineering, UI/UX design, backend systems architecture, and deployment solutions. From concept to production, I build modern, scalable applications.',
  },
  {
    question: 'How fast will I receive my work?',
    answer: 'Delivery timelines depend on project scope. Typical projects range from 1-4 weeks. I prioritize quality and clear communication throughout the development process.',
  },
  {
    question: "What's your pricing?",
    answer: "Pricing varies based on project complexity and requirements. I offer competitive rates and always provide detailed estimates upfront. Let's discuss your project for a custom quote.",
  },
  {
    question: 'What if I have a single project?',
    answer: "Absolutely! I work on projects of all sizes — from small landing pages to full-featured applications. Every project receives the same level of attention and quality.",
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes! I provide post-launch support and maintenance packages to ensure your application stays up-to-date, secure, and performant over time.',
  },
  {
    question: 'Are there any hidden costs?',
    answer: 'No hidden costs ever. All pricing is discussed and agreed upon before work begins. Any scope changes are communicated transparently with updated estimates.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
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
          ✦ Support
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
            marginBottom: '12px',
          }}
        >
          FAQS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: '15px',
            color: '#888',
            marginBottom: '48px',
            lineHeight: 1.7,
          }}
        >
          Got a question? Find answers to the most commonly asked questions below.
        </motion.p>

        {/* FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                background: openIndex === i ? 'rgba(245, 197, 24, 0.05)' : 'rgba(17, 17, 17, 0.4)',
                border: '1px solid',
                borderColor: openIndex === i ? 'rgba(245, 197, 24, 0.15)' : 'rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: openIndex === i ? '#f5c518' : '#ccc',
                  fontSize: '15px',
                  fontWeight: 600,
                  textAlign: 'left',
                  transition: 'color 0.3s ease',
                }}
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  style={{
                    fontSize: '20px',
                    color: openIndex === i ? '#f5c518' : '#666',
                    flexShrink: 0,
                    marginLeft: '16px',
                  }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      padding: '0 24px 20px',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: '#aaa',
                    }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
