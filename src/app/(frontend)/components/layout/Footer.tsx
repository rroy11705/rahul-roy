"use client"

import React, { useState } from 'react'
import { AnimatedSection } from '../animations/AnimatedSection'
import { motion, useAnimation } from 'framer-motion'
import { scrollToContact } from '@/lib/scrollUtils'
import { useContactVisibility } from '@/hooks/useContactVisibility'
import { Navigation } from './Navigation'

const Footer = () => {
  const [isAnimating, setIsAnimating] = useState(false)
  const controls = useAnimation()
  const isInContact = useContactVisibility()

  const handleScrollToContact = async () => {
    if (isAnimating) return
    
    setIsAnimating(true)
    
    // Start the scale-up and fade-out animation
    controls.start({
      scale: 1.8,
      opacity: 0,
      y: -20,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    })
    
    // Start scrolling after a short delay
    setTimeout(() => {
      scrollToContact()
      
      // Reset animation state after scroll completes
      setTimeout(() => {
        controls.set({ scale: 1, opacity: 1, y: 0 })
        setIsAnimating(false)
      }, 1200)
    }, 300)
  }

  return (
    <motion.footer 
      className='w-full flex justify-center items-center'
    >
			<div className='w-full bg-white py-25 px-4 md:px-25 flex flex-col md:flex-row justify-between'>
				<motion.p 
					className='text-black text-3xl tracking-wider'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					RAHUL ROY
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className='mix-blend-difference'
				>
					<Navigation
						items={[
							{ label: '[LINKEDIN]', href: 'https://www.linkedin.com/in/rahulroy99/' },
							{ label: '[GITHUB]', href: 'https://github.com/rroy11705' },
							{ label: '[RESUME]', href: '/portfolio' },
						]}
					/>
				</motion.div>
				<p className='text-white text-3xl tracking-wider'>@ 2025</p>
			</div>
			<AnimatedSection 
				delay={0.5}
				direction="up"
				distance={30}
				className='fixed bottom-25 right-6 md:right-25 mix-blend-difference flex flex-col gap-2 items-end'
			>
				<motion.button
					whileHover={!isAnimating ? {
						scale: 1.05,
						transition: { duration: 0.2 },
					} : {}}
					onClick={handleScrollToContact}
					disabled={isAnimating || isInContact}
					animate={{
						opacity: isInContact ? 0 : 1,
						pointerEvents: isInContact ? 'none' : 'auto'
					}}
					transition={{
						duration: 0.3,
						ease: [0.25, 0.46, 0.45, 0.94]
					}}
					className='cursor-target text-white text-3xl tracking-wider bg-transparent border-none p-0 font-inherit'
				>
					[Let&apos;s Talk →]
				</motion.button>
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
    </motion.footer>
  )
}

export default Footer