'use client';

import { motion } from 'framer-motion';

type SortOption = 'latest' | 'popular' | 'oldest';

interface BlogFiltersProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string; description: string }[] = [
  { value: 'latest', label: 'Latest', description: 'Most recently published' },
  { value: 'popular', label: 'Popular', description: 'Most viewed posts' },
  { value: 'oldest', label: 'Oldest', description: 'Earliest published' },
];

export default function BlogFilters({ currentSort, onSortChange }: BlogFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`px-5 py-2 rounded-full transition-all duration-300 text-white ${
              currentSort === option.value
                ? 'bg-red'
                : 'bg-[#323232]'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
