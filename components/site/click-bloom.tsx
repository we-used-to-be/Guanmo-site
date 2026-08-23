"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Bloom = {
  id: number;
  x: number;
  y: number;
};

const petalAngles = Array.from({ length: 8 }, (_, index) => index * 45);

export function ClickBloom() {
  const reduced = useReducedMotion();
  const nextId = useRef(0);
  const [bloom, setBloom] = useState<Bloom | null>(null);

  useEffect(() => {
    if (reduced) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      setBloom({ id: ++nextId.current, x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [reduced]);

  if (reduced || !bloom) return null;

  return (
    <div key={bloom.id} className="click-bloom" style={{ left: bloom.x, top: bloom.y }} aria-hidden="true">
      {petalAngles.map((angle, index) => (
        <span className="click-bloom-ray" key={angle} style={{ transform: `rotate(${angle}deg)` }}>
          <motion.span
            className="click-bloom-petal"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0.32] }}
            transition={{
              duration: 0.9,
              delay: index * 0.012,
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.46, 1],
            }}
          />
        </span>
      ))}
      <motion.span
        className="click-bloom-core"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0.65] }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], times: [0, 0.25, 1] }}
        onAnimationComplete={() => setBloom((current) => (current?.id === bloom.id ? null : current))}
      />
    </div>
  );
}
