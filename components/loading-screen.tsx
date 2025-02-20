"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const text = "Welcome to Rudra's Portfolio"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = 'auto'
    }, 3000)

    document.body.style.overflow = 'hidden'
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.2 }}
      onAnimationComplete={() => setIsLoading(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative">
        <motion.div 
          className="relative overflow-hidden text-4xl md:text-5xl font-bold"
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="h-1 w-full bg-primary mt-4 origin-left"
        />
      </div>
    </motion.div>
  )
}