import Link from 'next/link'
import React from 'react'

const About = () => {
  return (
    <section className="w-full">
			<div className='w-full h-full px-6 md:px-25 py-25 flex flex-col'>
				<div className='w-full flex flex-row justify-between'>
					<h4 className='min-w-2xs text-gray text-2xl mt-10'>
						I BELIEVE THAT<br />GREAT PRODUCTS<br />ARE MADE
					</h4>
					<p className='w-full font-medium text-white text-9xl text-right leading-tight -tracking-[0.08em]'>
						WHEN STRATEGY
					</p>
				</div>
				<div className='w-full flex flex-row justify-end'>
					<p className='w-fit font-medium text-white text-9xl text-right leading-tight -tracking-[0.08em]'>
						+ PRECISION
					</p>
				</div>
				<div className='w-full flex flex-row justify-end'>
					<p className='w-fit font-medium text-white text-9xl text-right leading-tight -tracking-[0.08em]'>
						WORKS
					</p>
					<div className='-ml-4 -mr-8 -mt-4'>
						<svg width={180} height={180} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
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
					</div>
					<p className='w-fit font-medium text-white text-9xl text-right leading-tight -tracking-[0.08em]'>
						TOGETHER
					</p>
				</div>
				<div className='w-full flex flex-row justify-center py-15'>
					<Link href="/about-me" className='cursor-target text-white text-3xl tracking-wider'>
						[→ Know more about me]
					</Link>
				</div>
			</div>
    </section>
  )
}

export default About