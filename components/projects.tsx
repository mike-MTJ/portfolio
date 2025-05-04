"use client"

import { useState, useEffect } from "react" // Import useEffect
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  stack: string[]
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [isExpanded, setIsExpanded] = useState(false) 
  const [isMobile, setIsMobile] = useState(false) // Add state for mobile check
  const initialProjectCount = 2 

  // Check window size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online store with cart, checkout, and payment processing.",
      image: "/Resources/E-commerce.png",
      tags: ["Full Stack", "Frontend", "Backend"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/michaelmohlala/ecommerce",
      stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A Kanban-style project management tool with drag-and-drop functionality.",
      image: "/Resources/task.webp",
      tags: ["Frontend", "Full Stack"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/michaelmohlala/taskmanager",
      stack: ["React", "TypeScript", "Firebase"],
    },
    {
      id: 3,
      title: "API Gateway Service",
      description: "A microservice that handles routing, authentication, and rate limiting.",
      image: "/Resources/gateway.jpg",
      tags: ["Backend"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/michaelmohlala/api-gateway",
      stack: ["Node.js", "Express", "Redis", "Docker"],
    },
    {
      id: 4,
      title: "Real-time Chat Application",
      description: "A messaging platform with real-time updates and file sharing.",
      image: "/Resources/chat.jpg",
      tags: ["Full Stack", "Frontend"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/michaelmohlala/chat-app",
      stack: ["React", "Socket.io", "MongoDB", "Express"],
    },
    {
      id: 5,
      title: "Data Visualization Dashboard",
      description: "An analytics dashboard with interactive charts and filters.",
      image: "/Resources/vision.png",
      tags: ["Frontend"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/michaelmohlala/dashboard",
      stack: ["React", "D3.js", "Tailwind CSS"],
    },
    {
      id: 6,
      title: "Content Management System",
      description: "A headless CMS with a modern admin interface and API.",
      image: "/Resources/cms.jpg",
      tags: ["Backend", "Full Stack"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/michaelmohlala/cms",
      stack: ["Node.js", "GraphQL", "MongoDB", "React"],
    },
  ]

  const filters = ["All", "Frontend", "Backend", "Full Stack"]

  // Adjust filtering logic
  const filteredProjectsSource =
    activeFilter === "All" ? projects : projects.filter((project) => project.tags.includes(activeFilter));

  // Modify display logic to consider mobile state
  const displayedProjects = 
    activeFilter === "All" && !isExpanded && isMobile // Only limit on mobile when not expanded
      ? filteredProjectsSource.slice(0, initialProjectCount) 
      : filteredProjectsSource;

  // Modify button visibility logic to consider mobile state
  const showSeeMoreButton = 
    activeFilter === "All" && !isExpanded && isMobile && projects.length > initialProjectCount; // Only show on mobile when not expanded

  // Handle filter button clicks (no change needed here for this request)
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (filter !== "All") {
      setIsExpanded(false);
    }
    // Optional: Reset expansion when clicking "All" on mobile if desired
    // if (filter === "All" && isMobile) {
    //   setIsExpanded(false); 
    // }
  };

  return (
    <section id="projects" className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] font-['Space_Grotesk'] mb-4">My Projects</h2>
          <p className="text-[#0F172A]/70 max-w-2xl mx-auto">
            A showcase of my recent work, from web applications to backend services.
          </p>
        </motion.div>

        {/* Update filter button onClick handler */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => handleFilterClick(filter)} // Use the new handler
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-[#14B8A6] text-white shadow-md"
                  : "bg-white text-[#0F172A] hover:bg-[#14B8A6]/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>

        {/* Map over displayedProjects instead of filteredProjects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0F172A] mb-2 font-['Space_Grotesk']">{project.title}</h3>
                  <p className="text-[#0F172A]/70 mb-4">{project.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs text-[#0F172A]/60">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#0F172A] hover:text-[#14B8A6] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={18} />
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[#0F172A] hover:text-[#14B8A6] transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={18} />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* "See More" button logic updated */}
        {showSeeMoreButton && (
          <div className="text-center mt-12">
            <motion.button
              onClick={() => setIsExpanded(true)}
              className="px-6 py-3 bg-[#14B8A6] text-white rounded-md hover:shadow-lg hover:translate-y-[-2px] transition-all font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See More Projects
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
