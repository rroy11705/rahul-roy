'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  animationType?: 'words' | 'characters' | 'lines';
}

export const AnimatedText = ({
  children,
  className = '',
  delay = 0,
  staggerChildren = 0.02,
  animationType = 'words',
}: AnimatedTextProps) => {

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  if (animationType === 'characters') {
    return (
      <motion.span
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {children}
      </motion.span>
    );
  }

  if (animationType === 'words') {
    return (
      <motion.span
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};