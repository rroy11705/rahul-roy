"use client"

import Link from 'next/link'
import React from 'react'
import { AnimatedText } from '../animations/AnimatedText'
import { AnimatedSection } from '../animations/AnimatedSection'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section className="w-full overflow-hidden">
			<div className='w-full h-full px-4 sm:px-6 md:px-10 lg:px-25 py-12 sm:py-20 lg:py-25 flex flex-col'>
				{/* Mobile-first layout: stacked vertically */}
				<div className='w-full flex flex-col lg:flex-row lg:justify-between'>
					<AnimatedText 
						delay={0.2}
						animationType="characters"
						staggerChildren={0.05}
						className='text-gray text-sm sm:text-lg lg:text-2xl mb-8 lg:mb-0 lg:min-w-2xs lg:mt-10'
					>
						I BELIEVE THAT<br />GREAT PRODUCTS<br />ARE MADE
					</AnimatedText>
					<AnimatedSection 
						delay={0.4}
						direction="right"
						distance={50}
						className='w-full font-medium text-white text-responsive-9xl text-center lg:text-right leading-tight -tracking-[0.08em] mb-4 lg:mb-0'
					>
						WHEN STRATEGY
					</AnimatedSection>
				</div>
				
				<AnimatedSection 
					delay={0.6}
					direction="left"
					distance={50}
					className='w-full flex flex-row justify-center lg:justify-end mb-4 lg:mb-0'
				>
					<p className='w-fit font-medium text-white text-responsive-9xl text-center lg:text-right leading-tight -tracking-[0.08em]'>
						+ PRECISION
					</p>
				</AnimatedSection>
				
				<div className='w-full flex flex-col items-center lg:flex-row lg:justify-end'>
					<AnimatedSection 
						delay={0.8}
						direction="up"
						distance={30}
						className='w-fit font-medium text-white text-responsive-9xl text-center lg:text-right leading-tight -tracking-[0.08em] mb-4 lg:mb-0'
					>
						WORKS
					</AnimatedSection>
					<motion.div 
						className='mb-4 lg:mb-0 lg:-ml-4 lg:-mr-8 lg:-mt-4 flex justify-center lg:block'
						initial={{ scale: 0, rotate: 0 }}
						whileInView={{ scale: 1, rotate: 0 }}
						viewport={{ once: true, margin: '-50px' }}
						transition={{ 
							duration: 0.8, 
							delay: 1.0,
							ease: [0.25, 0.46, 0.45, 0.94] 
						}}
					>
						<svg 
							width="120" 
							height="120" 
							className="sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px]"
							xmlns="http://www.w3.org/2000/svg" 
							viewBox="0 0 500 500"
						>
							<g>
								<g>
									<rect x="202.843" y="339.947" style={{ fill: '#FFFFFF' }} width="122.157" height="45.529"/>
									<rect x="175" y="339.947" style={{ fill: '#6C6C6C' }} width="27.843" height="45.529"/>
									<rect x="182.95" y="299.899" style={{ fill: '#FFFFFF' }} width="133.277" height="34.786"/>
									<rect x="182.959" y="299.899" style={{ fill: '#6C6C6C' }} width="46.326" height="34.786"/>
								</g>
								<path style={{ fill: '#FFFFFF' }} d="M214.627,294.646c0,0-18.763-22.139-17.332-31.296c1.76-11.267,49.999-66.548,49.999-66.548
									c-12.83-8.554-51.174,22.887-51.174,22.887s-21.001-17.957-18.272-19.29c9.236-5.005,3.256-3.985-0.346-6.766
									c3.245-15.14,14.442-12.786,40.568-49.999c11.264-16.045,4.758-16.249,4.758-16.249l1.769-12.861
									c10.344,12.643,83.146,34.762,88.893,91.08c5.747,56.318-26.453,89.041-26.453,89.041H214.627z"/>
								<path style={{ fill: '#6C6C6C' }} d="M216.038,205.562c-10.818,6.664-19.919,14.127-19.919,14.127s-21.001-17.957-18.271-19.29
									c9.236-5.006,3.256-3.985-0.346-6.766c2.722-12.699,11.037-13.091,29.063-34.843l0,0
									C196.058,179.804,216.038,205.562,216.038,205.562z"/>
								<path style={{ fill: '#6C6C6C' }} d="M220.978,228.34c-7.005,24.224,38.652,66.306,38.652,66.306h-45.004c0,0-18.94-22.169-17.332-31.296
									C198.65,255.656,220.978,228.34,220.978,228.34z"/>
							</g>
						</svg>
					</motion.div>
					<AnimatedSection 
						delay={1.2}
						direction="right"
						distance={50}
						className='w-fit font-medium text-white text-responsive-9xl text-center lg:text-right leading-tight -tracking-[0.08em]'
					>
						TOGETHER
					</AnimatedSection>
				</div>
				
				<AnimatedSection 
					delay={1.4}
					direction="up"
					distance={20}
					className='w-full flex flex-row justify-center py-8 sm:py-12 lg:py-15 mt-8 lg:mt-0'
				>
					<Link href="/about-me" className='cursor-target text-white text-lg sm:text-xl lg:text-3xl tracking-wider'>
						[→ Know more about me]
					</Link>
				</AnimatedSection>
			</div>
    </section>
  )
}

export default About