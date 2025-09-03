'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type NavItem = {
  label: string;
  href: string;
  target?: '_self' | '_blank';
  submenu?: NavItem[];
};

type NavigationProps = {
  items: NavItem[];
  className?: string;
};

export const Navigation = ({ items, className = '' }: NavigationProps) => {
  const pathname = usePathname();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [currentHash, setCurrentHash] = useState('');

  const handleMouseEnter = (label: string) => {
    setActiveSubmenu(label);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  // Track hash changes
  useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };
    
    // Set initial hash
    updateHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', updateHash);
    
    return () => {
      window.removeEventListener('hashchange', updateHash);
    };
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return currentHash === href;
    }
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <nav className={`hidden md:flex items-center gap-6 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.8 + (index * 0.1),
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
        >
          <Link
            href={item.href}
            target={item.target || '_self'}
            className={`cursor-target font-medium tracking-wider transition ${
              isActive(item.href) ? 'text-white' : 'text-gray hover:text-white'
            }`}
          >
            {item.label}
            {item.submenu && item.submenu.length > 0 && (
              <motion.span 
                className="ml-1"
                animate={{ rotate: activeSubmenu === item.label ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.span>
            )}
          </Link>

          {/* Submenu if available */}
          {item.submenu &&
            item.submenu.length > 0 &&
            activeSubmenu === item.label && (
              <motion.div 
                className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <motion.div
                    key={subItem.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                  >
                    <Link
                      href={subItem.href}
                      className={`block px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        isActive(subItem.href)
                          ? 'text-primary-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
        </motion.div>
      ))}
    </nav>
  );
};
