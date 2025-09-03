"use client"

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedText } from '../animations/AnimatedText'
import { AnimatedSection } from '../animations/AnimatedSection'
import { AnimatedImage } from '../animations/AnimatedImage'

type Project = {
	id: string;
	title: string;
	description: string;
	asset: string;
	assetType: 'image' | 'video';
	resolution: string;
};

const Projects: Project[] = [
	{
		id: '1',
		title: "CreditLink",
		description: "Revolutionizing property management in the USA with a comprehensive platform for tenant screening, lease creation, and maintenance management.",
		assetType: 'video' as const,
		asset: '/videos/projects/creditlink.mp4',
		resolution: '640X360',
	},
	{
		id: '2',
		title: "Sconto.ai",
		description: "Crafted seamless user experiences across kolkata for a student lifestyle platform.",
		assetType: 'image' as const,
		asset: '/images/projects/sconto.jpg',
		resolution: '1280X2279',
	},
	{
		id: '3',
		title: "Creative Confluence",
		description: "Marketing agency, showcasing their creative work through an intuitive, visually striking interface that converts visitors into clients.",
		assetType: 'video' as const,
		asset: '/videos/projects/creative-confluence.mp4',
		resolution: '640X360',
	},
	{
		id: '4',
		title: "Trymblink",
		description: "Digital product development and consulting company.",
		assetType: 'video' as const,
		asset: '/videos/projects/trymblink.mp4',
		resolution: '480X480',
	},
];


const ProjectCard = ({ project, index, className = "" }: { project: Project; index: number; className?: string }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const isVideo = project.assetType === 'video';
	
	useEffect(() => {
		if (!isVideo) return;
		
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && videoRef.current) {
					videoRef.current.play().catch(() => {});
				} else if (videoRef.current) {
					videoRef.current.pause();
				}
			},
			{ threshold: 0.3 }
		);

		const currentRef = videoRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, [isVideo]);

	return (
		<div className={`relative overflow-hidden cursor-pointer ${className}`}>
			<motion.div
				className='relative w-full h-[calc(100%_-_3rem)] sm:h-[calc(100%_-_4rem)] lg:h-[calc(100%_-_10rem)]'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: index * 0.2 }}
			>
				{isVideo ? (
					<video
						ref={videoRef}
						className="w-full h-full object-cover rounded-sm"
						muted
						loop
						playsInline
						preload="metadata"
					>
						<source src={project.asset} type="video/mp4" />
					</video>
				) : (
					<AnimatedImage
						src={project.asset}
						alt={project.title}
						fill={true}
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
						className="absolute inset-0 rounded-sm"
						delay={index * 0.1}
						duration={0.8}
						scale={1.1}
						blur={true}
					/>
				)}
			</motion.div>
			<motion.div 
				className="flex items-end mt-4 lg:mt-10"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{
					duration: 0.6,
					delay: 0.3 + (index * 0.1),
					ease: [0.25, 0.46, 0.45, 0.94],
				}}
			>
				<div className="text-left text-white">
					<motion.h4 
						className="font-display text-lg sm:text-xl lg:text-3xl font-semibold mb-1 sm:mb-2"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: 0.5 + (index * 0.1),
						}}
					>
						{project.title}
					</motion.h4>
					<motion.p 
						className="text-white text-sm sm:text-base lg:text-base opacity-80 leading-relaxed"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{
							duration: 0.6,
							delay: 0.7 + (index * 0.1),
						}}
					>
						{project.description}
					</motion.p>
				</div>
			</motion.div>
		</div>
	);
};

const WhatIHaveDone = () => {
	return (
		<section className='w-full bg-dark'>
			<div className='w-full h-full px-4 sm:px-6 md:px-10 lg:px-25 py-12 sm:py-20 lg:py-25 flex flex-col'>
				<div className='w-full flex flex-col lg:flex-row lg:justify-between'>
					<AnimatedText 
						delay={0.2}
						className='w-fit text-gray text-sm sm:text-lg lg:text-2xl mb-4 lg:mb-0 lg:mt-10 uppercase'
					>
						What I&apos;VE DONE
					</AnimatedText>
					<AnimatedSection 
						delay={0.4}
						direction="left"
						distance={50}
						className='w-fit font-medium text-white text-responsive-9xl text-center lg:text-right leading-tight tracking-tighter uppercase'
					>
						A selection
					</AnimatedSection>
				</div>
				<AnimatedSection 
					delay={0.6}
					direction="right"
					distance={50}
					className='w-full flex flex-row justify-center lg:justify-end mb-12 sm:mb-16 lg:mb-20'
				>
					<h3 className='w-fit font-medium text-white text-responsive-9xl text-center lg:text-right leading-tight tracking-tighter uppercase'>
						of my works
					</h3>
				</AnimatedSection>
				
				{/* Mobile: Simple stacked layout, Desktop: Complex grid */}
				<div className='w-full'>
					{/* Mobile Layout - Stacked Cards */}
					<div className='block lg:hidden space-y-8'>
						{Projects.map((project, index) => (
							<ProjectCard 
								key={project.id}
								project={project} 
								index={index}
								className="w-full aspect-[4/3]"
							/>
						))}
					</div>
					
					{/* Desktop Layout - Complex Grid */}
					<div className='hidden lg:grid w-full min-h-[900px] grid-cols-10 grid-rows-8 gap-6'>
						{/* Sconto.ai - Portrait (1280x2279) - Tall left column */}
						<ProjectCard 
							project={Projects[1]} 
							index={1}
							className="col-span-3 row-span-4"
						/>
						
						{/* CreditLink - Landscape (640x360) - Wide top section */}
						<ProjectCard 
							project={Projects[0]} 
							index={0}
							className="col-span-7 row-span-4"
						/>
						
						{/* Creative Confluence & Trymblink - Bottom row */}
						<ProjectCard 
							project={Projects[2]} 
							index={2}
							className="col-span-6 row-span-4"
						/>
						
						<ProjectCard 
							project={Projects[3]} 
							index={3}
							className="col-span-4 row-span-4"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}

export default WhatIHaveDone