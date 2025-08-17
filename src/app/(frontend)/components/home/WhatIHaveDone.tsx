"use client"

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

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
				className='relative w-full h-[calc(100%_-_2rem)] md:h-[calc(100%_-_10rem)]'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: index * 0.2 }}
			>
				{isVideo ? (
					<video
						ref={videoRef}
						className="w-full h-full object-cover"
						muted
						loop
						playsInline
						preload="metadata"
					>
						<source src={project.asset} type="video/mp4" />
					</video>
				) : (
					<Image
						src={project.asset}
						alt={project.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
					/>
				)}
			</motion.div>
			<div className="flex items-end mt-10">
				<div className="text-left text-white">
					<h4 className="font-display text-xl md:text-3xl font-semibold mb-2">{project.title}</h4>
					<p className="text-sm md:text-base opacity-80">{project.description}</p>
				</div>
			</div>
		</div>
	);
};

const WhatIHaveDone = () => {
	return (
		<section className='w-full bg-dark'>
			<div className='w-full h-full px-6 md:px-25 py-25 flex flex-col'>
				<div className='w-full flex flex-row justify-between'>
					<h4 className='w-fit text-gray text-2xl mt-10 uppercase'>
						What I&apos;VE DONE
					</h4>
					<h3 className='w-fit font-medium text-white text-9xl text-right leading-tight tracking-tighter uppercase'>
						A selection
					</h3>
				</div>
				<div className='w-full flex flex-row justify-end mb-20'>
					<h3 className='w-fit font-medium text-white text-9xl text-right leading-tight tracking-tighter uppercase'>
						of my works
					</h3>
				</div>
				
				{/* Projects Grid - Positioned by Resolution */}
				<div className='w-full min-h-[600px] md:min-h-[900px] grid grid-cols-4 md:grid-cols-10 grid-rows-6 md:grid-rows-8 gap-4 md:gap-20'>
					{/* Sconto.ai - Portrait (1280x2279) - Tall left column */}
					<ProjectCard 
						project={Projects[1]} 
						index={1}
						className="col-span-2 md:col-span-3 row-span-3 md:row-span-4"
					/>
					<div className='col-span-1' />
					
					{/* CreditLink - Landscape (640x360) - Wide top section */}
					<ProjectCard 
						project={Projects[0]} 
						index={0}
						className="col-span-4 md:col-span-6 row-span-2 md:row-span-4"
					/>
					
					{/* Creative Confluence - Landscape (640x360) - Wide bottom right */}
					<ProjectCard 
						project={Projects[2]} 
						index={2}
						className="col-span-2 md:col-span-6 row-span-2 md:row-span-4"
					/>
					
					{/* Trymblink - Square (480x480) - Square middle section */}
					<ProjectCard 
						project={Projects[3]} 
						index={3}
						className="col-span-2 md:col-span-4 row-span-1 md:row-span-4"
					/>
				</div>
			</div>
		</section>
	)
}

export default WhatIHaveDone