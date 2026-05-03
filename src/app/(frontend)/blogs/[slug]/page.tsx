'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Blog, Media } from '../../../../payload-types';
import BlogCarousel from '../../components/blogs/BlogCarousel';
import RelatedBlogs from '../../components/blogs/RelatedBlogs';
import BlogContent from '../../components/blogs/BlogContent';
import Breadcrumbs from '../../components/blogs/Breadcrumbs';
import Footer from '../../components/layout/Footer';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/blogs?where[slug][equals]=${slug}&where[status][equals]=published&limit=1`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }

        const data = await response.json();

        if (data.docs.length === 0) {
          throw new Error('Blog not found');
        }

        const blogData = data.docs[0];
        setBlog(blogData);

        // Increment view count
        await fetch(`/api/blogs/${blogData.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            views: (blogData.views || 0) + 1,
          }),
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-dark flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
        <p className="text-gray-300 mb-8">{error || 'The blog you are looking for does not exist.'}</p>
        <Link
          href="/blogs"
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors"
        >
          &larr; Back to Blogs
        </Link>
      </div>
    );
  }

  const coverImage = blog.coverImage as Media;
  const contentImages = blog.contentImages as Media[];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="bg-dark overflow-x-hidden">
      <div className="mx-auto pt-18">
        <div className="absolute top-20 left-6 md:left-25 z-20">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blogs', href: '/blogs' },
              { label: blog?.title || 'Loading...', href: undefined }
            ]}
          />
        </div>

        {/* Cover image */}
        {coverImage?.url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-[1280/672] overflow-hidden"
          >
            <Image
              src={coverImage.url}
              alt={coverImage.alt || blog.title}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className='absolute w-full h-80 gradient-blog-cover z-10' />
          </motion.div>
        )}

        {/* Blog content */}
        <div className="py-16 px-6 md:px-25">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left mb-12"
          >
            <div className="flex flex-wrap justify-start items-center gap-4 text-red text-xl uppercase mb-6">
              <span>{formatDate(blog.publishedAt)}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              {blog.title}
            </h1>
          </motion.div>

          <div className='flex flex-col-reverse md:flex-row gap-12'>
            {/* Content images carousel */}
            {contentImages && contentImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full md:max-w-125"
              >
                <BlogCarousel images={contentImages} />
              </motion.div>
            )}
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <BlogContent content={blog.content} />
            </motion.div>
          </div>

          {/* Related blogs */}
          <RelatedBlogs currentBlogId={blog.id} tags={blog.tags} />
        </div>
      </div>
      <Footer />
    </section>
  );
}
