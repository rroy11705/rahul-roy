"use client"

import React from 'react'
import TextPressure from '../animations/TextPressure'
import { AnimatedText } from '../animations/AnimatedText'
import { AnimatedSection } from '../animations/AnimatedSection'

const Hero = () => {
  return (
    <section className='w-full min-h-screen'>
			<div className='w-full h-full min-h-screen px-6 md:px-25 py-25 flex flex-col justify-between'>
				<div>
					<AnimatedText 
						delay={0.2} 
						className='font-medium text-white text-3xl'
					>
						Hi, I&apos;m
					</AnimatedText>
					<div className='relative w-full'>
						<TextPressure
							text="Rahul"
							flex={true}
							alpha={false}
							stroke={false}
							width={true}
							weight={true}
							italic={true}
							minFontSize={36}
						/>
					</div>
				</div>
				<AnimatedSection 
					delay={0.6} 
					direction="up" 
					distance={30}
					className='w-full max-w-xl'
				>
					<h4 className='font-medium text-white text-3xl tracking-tight'>
						I&apos;m a Senior Software Developer,
					</h4>
					<p className='font-medium text-white text-3xl tracking-tight'>
						passionate about solving real-world problems through clean and efficient code.
					</p>
				</AnimatedSection>
			</div>
    </section>
  )
}

export default Hero