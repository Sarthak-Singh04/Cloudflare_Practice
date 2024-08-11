// hooks/useIntersectionObserver.ts
import { useEffect } from 'react';

export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (ref.current) observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, callback, options]);
};