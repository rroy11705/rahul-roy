'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Blog, Media } from '../../../../payload-types';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const coverImage = blog.coverImage as Media;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blogs/${blog.slug}`}>
        <div>
          <div className="flex items-center gap-2 text-red text-xl uppercase mb-6">
            <span>{formatDate(blog.publishedAt)}</span>
          </div>

          <h3 className="text-4xl font-semibold text-white mb-8 line-clamp-2 transition-colors">
            {blog.title}
          </h3>
        </div>
        <div className="relative aspect-[1280/672] mb-12">
          {coverImage?.url && (
            <Image
              src={coverImage.url}
              alt={coverImage.alt || blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </div>

        <div className="">

          <p className="text-gray-400 text-lg mb-4 line-clamp-3">
            {blog.description}
          </p>

          <div className="w-fit bg-white rounded-lg flex items-center justify-between py-2 px-6">
            <span className="text-black font-medium">
              Read more
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
