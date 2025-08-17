'use client';

import { ReactNode, useEffect } from 'react';
import { PageTransition } from '../animations/PageTransition';

interface ClientWrapperProps {
  children: ReactNode;
}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');
      
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = 80;
          const targetPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        }
      }
    };

    // Add event listener to the document for all hash links
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      if (link) {
        handleSmoothScroll(e);
      }
    });

    // Add CSS for better scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <PageTransition>{children}</PageTransition>;
};