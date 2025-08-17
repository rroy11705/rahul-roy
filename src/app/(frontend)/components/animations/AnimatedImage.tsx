'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  delay?: number;
  duration?: number;
  scale?: number;
  blur?: boolean;
  priority?: boolean;
}

export const AnimatedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className = '',
  delay = 0,
  duration = 0.8,
  scale = 1.05,
  blur = true,
  priority = false,
}: AnimatedImageProps) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        scale: scale,
        filter: blur ? 'blur(10px)' : 'blur(0px)',
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true, sizes } : { width, height })}
        priority={priority}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};