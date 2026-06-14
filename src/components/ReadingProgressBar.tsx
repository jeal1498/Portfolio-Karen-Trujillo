import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[200] h-0.5 bg-primary transition-none"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progreso de lectura"
    />
  );
};

export default ReadingProgressBar;
