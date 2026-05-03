'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center space-x-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <svg
              className="w-4 h-4 text-gray-400 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}

          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-400 hover:text-gray-300 transition-colors hover:underline underline-offset-4 max-w-20 md:max-w-xs text-xs md:text-lg truncate"
              title={item.label}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-gray-300 max-w-50 md:max-w-xs italic text-xs md:text-lg truncate"
              title={item.label}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </motion.nav>
  );
}
