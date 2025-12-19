'use client'

import React, { useState, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Menu, X } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [open, setOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      {/* DESKTOP NAV */}
      <nav className="hidden md:flex gap-12 items-center">
        {navItems.map(({ link }, i) => (
          <CMSLink key={i} {...link} appearance="link" />
        ))}
      </nav>

      {/* MOBILE */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="relative z-50 text-white"
        >
          <Menu size={28} />
        </button>

        {/* BACKDROP */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/60 transition-opacity duration-500 ${
            open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* SLIDE-IN MENU */}
        <aside
          className={`fixed top-0 right-0 h-full w-1/2 max-w-sm bg-black border-l border-white/10
            transform transition-transform duration-500 ease-in-out z-50
            ${open ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          {/* Close button */}
          <div className="flex justify-end py-6 px-4">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-white">
              <X size={28} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-8 px-8 pt-12 text-xl">
            {navItems.map(({ link }, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => {
                  setOpen(false)
                  // If it's an in-page link, scroll smoothly
                  if (link.url?.startsWith('#')) {
                    const target = document.querySelector(link.url)
                    target?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                <CMSLink {...link} appearance="link" className="text-white" />
              </div>
            ))}
          </nav>
        </aside>
      </div>
    </>
  )
}
