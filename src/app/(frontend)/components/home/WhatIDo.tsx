import React from 'react'

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
			<div className='w-full h-full px-6 md:px-25 py-25 flex flex-col'>
				<div className='w-full flex flex-row justify-between mb-10'>
					<h4 className='w-fit text-gray text-2xl mt-8 uppercase'>
						What I DO
					</h4>
					<h3 className='w-fit font-medium text-white text-9xl text-right leading-tight -tracking-[0.08em] uppercase'>
						Transformation
					</h3>
				</div>
				<div className='w-full flex flex-row justify-end'>
					<p className='w-full max-w-2xl font-medium text-white text-3xl text-right leading-tight'>
						Whether you&apos;re scaling an existing system or building from scratch, I bring clarity to complexity and turn your vision into reality.
					</p>
				</div>
				<div className='w-full flex flex-col gap-12 mt-12'>
					{Transformations.map((transformation, index) => (
						<div 
							key={index}
							className='w-full bg-white p-12 flex flex-row'
						>
							<h3 className={`w-xs font-medium text-9xl leading-tight tracking-tighter uppercase ${transformation.color ?? 'text-dark'}`}>
								0{index + 1}.
							</h3>
							<div className=' h-full flex flex-col gap-12'>
								<h5 className='text-gray text-xl'>
									Transformation {index + 1}
								</h5>
								<div className='flex flex-col gap-4'>
									<h3 className='font-semibold text-dark text-6xl tracking-wider'>
										{transformation.title}
									</h3>
									<p className='text-dark/60 text-3xl tracking-wider'>
										{transformation.description}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
  )
}

export default WhatIDo