import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full flex justify-center items-center'>
			<div 
				className='fixed bottom-25 right-6 md:right-25 mix-blend-difference flex flex-col gap-2 items-end'
			>
				<Link href="/" className='cursor-target text-white text-3xl tracking-wider'>
					[Let&apos;s Talk →]
				</Link>
				<p className='text-white text-3xl tracking-wider'>
					© {new Date().getFullYear()}
				</p>
			</div>
    </footer>
  )
}

export default Footer