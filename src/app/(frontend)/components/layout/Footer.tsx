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
			<div className='w-full bg-white py-12 sm:py-20 lg:py-25 px-4 sm:px-6 md:px-10 lg:px-25 flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0'>
				<motion.p 
					className='text-black text-xl sm:text-2xl lg:text-3xl tracking-wider'
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
						className='!flex'
						items={[
							{ label: '[LINKEDIN]', href: 'https://www.linkedin.com/in/rahulroy99/', target: "_blank" },
							{ label: '[GITHUB]', href: 'https://github.com/rroy11705', target: "_blank" },
							{ label: '[RESUME]', href: '/files/RAHUL_ROY_SOFTWARE_DEVELOPER.pdf', target: "_blank" },
						]}
					/>
				</motion.div>
				<p className='text-black md:text-white text-xl sm:text-2xl lg:text-3xl tracking-wider'>© 2025</p>
			</div>
			<AnimatedSection 
				delay={0.5}
				direction="up"
				distance={30}
				className='fixed bottom-6 sm:bottom-12 lg:bottom-25 right-4 sm:right-6 lg:right-25 mix-blend-difference flex flex-col gap-2 items-end z-50'
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
					className='cursor-target text-white text-lg sm:text-xl lg:text-3xl tracking-wider bg-transparent border-none p-0 font-inherit min-h-[44px] flex items-center'
				>
					[Let&apos;s Talk →]
				</motion.button>
				<motion.p 
					className='hidden md:block text-white text-lg sm:text-xl lg:text-3xl tracking-wider'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.8 }}
				>
					© {new Date().getFullYear()}
				</motion.p>
				<motion.p 
					className='md:hidden text-white text-lg sm:text-xl lg:text-3xl tracking-wider'
					initial={{ opacity: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.8 }}
					animate={{
						opacity: isInContact ? 0 : 1,
						pointerEvents: isInContact ? 'none' : 'auto'
					}}
				>
					© {new Date().getFullYear()}
				</motion.p>
			</AnimatedSection>
    </motion.footer>
  )
}

export default Footer