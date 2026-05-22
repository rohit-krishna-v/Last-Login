import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export function SplitText({ text, className = "", delay = 0 }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const words = text.split(" ").map(word => word.split(""));

  return (
    <div ref={ref} className={className} style={{ display: "inline-block", overflow: "hidden" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }} className="mr-[0.25em]">
          {word.map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              style={{ display: "inline-block" }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.2, 0.65, 0.3, 0.9],
                    delay: delay + (wordIndex * 0.1) + (charIndex * 0.03)
                  }
                }
              }}
              initial="hidden"
              animate={controls}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  );
}
