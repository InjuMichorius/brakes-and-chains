'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // New state to track if the page is scrolled
  const [scrolled, setScrolled] = useState(false)

  // Reset theme on pathname change
  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Update theme when headerTheme changes
  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Listen to scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0) // true if not at top
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll() // initialize on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div
        className={`fixed py-6 px-4 flex justify-between w-full left-0 top-0 transition-colors duration-300 ${
          scrolled ? 'bg-black' : 'bg-transparent'
        }`}
      >
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
