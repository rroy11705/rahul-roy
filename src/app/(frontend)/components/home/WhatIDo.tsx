"use client"

import React from 'react'
import { AnimatedText } from '../animations/AnimatedText'
import { AnimatedSection } from '../animations/AnimatedSection'
import { motion } from 'framer-motion'

const Transformations = [
	{
		color: 'text-blue',
		title: "Strategic Development",
		description: "Align technical decisions with business objectives.",
	},
	{
		color: 'text-green',
		title: "Scalable Architecture",
		description: "Design systems that grow with your success.",
	},
	{
		color: 'text-red',
		title: "Quality Assurance",
		description: "Deliver code that works reliably, performs efficiently.",
	},
	{
		color: 'text-yellow',
		title: "Reliable Delivery",
		description: "Establish standards that ensure maintainable, scalable code.",
	},
];

const WhatIDo = () => {
  return (
    <section className='w-full'>
			<div className='w-full h-full px-4 sm:px-6 md:px-10 lg:px-25 py-12 sm:py-20 lg:py-25 flex flex-col'>
				<div className='w-full flex flex-col lg:flex-row lg:justify-between mb-8 lg:mb-10'>
					<AnimatedText 
						delay={0.2}
						className='w-fit text-gray text-sm sm:text-lg lg:text-2xl mb-4 lg:mb-0 lg:mt-8 uppercase'
					>
						What I DO
					</AnimatedText>
					<AnimatedSection 
						delay={0.4}
						direction="left"
						distance={50}
						className='w-fit font-medium text-white text-responsive-9xl text-center lg:text-right leading-tight -tracking-[0.08em] uppercase'
					>
						Transformation
					</AnimatedSection>
				</div>
				<AnimatedSection 
					delay={0.6}
					direction="up"
					distance={30}
					className='w-full flex flex-row justify-center lg:justify-end mb-8 lg:mb-0'
				>
					<p className='w-full max-w-sm sm:max-w-lg lg:max-w-2xl font-medium text-white text-lg sm:text-xl lg:text-3xl text-center lg:text-right leading-tight'>
						Whether you&apos;re scaling an existing system or building from scratch, I bring clarity to complexity and turn your vision into reality.
					</p>
				</AnimatedSection>
				<div className='w-full flex flex-col gap-6 lg:gap-12 mt-8 lg:mt-12'>
					{Transformations.map((transformation, index) => (
						<motion.div 
							key={index}
							className='w-full bg-white p-4 sm:p-6 lg:p-12 flex flex-col lg:flex-row'
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-100px' }}
							transition={{
								duration: 0.8,
								delay: 0.8 + (index * 0.2),
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
							whileHover={{
								scale: 1.02,
								transition: { duration: 0.3 },
							}}
						>
							<motion.h3 
								className={`w-full lg:w-xs font-medium text-responsive-9xl leading-tight tracking-tighter uppercase text-center lg:text-left mb-4 lg:mb-0 ${transformation.color ?? 'text-dark'}`}
								initial={{ scale: 0.8, opacity: 0 }}
								whileInView={{ scale: 1, opacity: 1 }}
								viewport={{ once: true }}
								transition={{
									duration: 0.6,
									delay: 1.0 + (index * 0.2),
									ease: [0.25, 0.46, 0.45, 0.94],
								}}
							>
								0{index + 1}.
							</motion.h3>
							<div className='h-full flex flex-col gap-6 lg:gap-12 text-center lg:text-left'>
								<motion.h5 
									className='text-gray text-sm sm:text-base lg:text-xl'
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{
										duration: 0.6,
										delay: 1.2 + (index * 0.2),
									}}
								>
									Transformation {index + 1}
								</motion.h5>
								<div className='flex flex-col gap-2 lg:gap-4'>
									<motion.h3 
										className='font-semibold text-dark text-responsive-6xl tracking-wider'
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.6,
											delay: 1.4 + (index * 0.2),
										}}
									>
										{transformation.title}
									</motion.h3>
									<motion.p 
										className='text-dark/60 text-responsive-3xl tracking-wider'
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.6,
											delay: 1.6 + (index * 0.2),
										}}
									>
										{transformation.description}
									</motion.p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
  )
}

export default WhatIDo