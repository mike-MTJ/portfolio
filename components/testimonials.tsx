"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "Michael is an exceptional developer who consistently delivers high-quality code. His attention to detail and problem-solving skills made our project a success. I would work with him again in a heartbeat.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "CTO",
      company: "StartupX",
      content:
        "Working with Michael was a game-changer for our startup. He not only built our MVP in record time but also provided valuable insights that improved our product. His technical expertise is matched only by his communication skills.",
    },
    {
      id: 3,
      name: "David Chen",
      role: "Engineering Lead",
      company: "InnovateLabs",
      content:
        "Michael's ability to quickly understand complex requirements and translate them into elegant solutions is remarkable. He's a team player who elevates everyone around him with his knowledge sharing and positive attitude.",
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] font-['Space_Grotesk'] mb-4">What People Say</h2>
          <p className="text-[#0F172A]/70 max-w-2xl mx-auto">
            Feedback from clients and colleagues I've had the pleasure to work with.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-10 left-0 text-[#14B8A6] opacity-20">
            <Quote size={80} />
          </div>

          <div className="relative overflow-hidden min-h-[250px] flex items-center">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="absolute w-full"
              >
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <p className="text-[#0F172A]/80 mb-6 italic">"{testimonials[current].content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#14B8A6]/20 rounded-full flex items-center justify-center text-[#14B8A6] font-bold">
                      {testimonials[current].name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-[#0F172A]">{testimonials[current].name}</h4>
                      <p className="text-sm text-[#0F172A]/60">
                        {testimonials[current].role}, {testimonials[current].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1)
                  setCurrent(index)
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === current ? "bg-[#14B8A6]" : "bg-[#0F172A]/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
            <motion.button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0F172A] pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0F172A] pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
