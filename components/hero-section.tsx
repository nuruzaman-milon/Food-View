"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const backgroundImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
]

const cyclingWords = ["Restaurants", "Foods"]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Preload first image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => setImageLoaded(true)
    img.onerror = () => setImageError(true)
    img.src = backgroundImages[0]
  }, [])

  useEffect(() => {
    // Change background image every 4 seconds
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 4000)

    return () => clearInterval(imageInterval)
  }, [])

  useEffect(() => {
    // Change cycling word every 3 seconds
    const wordInterval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % cyclingWords.length)
        setIsVisible(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fallback Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500" />

      {/* Background Images with Zoom Animation */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center animate-zoom"
              style={{
                backgroundImage: `url(${image})`,
                animation: index === currentImageIndex ? "zoomIn 4s ease-out" : "none",
              }}
              onError={() => setImageError(true)}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight animate-slide-up">
          Discover Amazing{" "}
          <span
            className={`inline-block transition-all duration-300 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-4"
            }`}
            style={{ minWidth: "300px" }}
          >
            {cyclingWords[currentWordIndex]}
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-yellow-400 animate-slide-up animation-delay-200">
          Based On Real User Reviews
        </p>

        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90 animate-slide-up animation-delay-400">
          Find the best dining experiences in your area. Read reviews, discover new cuisines, and share your own food
          adventures.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
          <Button
            size="lg"
            asChild
            className="text-lg px-8 py-3 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
          >
            <Link href="/restaurants">Explore Restaurants</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 hover:text-white"
          >
            <Link href="/reviews">Read Reviews</Link>
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes zoomIn {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-zoom {
          animation: zoomIn 4s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </section>
  )
}
