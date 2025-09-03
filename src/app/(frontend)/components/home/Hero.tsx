"use client"

import React from 'react'
import TextPressure from '../animations/TextPressure'
import { AnimatedText } from '../animations/AnimatedText'
import { AnimatedSection } from '../animations/AnimatedSection'

const Hero = () => {
  return (
    <section className='w-full md:min-h-screen overflow-hidden'>
			<div className='w-full h-full md:min-h-screen px-4 sm:px-6 md:px-10 lg:px-25 py-8 sm:py-15 lg:py-25 flex flex-col justify-between'>
				<div className='mt-8 sm:mt-0'>
					<AnimatedText 
						delay={0.2} 
						className='font-medium text-white text-responsive-3xl mb-4'
					>
						Hi, I&apos;m
					</AnimatedText>
					<div className='relative w-full mb-8 sm:mb-0'>
						<TextPressure
							text="Rahul"
							flex={true}
							alpha={false}
							stroke={false}
							width={true}
							weight={true}
							italic={true}
							minFontSize={28}
						/>
					</div>
				</div>
				<AnimatedSection 
					delay={0.6} 
					direction="up" 
					distance={30}
					className='w-full max-w-sm sm:max-w-lg lg:max-w-xl'
				>
					<h4 className='font-medium text-white text-responsive-3xl tracking-tight mb-2 sm:mb-4'>
						I&apos;m a Senior Software Developer,
					</h4>
					<p className='font-medium text-white text-responsive-3xl tracking-tight'>
						passionate about solving real-world problems through clean and efficient code.
					</p>
				</AnimatedSection>
			</div>
    </section>
  )
}

export default Hero