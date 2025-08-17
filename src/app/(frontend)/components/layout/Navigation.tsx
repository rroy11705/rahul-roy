'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
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
      {items.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={item.href}
            className={`cursor-target font-medium tracking-wider transition ${
              isActive(item.href) ? 'text-white' : 'text-gray hover:text-white'
            }`}
          >
            {item.label}
            {item.submenu && item.submenu.length > 0 && (
              <span className="ml-1">▼</span>
            )}
          </Link>

          {/* Submenu if available */}
          {item.submenu &&
            item.submenu.length > 0 &&
            activeSubmenu === item.label && (
              <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                      isActive(subItem.href)
                        ? 'text-primary-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
        </div>
      ))}
    </nav>
  );
};
