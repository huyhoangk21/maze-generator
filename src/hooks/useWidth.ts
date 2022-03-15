import { useEffect, useState } from 'react';

export const useWidth = () => {
  const [width, setWidth] = useState<number>(
    Math.min(window.innerWidth * 0.9, 500)
  );

  useEffect(() => {
    const onResize = () => {
      setWidth(Math.min(window.innerWidth * 0.9, 500));
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return { width };
};
