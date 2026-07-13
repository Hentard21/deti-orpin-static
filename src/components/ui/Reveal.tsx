'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Задержка анимации, сек */
  delay?: number;
  /** Начальное смещение по X, px */
  x?: number;
  /** Начальное смещение по Y, px */
  y?: number;
}

/**
 * Плавное появление при попадании в viewport (замена framer-motion).
 *
 * Важное отличие от motion.div: серверный HTML полностью видим —
 * без JavaScript и в старых браузерах контент не скрывается.
 * Элемент прячется только на клиенте после гидратации, если
 * поддерживается IntersectionObserver и не включён облегчённый режим.
 */
export default function Reveal({ children, className = '', delay = 0, x = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled: performanceMode } = usePerformanceMode();
  const [phase, setPhase] = useState<'ssr' | 'hidden' | 'shown'>('ssr');

  useEffect(() => {
    if (performanceMode) {
      setPhase('shown');
      return;
    }
    if (!('IntersectionObserver' in window)) return; // старый браузер — контент просто виден
    const el = ref.current;
    if (!el) return;
    setPhase((p) => (p === 'shown' ? p : 'hidden'));
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('shown');
          obs.disconnect();
        }
      },
      { rootMargin: '-60px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [performanceMode]);

  const hidden = phase === 'hidden';
  const style =
    phase === 'ssr'
      ? undefined
      : {
          opacity: hidden ? 0 : 1,
          transform: hidden ? `translate(${x}px, ${y}px)` : 'translate(0, 0)',
          transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
