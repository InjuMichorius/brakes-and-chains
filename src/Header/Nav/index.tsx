'use client'

import React, { useState, useEffect } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence, easeOut } from 'framer-motion'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [open, setOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  // Variants for the staggered entrance
  const navContainerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
        ease: easeOut,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      {/* DESKTOP NAV */}
      <motion.nav
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex gap-12 items-center"
      >
        {navItems.map(({ link }, i) => (
          <motion.div key={i} variants={itemVariants}>
            <CMSLink {...link} appearance="link" />
          </motion.div>
        ))}
      </motion.nav>

      {/* MOBILE */}
      <div className="md:hidden relative z-60">
        {/* Hamburger / Cross Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="relative w-8 h-8 flex items-center justify-center text-white z-50"
        >
          {/* Stack Menu & X icons */}
          <Menu
            size={28}
            className={`absolute transition-transform duration-300 ease-in-out ${
              open ? 'rotate-45 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            size={28}
            className={`absolute transition-transform duration-300 ease-in-out ${
              open ? 'rotate-0 scale-100 opacity-100' : 'rotate-45 scale-0 opacity-0'
            }`}
          />
        </button>

        {/* MOBILE OVERLAY (using AnimatePresence for smooth exit) */}
        <AnimatePresence>
          {open && (
            <>
              {/* BACKDROP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 bg-black/60 z-10"
              />

              {/* SLIDE-IN MENU */}
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-2/3 max-w-sm bg-black border-l border-white/10 z-30"
              >
                <nav className="flex flex-col gap-8 px-8 pt-24 text-xl">
                  {navItems.map(({ link }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="cursor-pointer"
                      onClick={() => {
                        setOpen(false)
                        if (link.url?.startsWith('#')) {
                          const target = document.querySelector(link.url)
                          target?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      <CMSLink {...link} appearance="link" className="text-white" />
                    </motion.div>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
