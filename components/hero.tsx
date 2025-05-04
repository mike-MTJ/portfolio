"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Download, Github, Linkedin } from 'lucide-react'
import dynamic from 'next/dynamic'

// Import the SplineViewer component with dynamic import to avoid SSR issues
const SplineViewer = dynamic(() => import('./spline-viewer'), { ssr: false })

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = 'console.log("Hi, I\'m Michael 👋");'
  const typingSpeed = 100
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let i = 0;
    let typingInterval: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null; // To store the timeout ID for cleanup

    const startTyping = () => {
      i = 0; // Reset index
      setText(""); // Clear existing text
      if (typingInterval) clearInterval(typingInterval); // Clear previous interval if any

      typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setText(fullText.substring(0, i + 1));
          i++;
        } else {
          if (typingInterval) clearInterval(typingInterval); // Stop typing
          // Wait 3 seconds, then restart
          timeoutId = setTimeout(startTyping, 3000); 
        }
      }, typingSpeed);
    };

    startTyping(); // Initial start

    // Cleanup function
    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (timeoutId) clearTimeout(timeoutId); // Clear the timeout on unmount
    };
  }, [fullText, typingSpeed]); // Add dependencies

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorRef.current.style.opacity === "0" ? "1" : "0"
      }
    }, 500)

    return () => clearInterval(blinkInterval)
  }, [])

  return (
    <section id="hero" className="min-h-screen pt-20 relative overflow-hidden">
      {/* Background SVG Wave */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            fill="#14B8A6"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="bg-[#0F172A]/5 backdrop-blur-sm p-4 rounded-lg font-mono text-[#0F172A] mb-6 inline-block">
              <span>{text}</span>
              <span ref={cursorRef} className="opacity-100">
                |
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] font-['Space_Grotesk'] mb-4">
              Michael Mohlala
            </h1>
            <h2 className="text-xl md:text-2xl text-[#0F172A]/80 mb-8 font-['Inter']">
              Full Stack Engineer & Tech Problem-Solver
            </h2>

            <div className="flex flex-wrap gap-4 mb-8">
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#projects")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }}
                className="px-6 py-3 bg-[#14B8A6] text-white rounded-md hover:shadow-lg hover:translate-y-[-2px] transition-all font-medium flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See My Work <ArrowDown size={16} />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                className="px-6 py-3 bg-white/50 backdrop-blur-sm border border-[#0F172A]/10 text-[#0F172A] rounded-md hover:shadow-lg hover:translate-y-[-2px] transition-all font-medium flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                rel="noreferrer"
              >
                Download Resume <Download size={16} />
              </motion.a>
            </div>

            <div className="flex gap-4">
              <motion.a
                href="https://github.com/michaelmohlala"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/50 backdrop-blur-sm border border-[#0F172A]/10 text-[#0F172A] rounded-md hover:text-[#14B8A6] hover:border-[#14B8A6]/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/michaelmohlala"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/50 backdrop-blur-sm border border-[#0F172A]/10 text-[#0F172A] rounded-md hover:text-[#14B8A6] hover:border-[#14B8A6]/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[400px] md:h-[500px] relative z-10"
          >
            <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0F172A]/5 to-[#14B8A6]/10 backdrop-blur-sm border border-white/20 shadow-xl">
              <SplineViewer />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            <ArrowDown className="text-[#0F172A]/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}