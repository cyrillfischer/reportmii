// src/components/AnimatedShapesPartner.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedShapesPartner() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const arr = Array.from({ length: 22 }).map(() => ({
      id: Math.random(),
      width: Math.random() * 240 + 80,  // 80–320px
      height: 1,                        // ultra-thin line
      opacity: 0.03 + Math.random() * 0.03,  // 0.03–0.06
      rotate: Math.random() * 45 - 22,
      blur: Math.random() * 1.3 + 0.7,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      deltaX: (Math.random() - 0.5) * 120,
      deltaY: (Math.random() - 0.5) * 120,
      duration: 18 + Math.random() * 20,
    }));
    setLines(arr);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {lines.map((l) => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{
            width: l.width,
            height: l.height,
            left: `${l.startX}%`,
            top: `${l.startY}%`,
            opacity: l.opacity,

            // Grauer Partner-Look: 100% Design A
            backgroundColor: "rgba(150, 150, 150, 0.25)",

            borderRadius: "9999px",
            rotate: l.rotate,
            filter: `blur(${l.blur}px)`,
          }}
          animate={{
            x: [0, l.deltaX, l.deltaX * -0.6, l.deltaX * 0.8, 0],
            y: [0, l.deltaY, l.deltaY * -0.6, l.deltaY * 0.8, 0],
          }}
          transition={{
            duration: l.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
