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
  title: 'Rahul Roy - Software Developer',
  description: 'Experienced software developer specializing in full-stack web development, React, Next.js, and modern web technologies. Building innovative digital solutions.',
  keywords: ['Rahul Roy', 'Software Developer', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Web Development'],
  authors: [{ name: 'Rahul Roy' }],
  creator: 'Rahul Roy',
  publisher: 'Rahul Roy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rahul-roy.com',
    title: 'Rahul Roy - Software Developer',
    description: 'Experienced software developer specializing in full-stack web development, React, Next.js, and modern web technologies.',
    siteName: 'Rahul Roy Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rahul Roy - Software Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Roy - Software Developer',
    description: 'Experienced software developer specializing in full-stack web development, React, Next.js, and modern web technologies.',
    creator: '@rahulroy',
    images: ['/images/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  manifest: '/site.webmanifest',
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
