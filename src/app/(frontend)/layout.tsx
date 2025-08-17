import React from 'react'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Syne, Reddit_Mono, Roboto } from 'next/font/google'
import TargetCursor from './components/layout/TargetCursor'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['300', '400', '700'],
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

const redditMono = Reddit_Mono({
  subsets: ['latin'],
  variable: '--font-reddit-mono',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${syne.variable} ${redditMono.variable}`}>
        <TargetCursor 
          spinDuration={5}
          hideDefaultCursor={true}
        />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
