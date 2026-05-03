'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Blog } from '../../../../payload-types';
import BlogCard from './BlogCard';
import BlogFilters from './BlogFilters';
import Pagination from './Pagination';

type SortOption = 'latest' | 'popular' | 'oldest';

interface BlogsResponse {
  docs: Blog[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export default function BlogsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentSort = (searchParams.get('sort') || 'latest') as SortOption;

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset to page 1 when changing sort
    if (key === 'sort') {
      params.set('page', '1');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const sortQuery = currentSort === 'latest' ? '-publishedAt'
                       : currentSort === 'popular' ? '-views'
                       : 'publishedAt'; // oldest

      const response = await fetch(
        `/api/blogs?page=${currentPage}&limit=5&sort=${sortQuery}&where[status][equals]=published`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data: BlogsResponse = await response.json();
      setBlogs(data.docs);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentSort]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleSortChange = (sort: SortOption) => {
    updateSearchParams('sort', sort);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams('page', page.toString());
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-20">
      <BlogFilters currentSort={currentSort} onSortChange={handleSortChange} />

      {blogs.length === 0 ? (
        <div className="text-center text-gray-300 text-xl">
          No blogs found. Check back soon!
        </div>
      ) : (
        <>
          <div className="grid gap-30 md:grid-cols-1">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
        </>
      )}
    </div>
  );
}
