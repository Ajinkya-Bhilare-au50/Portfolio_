import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEEN_KEY = 'preloader-seen';

// Show the intro once per browser session, and never for reduced-motion users.
const shouldShow = () => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
};

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(shouldShow);

  useEffect(() => {
    if (!isLoading) return;
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage unavailable — intro just shows again next visit */
    }
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-brand z-[100000] flex items-center justify-center"
          aria-hidden="true"
        >
          <motion.div
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative font-display text-5xl md:text-7xl font-bold tracking-tighter"
          >
            {/* Empty state */}
            <div className="text-red-900/30">Ajinkya.</div>

            {/* Fill state */}
            <motion.div
              className="absolute top-0 left-0 text-white overflow-hidden whitespace-nowrap"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.05 }}
            >
              Ajinkya<span className="text-black">.</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
