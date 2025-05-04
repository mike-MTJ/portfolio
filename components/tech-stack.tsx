"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiAmazonwebservices,
  SiPython,
  SiJavascript,
} from "react-icons/si"

interface TechItem {
  name: string
  icon: React.ReactNode
  color: string
  description: string
}

export default function TechStack() {
  const [activeItem, setActiveItem] = useState<TechItem | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const techItems: TechItem[] = [
    {
      name: "React",
      icon: <SiReact size={40} />,
      color: "#61DAFB",
      description: "Built multiple complex UIs and SPAs with React hooks and context API.",
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs size={40} />,
      color: "#000000",
      description: "Developed SEO-friendly sites with server-side rendering and static generation.",
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs size={40} />,
      color: "#339933",
      description: "Created RESTful APIs and microservices with Express.js.",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript size={40} />,
      color: "#3178C6",
      description: "Implemented type-safe code to reduce bugs and improve developer experience.",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss size={40} />,
      color: "#06B6D4",
      description: "Rapidly built responsive interfaces with utility-first approach.",
    },
    {
      name: "PostgreSQL",
      icon: <SiPostgresql size={40} />,
      color: "#4169E1",
      description: "Designed relational database schemas and optimized complex queries.",
    },
    {
      name: "MongoDB",
      icon: <SiMongodb size={40} />,
      color: "#47A248",
      description: "Built NoSQL solutions for flexible data models and high scalability.",
    },
    {
      name: "Docker",
      icon: <SiDocker size={40} />,
      color: "#2496ED",
      description: "Containerized applications for consistent development and deployment.",
    },
    {
      name: "Git",
      icon: <SiGit size={40} />,
      color: "#F05032",
      description: "Managed version control with branching strategies and collaborative workflows.",
    },
    {
      name: "AWS",
      icon: <SiAmazonwebservices size={40} />,
      color: "#FF9900",
      description: "Deployed and managed cloud infrastructure with various AWS services.",
    },
    {
      name: "Python",
      icon: <SiPython size={40} />,
      color: "#3776AB",
      description: "Developed automation scripts and data processing pipelines.",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript size={40} />,
      color: "#F7DF1E",
      description: "Built interactive web applications with modern ES6+ features.",
    },
  ]

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 2
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <section id="tech-stack" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] font-['Space_Grotesk'] mb-4">My Tech Arsenal</h2>
          <p className="text-[#0F172A]/70 max-w-2xl mx-auto">
            Technologies I've mastered and use to build powerful, scalable applications.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="overflow-x-auto pb-6 cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex space-x-6 min-w-max px-4">
            {techItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveItem(item)}
                className="flex flex-col items-center justify-center w-32 h-32 bg-white rounded-xl shadow-sm border border-[#0F172A]/5 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="text-[#0F172A]/80" style={{ color: item.color }}>
                  {item.icon}
                </div>
                <h3 className="mt-3 font-medium text-[#0F172A]">{item.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>

        {activeItem && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-[#0F172A]/5 shadow-md max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-3">
              <div style={{ color: activeItem.color }}>{activeItem.icon}</div>
              <h3 className="text-xl font-bold text-[#0F172A]">{activeItem.name}</h3>
            </div>
            <p className="text-[#0F172A]/70">{activeItem.description}</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
