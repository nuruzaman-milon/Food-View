"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: "fade-up" | "scale" | "slide-left" | "slide-right"
}

export function AnimatedCard({ children, className, delay = 0, animation = "fade-up" }: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  const animationClasses = {
    "fade-up": "animate-fade-up",
    scale: "animate-scale-in",
    "slide-left": "animate-slide-in-left",
    "slide-right": "animate-slide-in-right",
  }

  return (
    <Card
      className={cn(
        "hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer",
        animationClasses[animation],
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
    </Card>
  )
}
