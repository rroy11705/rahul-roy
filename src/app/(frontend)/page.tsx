import React from 'react'
import Hero from '@/components/home/Hero'
import Footer from '@/components/layout/Footer'
import About from '@/components/home/About'
import WhatIDo from '@/components/home/WhatIDo'
import WhatIHaveDone from '@/components/home/WhatIHaveDone'
import Contact from '@/components/common/Contact'

export default async function HomePage() {

  return (
    <div className='bg-dark min-h-screen'>
      <Hero />
      <About />
      <WhatIDo />
      <WhatIHaveDone />
      <Contact />
      <Footer />
    </div>
  )
}
