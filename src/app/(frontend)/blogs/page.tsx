'use client';

import { Suspense } from 'react';
import BlogsList from '../components/blogs/BlogsList';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AnimatedSection } from '../components/animations/AnimatedSection';
import { AnimatedText } from '../components/animations/AnimatedText';
import Footer from '../components/layout/Footer';

export default function BlogsPage() {
  return (
    <section className="bg-dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full aspect-[9/14] md:aspect-[1280/672] overflow-hidden"
      >
        <Image
          src="/images/blogs-hero.jpg"
          alt="Blogs Hero"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
        <div className='absolute w-full h-80 gradient-blog-cover z-10' />
        <AnimatedSection delay={0.2} className='absolute w-full z-10 top-1/2 left-1/2 -translate-1/2'>
          <h2 className='text-white font-display font-extrabold text-5xl md:text-7xl leading-[150%] -tracking-[0.025em] text-center mb-8'>
            <AnimatedText animationType="words" delay={0.5} staggerChildren={0.08}>
              think. write. create.
            </AnimatedText>
          </h2>
          <p className='text-white font-semibold md:text-xl leading-[150%] -tracking-[0.025em] text-center'>
            <AnimatedText animationType="words" delay={0.8} staggerChildren={0.08}>
              Thoughts on code, architecture, and building things.
            </AnimatedText>
          </p>
        </AnimatedSection>
      </motion.div>
      <div className="mx-auto px-6 md:px-25 py-30">
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-400"></div>
          </div>
        }>
          <BlogsList />
        </Suspense>
      </div>
      <Footer />
    </section>
  );
}
