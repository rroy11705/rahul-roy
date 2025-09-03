'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Header = () => {
  // TODO: Fetch global settings for logo and navigation items
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 150;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.section 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className={`transition-colors duration-500 ${
          isScrolled ? 'bg-black' : 'bg-transparent'
        }`}
        animate={{
          backgroundColor: isScrolled ? 'rgb(0, 0, 0)' : 'transparent',
        }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <header className="flex justify-between items-center py-4 px-4 md:px-25">
          <Link href="/" className="cursor-target font-medium text-white text-xl tracking-wider">
            RAHUL ROY
          </Link>

          <div className='flex flex-row items-center gap-6'>
            {/* <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Navigation
                items={[
                  { label: '[HOME]', href: '/' },
                  { label: '[ABOUT ME]', href: '/about-me' },
                  { label: '[PORTFOLIO]', href: '/portfolio' },
                  { label: '[BLOGS]', href: '/blogs' },
                  { label: '[CONTACT]', href: '/contact' },
                ]}
              />
            </motion.div> */}

            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/files/RAHUL_ROY_SOFTWARE_DEVELOPER.pdf"
                target="_blank"
                className="cursor-target text-gray hover:text-white font tracking-wider"
              >
                [RESUME]
              </Link>
              {/* <MobileMenu
                // TODO: Add MobileMenu props
                items={[
                  { label: '[HOME]', href: '/' },
                  { label: '[ABOUT ME]', href: '/about-me' },
                  { label: '[PORTFOLIO]', href: '/portfolio' },
                  { label: '[BLOGS]', href: '/blogs' },
                  { label: '[CONTACT]', href: '/contact' },
                ]}
              /> */}
            </motion.div>
          </div>
        </header>
      </motion.div>
    </motion.section>
  );
};
