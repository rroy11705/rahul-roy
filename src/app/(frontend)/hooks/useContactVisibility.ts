import { useState, useEffect } from 'react';

export const useContactVisibility = () => {
  const [isInContact, setIsInContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactElement = document.getElementById('contact');
      if (!contactElement) return;

      const rect = contactElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Consider user "in contact" if the contact section takes up more than 40% of viewport
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const contactVisibilityRatio = Math.max(0, visibleHeight) / windowHeight;
      
      setIsInContact(contactVisibilityRatio > 0.4);
    };

    // Delay initial check to allow DOM to be ready
    const initialCheck = setTimeout(handleScroll, 100);

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(initialCheck);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isInContact;
};