"use client"

import Link from 'next/link'
import React from 'react'
import { AnimatedSection } from '../animations/AnimatedSection'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className='w-full flex justify-center items-center'>
			<AnimatedSection 
				delay={0.5}
				direction="up"
				distance={30}
				className='fixed bottom-25 right-6 md:right-25 mix-blend-difference flex flex-col gap-2 items-end'
			>
				<motion.div
					whileHover={{
						scale: 1.05,
						transition: { duration: 0.2 },
					}}
				>
					<Link href="/" className='cursor-target text-white text-3xl tracking-wider'>
						[Let&apos;s Talk →]
					</Link>
				</motion.div>
				<motion.p 
					className='text-white text-3xl tracking-wider'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					© {new Date().getFullYear()}
				</motion.p>
			</AnimatedSection>
    </footer>
  )
}

export default Footer