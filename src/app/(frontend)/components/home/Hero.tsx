"use client"

import React from 'react'
import TextPressure from '../animations/TextPressure'

const Hero = () => {
  return (
    <section className='w-full min-h-screen'>
			<div className='w-full h-full min-h-screen px-6 md:px-25 py-25 flex flex-col justify-between'>
				<div>
					<h4 className='font-medium text-white text-3xl'>Hi, I&apos;m</h4>
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
				<div className='w-full max-w-xl'>
					<h4 className='font-medium text-white text-3xl tracking-tight'>
						I&apos;m a Senior Software Developer,
					</h4>
					<p className='font-medium text-white text-3xl tracking-tight'>
						passionate about solving real-world problems through clean and efficient code.
					</p>
				</div>
			</div>
    </section>
  )
}

export default Hero