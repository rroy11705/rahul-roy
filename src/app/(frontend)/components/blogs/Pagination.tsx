'use client';

import { motion } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 3) {
        pages.push('...');
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous button */}
      <motion.button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-all duration-300 ${
          currentPage === 1
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-white hover:bg-white/10'
        }`}
        whileHover={currentPage > 1 ? { scale: 1.1 } : {}}
        whileTap={currentPage > 1 ? { scale: 0.9 } : {}}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => (
          <motion.div key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-1 rounded-full font-medium transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-red text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {page}
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Next button */}
      <motion.button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-all duration-300 ${
          currentPage === totalPages
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-white hover:bg-white/10'
        }`}
        whileHover={currentPage < totalPages ? { scale: 1.1 } : {}}
        whileTap={currentPage < totalPages ? { scale: 0.9 } : {}}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
}
