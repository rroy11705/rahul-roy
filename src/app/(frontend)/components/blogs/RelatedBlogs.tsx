'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Blog } from '../../../../payload-types';
import BlogCard from './BlogCard';

interface RelatedBlogsProps {
  currentBlogId: string;
  tags: { tag: string; id?: string | null }[] | null | undefined;
}

export default function RelatedBlogs({ currentBlogId, tags }: RelatedBlogsProps) {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        setLoading(true);

        if (!tags || tags.length === 0) {
          // If no tags, get popular blogs excluding current one
          const response = await fetch(
            `/api/blogs?limit=3&sort=-views&where[status][equals]=published&where[id][not_equals]=${currentBlogId}`
          );

          if (response.ok) {
            const data = await response.json();
            setRelatedBlogs(data.docs);
          }
          return;
        }

        // Build query for blogs with matching tags
        const tagValues = tags.map(t => t.tag);
        const tagQuery = tagValues.map(tag => `tags.tag[in][]=${encodeURIComponent(tag)}`).join('&');

        const response = await fetch(
          `/api/blogs?limit=6&sort=-views&where[status][equals]=published&where[id][not_equals]=${currentBlogId}&${tagQuery}`
        );

        if (response.ok) {
          const data = await response.json();

          // If we have matching blogs, take first 3
          if (data.docs.length >= 3) {
            setRelatedBlogs(data.docs.slice(0, 3));
          } else {
            // If not enough matching blogs, fill with popular ones
            const fallbackResponse = await fetch(
              `/api/blogs?limit=${3 - data.docs.length}&sort=-views&where[status][equals]=published&where[id][not_equals]=${currentBlogId}`
            );

            if (fallbackResponse.ok) {
              const fallbackData = await fallbackResponse.json();
              setRelatedBlogs([...data.docs, ...fallbackData.docs]);
            } else {
              setRelatedBlogs(data.docs);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch related blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedBlogs();
  }, [currentBlogId, tags]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto"></div>
        <p className="text-gray-300 mt-4">Loading related blogs...</p>
      </div>
    );
  }

  if (relatedBlogs.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-16"
    >
      <div className="text-left mb-12">
        <h2 className="font-display text-2xl md:text-5xl font-extrabold text-white mb-4 underline underline-offset-8">
          More Articles
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {relatedBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
