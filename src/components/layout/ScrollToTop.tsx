'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // If not navigating to an in-page anchor hash, ensure the viewport starts at top (0, 0)
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      const raf = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [pathname]);

  return null;
}
