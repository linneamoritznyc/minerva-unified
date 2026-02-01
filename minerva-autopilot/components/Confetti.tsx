'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useAppStore } from '@/lib/store';

export function Confetti() {
  const showConfetti = useAppStore((state) => state.showConfetti);

  useEffect(() => {
    if (showConfetti) {
      // Fire confetti from the center
      const duration = 2000;
      const end = Date.now() + duration;

      const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      // Also fire a burst from the center
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      });
    }
  }, [showConfetti]);

  return null;
}
