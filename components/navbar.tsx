"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        // The background change is already handled here
        isScrolled ? "bg-black/100 backdrop-blur-md shadow-sm" : "bg-transparent" 
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Update logo text color based on isScrolled */}
        <Link href="#hero" className={`font-bold text-xl font-['Space_Grotesk'] transition-colors ${isScrolled ? 'text-white' : 'text-[#0F172A]'}`}>
          <span className="text-[#14B8A6]">M</span>ichael
          <span className="text-[#14B8A6]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              // Update desktop link text color based on isScrolled
              className={`hover:text-[#14B8A6] transition-colors font-medium ${isScrolled ? 'text-white' : 'text-[#0F172A]'}`}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(link.href)?.scrollIntoView({
                  behavior: "smooth",
                })
              }}
            >
              {link.name}
            </Link>
          ))}
          {/* Update desktop resume button text color based on isScrolled */}
          <a
            href="/resume.pdf"
            target="_blank"
            className={`px-4 py-2 rounded-md transition-all font-medium ${isScrolled ? 'bg-[#14B8A6]/20 text-white hover:bg-[#14B8A6]/40' : 'bg-[#14B8A6]/10 text-[#14B8A6] hover:bg-[#14B8A6]/20'}`}
            rel="noreferrer"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        {/* Update mobile menu button icon color based on isScrolled */}
        <button className={`md:hidden transition-colors ${isScrolled ? 'text-white' : 'text-[#0F172A]'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            // Adjust mobile menu background based on scroll state for consistency
            className={`md:hidden backdrop-blur-md ${isScrolled ? 'bg-black/95' : 'bg-white/95'}`}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  // Update mobile link text color based on isScrolled
                  className={`hover:text-[#14B8A6] transition-colors py-2 font-medium ${isScrolled ? 'text-white' : 'text-[#0F172A]'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(link.href)?.scrollIntoView({
                      behavior: "smooth",
                    })
                    setMobileMenuOpen(false)
                  }}
                >
                  {link.name}
                </Link>
              ))}
              {/* Update mobile resume button text color based on isScrolled */}
              <a
                href="/resume.pdf"
                target="_blank"
                className={`px-4 py-2 rounded-md transition-all font-medium w-fit ${isScrolled ? 'bg-[#14B8A6]/20 text-white hover:bg-[#14B8A6]/40' : 'bg-[#14B8A6]/10 text-[#14B8A6] hover:bg-[#14B8A6]/20'}`}
                rel="noreferrer"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
