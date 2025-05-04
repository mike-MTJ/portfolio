import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-8 bg-[#0F172A] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white/70 text-sm">© {new Date().getFullYear()} Michael Mohlala. All rights reserved.</p>
          </div>

          <div className="flex items-center text-white/70 text-sm">
            <p>Built with</p>
            <Heart size={14} className="mx-1 text-[#14B8A6]" fill="#14B8A6" />
            <p>and VSCode</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
