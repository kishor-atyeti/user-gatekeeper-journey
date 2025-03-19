
import { useEffect, useState } from 'react';

// Hook for delayed mount (useful for staggered animations)
export const useDelayedMount = (delay = 150) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return isMounted;
};

// Type for animation props
export type AnimationProps = {
  duration?: number;
  delay?: number;
  timingFunction?: string;
  className?: string;
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);
  
  return [setRef, isVisible] as const;
};

// Creates a CSS transition string based on properties
export const createTransition = (
  properties: string[] = ['all'],
  duration = 300,
  timingFunction = 'ease-out',
  delay = 0
) => {
  return properties
    .map(prop => `${prop} ${duration}ms ${timingFunction} ${delay}ms`)
    .join(', ');
};
