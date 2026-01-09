import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Mail, Phone } from 'lucide-react'
import RichText from '@/components/RichText'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []
  const brandDescription = footerData?.brandDescription || null

  return (
    <footer className="relative mt-auto bg-black text-white border-t border-white/10">
      <div className="absolute top-[-1rem] sm:top-[-4rem] md:top-[-4rem] w-full grid grid-rows-3 auto-cols-[1rem] sm:auto-cols-[1.5rem] md:auto-cols-[2rem] grid-flow-col gap-0 select-none overflow-x-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <React.Fragment key={i}>
            <div
              className={`w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem] md:w-[2rem] md:h-[2rem] ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}
            ></div>
            <div
              className={`w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem] md:w-[2rem] md:h-[2rem] ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}
            ></div>
            <div
              className={`w-[1rem] h-[1rem] sm:w-[1.5rem] sm:h-[1.5rem] md:w-[2rem] md:h-[2rem] ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}
            ></div>
          </React.Fragment>
        ))}
      </div>
      {/* TOP */}
      <div className="container py-16 grid gap-12 md:grid-cols-3">
        {/* BRAND */}
        <div className="space-y-6">
          <Link href="/" className="inline-flex items-center">
            <Logo />
          </Link>

          {/* Add brand description */}
          {brandDescription && (
            <div className="text-white/70 max-w-sm">
              <RichText data={brandDescription} enableGutter={false} />
            </div>
          )}

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/brakes_and_chains/"
              aria-label="Instagram"
              className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition"
            >
              {/* Instagram */}
              <svg width="18" height="18" fill="currentColor">
                <path d="M12.3 2H5.7A3.7 3.7 0 002 5.7v6.6A3.7 3.7 0 005.7 16h6.6a3.7 3.7 0 003.7-3.7V5.7A3.7 3.7 0 0012.3 2zm2.1 10.3a2.1 2.1 0 01-2.1 2.1H5.7a2.1 2.1 0 01-2.1-2.1V5.7a2.1 2.1 0 012.1-2.1h6.6a2.1 2.1 0 012.1 2.1v6.6z" />
                <path d="M9 5.5A3.5 3.5 0 109 12.5 3.5 3.5 0 009 5.5zm0 5.7a2.2 2.2 0 112.2-2.2A2.2 2.2 0 019 11.2zM12.7 4.6a.8.8 0 11-.8-.8.8.8 0 01.8.8z" />
              </svg>
            </a>

            {/* <a
              href="#"
              aria-label="Facebook"
              className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition"
            >
              f
            </a> */}

            {/* <a
              href="#"
              aria-label="YouTube"
              className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition"
            >
              ▶
            </a> */}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold tracking-widest uppercase">Navigatie</h4>

          <nav className="flex flex-col gap-3 text-white/70">
            {navItems.map(({ link }, i) => (
              <CMSLink key={i} {...link} className="hover:text-white transition" />
            ))}
          </nav>
        </div>

        {/* CONTACT */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold tracking-widest uppercase">Contact</h4>

          <div className="space-y-4 text-white/70">
            <div className="flex items-center gap-3 group cursor-pointer transition-colors duration-200">
              <span className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center transition-colors duration-200 group-hover:bg-white/20">
                <Mail size={18} />
              </span>
              <span className="transition-colors duration-200 group-hover:text-white">
                info@brakesandchains.com
              </span>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer transition-colors duration-200">
              <span className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center transition-colors duration-200 group-hover:bg-white/20">
                <Phone size={18} />
              </span>
              <span className="transition-colors duration-200 group-hover:text-white">
                +31 6 1234 5678
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row gap-4 justify-between text-sm text-white/50">
          <span>© {new Date().getFullYear()} Brakes & Chains. Alle rechten voorbehouden.</span>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/voorwaarden" className="hover:text-white">
              Voorwaarden
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
