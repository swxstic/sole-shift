import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] bg-bg-primary flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-display font-black text-7xl md:text-9xl tracking-tighter text-text-primary">
              SOLE<span className="text-accent-red">//</span>SHIFT
            </h1>
            <p className="font-mono text-xs text-text-muted tracking-widest mt-4 uppercase">
              Premium Sneaker Marketplace
            </p>
          </motion.div>

          <div className="mt-16 w-48">
            <div className="h-px bg-white/10 w-full relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent-red"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="font-mono text-xs text-text-muted mt-2 text-right">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
