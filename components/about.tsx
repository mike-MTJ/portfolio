"use client"

import { useState, useEffect } from "react" // Import useEffect
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react" // Import Chevron icons

export default function About() {
  const [showFunFact, setShowFunFact] = useState(false)
  // Add state for text expansion
  const [isTextExpanded, setIsTextExpanded] = useState(false)
  // Add state to check if on mobile (client-side check)
  const [isMobile, setIsMobile] = useState(false)

  // Define paragraphs
  const aboutParagraphs = [
    "Hello! I'm Michael, a passionate Full Stack Engineer with a knack for solving complex technical problems. My journey in tech began with a curiosity about how computers work, which led me down a rabbit hole of learning and exploration.",
    "With several years of experience building web applications, I've developed a deep understanding of both frontend and backend technologies. I enjoy creating intuitive user interfaces that not only look great but also provide seamless experiences.",
    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical articles and mentoring."
  ];

  // Check window size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
    };
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] font-['Space_Grotesk'] mb-4">About Me</h2>
          <p className="text-[#0F172A]/70 max-w-2xl mx-auto">Get to know the man behind the code.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-full max-w-md mx-auto aspect-square relative rounded-2xl overflow-hidden transform rotate-2 shadow-xl border-4 border-white">
              {/* Remove query parameters from src */}
              <Image src="/Resources/mike.jpg" alt="Michael Mohlala" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-0.5 bg-[#FACC15] p-4 rounded-lg shadow-lg transform rotate-6">
              <span className="font-bold text-[#0F172A]">Full Stack Developer</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Text rendering section */}
            <div className="prose prose-lg max-w-none">
              <p>{aboutParagraphs[0]}</p> {/* Always show the first paragraph */}
              
              {/* Conditionally render the rest of the text AND learning tags */}
              <AnimatePresence initial={false}>
                {(!isMobile || isTextExpanded) && (
                  <motion.div
                    key="collapsible-content" // Give a key for AnimatePresence
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    style={{ overflow: 'hidden' }} 
                  >
                    {/* Render the rest of the paragraphs */}
                    {aboutParagraphs.slice(1).map((p, index) => (
                      <p key={index + 1}>{p}</p>
                    ))}

                    {/* Move the learning tags inside this motion.div */}
                    <div className="flex flex-wrap gap-2 mt-6"> {/* Added mt-6 for spacing */}
                      <span className="px-3 py-1 bg-[#14B8A6]/10 text-[#14B8A6] rounded-full text-sm">
                        Currently learning: AI/ML
                      </span>
                      <span className="px-3 py-1 bg-[#14B8A6]/10 text-[#14B8A6] rounded-full text-sm">
                        Currently learning: Rust
                      </span>
                      <span className="px-3 py-1 bg-[#14B8A6]/10 text-[#14B8A6] rounded-full text-sm">
                        Currently learning: Web3
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Show "Read More/Less" button only on mobile */}
            {isMobile && (
              <motion.button
                onClick={() => setIsTextExpanded(!isTextExpanded)}
                className="flex items-center gap-1 text-[#14B8A6] font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-expanded={isTextExpanded} 
              >
                {isTextExpanded ? "Read Less" : "Read More"}
                {isTextExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </motion.button>
            )}

            {/* Fun Fact button remains outside the collapsible section */}
            <motion.button
              onClick={() => setShowFunFact(!showFunFact)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#0F172A]/10 rounded-md shadow-sm hover:shadow-md transition-all text-[#0F172A]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={16} className="text-[#FACC15]" />
              {showFunFact ? "Hide Fun Fact" : "Reveal Fun Fact"}
            </motion.button>

            {/* Fun Fact content remains outside the collapsible section */}
            <AnimatePresence>
              {showFunFact && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#0F172A]/5 p-4 rounded-md"
                >
                  <p className="text-[#0F172A] italic">
                    &ldquo;I built my first website at 13 using only HTML and a text editor. It was a fan page for my favorite
                    video game, complete with blinking text and a visitor counter!&rdquo;
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
