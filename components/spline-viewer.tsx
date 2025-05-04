"use client"

import { useEffect, useRef } from "react"

export default function SplineViewer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoaded = useRef(false)
  
  useEffect(() => {
    if (scriptLoaded.current) return
    
    // Load the Spline Viewer script
    const script = document.createElement('script')
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.89/build/spline-viewer.js"
    script.type = "module"
    script.async = true
    document.head.appendChild(script)
    
    // Create the spline-viewer element
    if (containerRef.current) {
      const splineViewer = document.createElement('spline-viewer')
      splineViewer.setAttribute('url', 'https://prod.spline.design/X-Nasv34if56bHbI/scene.splinecode')
      
      // Set width and height to 100%
      splineViewer.style.width = '100%'
      splineViewer.style.height = '100%'
      
      // Add a fallback image
      const fallbackImg = document.createElement('img')
      fallbackImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAATCAYAAADxlA/3AAAJ+ElEQVR4AQCBAH7/AB8rUg8fK1IJHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IZHytSNx8rUlQfK1JtHytSfx8rUocfK1KDHytSdR8rUl0fK1I/HytSHh8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUggfK1IPAIEAfv8AHytSEh8rUgwfK1ICHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSBB8rUh8fK1I9HytSWx8rUnUfK1KGHytSjh8rUosfK1J8HytSZR8rUkYfK1IlHytSBR8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSDB8rUhMAgQB+/wAfK1IXHytSEh8rUgcfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IOHytSKh8rUkkfK1JnHytSgR8rUpQfK1KcHytSmR8rUoofK1JyHytSVB8rUjIfK1IRHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgcfK1ITHytSGgCBAH7/AB8rUh0fK1IXHytSDh8rUgIfK1IAHytSAB8rUgAfK1IAHytSAx8rUhofK1I3HytSVx8rUnYfK1KRHytSpB8rUq0fK1KqHytSmx8rUoMfK1JkHytSQh8rUiEfK1IEHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSDx8rUhsfK1IiAIEAfv8AHytSIh8rUh0fK1ITHytSCB8rUgAfK1IAHytSAB8rUgAfK1IOHytSJh8rUkQfK1JlHytShR8rUqEfK1K1HytSvh8rUrsfK1KtHytSlB8rUnUfK1JSHytSMB8rUhIfK1IAHytSAB8rUgAfK1IAHytSAB8rUgcfK1IWHytSIR8rUigAgQB+/wAfK1IlHytSIB8rUhcfK1IMHytSAh8rUgAfK1IAHytSBR8rUhYfK1IwHytSTx8rUnEfK1KSHytSrh8rUsIfK1LMHytSyR8rUrsfK1KiHytSgh8rUl8fK1I8HytSHR8rUgUfK1IAHytSAB8rUgAfK1IAHytSCx8rUhkfK1IkHytSKwCBAH7/AB8rUiUfK1IgHytSGB8rUg0fK1IEHytSAB8rUgAfK1IJHytSGx8rUjUfK1JVHytSeB8rUpofK1K3HytSzB8rUtUfK1LTHytSxR8rUqwfK1KLHytSZx8rUkMfK1IjHytSCh8rUgAfK1IAHytSAB8rUgAfK1ILHytSGR8rUiMfK1IpAIEAfv8AHytSJB8rUh8fK1IXHytSDR8rUgQfK1IAHytSAB8rUgofK1IcHytSNx8rUlcfK1J7HytSnR8rUrofK1LPHytS2R8rUtcfK1LJHytSsB8rUo8fK1JqHytSRR8rUiUfK1ILHytSAB8rUgAfK1IAHytSAB8rUggfK1IVHytSHx8rUiUAgQB+/wAfK1IjHytSHh8rUhUfK1ILHytSAh8rUgAfK1IAHytSCB8rUhofK1I1HytSVR8rUnkfK1KbHytSuR8rUs4fK1LYHytS1h8rUscfK1KuHytSjR8rUmgfK1JDHytSIh8rUggfK1IAHytSAB8rUgAfK1IAHytSAh8rUg4fK1IZHytSHgCBAH7/AB8rUiEfK1IcHytSEx8rUggfK1IAHytSAB8rUgAfK1IDHytSFh8rUjAfK1JQHytScx8rUpUfK1KzHytSyB8rUtIfK1LQHytSwR8rUqgfK1KHHytSYh8rUj4fK1IcHytSAh8rUgAfK1IAHytSAB8rUgAfK1IAHytSCB8rUhIfK1IYAIEAfv8AHytSIB8rUhofK1IRHytSBh8rUgAfK1IAHytSAB8rUgAfK1IPHytSKB8rUkcfK1JqHytSjB8rUqkfK1K+HytSyB8rUsYfK1K3HytSnx8rUn4fK1JaHytSNR8rUhUfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IDHytSDR8rUhMAgQB+/wAfK1IeHytSGR8rUg8fK1IDHytSAB8rUgAfK1IAHytSAB8rUgYfK1IeHytSPB8rUl4fK1J/HytSmx8rUrAfK1K6HytSuB8rUqofK1KSHytScx8rUk8fK1IsHytSDB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IKHytSEACBAH7/AB8rUh0fK1IXHytSDB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUhIfK1IvHytSTx8rUm8fK1KLHytSoB8rUqofK1KoHytSmx8rUoMfK1JlHytSQh8rUiAfK1ICHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgkfK1IPAIEAfv8AHytSGR8rUhMfK1IIHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAx8rUh8fK1I+HytSXR8rUngfK1KMHytSlx8rUpUfK1KJHytScx8rUlUfK1I0HytSFB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSCB8rUg8AgQB+/wAfK1IUHytSDh8rUgIfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSDR8rUisfK1JJHytSZB8rUngfK1KCHytSgR8rUnYfK1JgHytSRR8rUiUfK1IHHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IJHytSDwCBAH7/AB8rUg4fK1IHHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSFx8rUjUfK1JPHytSYx8rUm0fK1JtHytSYh8rUk4fK1I0HytSFh8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgkfK1IQAIEAfv8AHytSBh8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IGHytSIx8rUj0fK1JQHytSWx8rUlsfK1JRHytSPh8rUiUfK1IJHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSCB8rUg8AgQB+/wAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IVHytSLh8rUkIfK1JNHytSTR8rUkQfK1IyHytSGR8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IHHytSDwGBAH7/AB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUg0fK1InHytSOh8rUkUfK1JGHytSPR8rUisfK1ITHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgAfK1IAHytSAB8rUgcfK1IOe5rcNnoSquEAAAAASUVORK5CYII="
      fallbackImg.alt = "Spline preview"
      fallbackImg.style.width = "100%"
      fallbackImg.style.height = "100%"
      
      splineViewer.appendChild(fallbackImg)
      containerRef.current.appendChild(splineViewer)
    }
    
    scriptLoaded.current = true
  }, [])
  
  return (
    <div ref={containerRef} className="w-full h-full" />
  )
}