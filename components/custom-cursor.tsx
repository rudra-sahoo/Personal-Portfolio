"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 ,z: 100})
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY , z: e.clientX})
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    window.addEventListener('mousemove', updateCursor)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <motion.div
      className={`custom-cursor ${isHovered ? 'hover' : ''}`}
      animate={{
        x: position.x - (isHovered ? 30 : 16),
        y: position.y - (isHovered ? 30 : 16),
        scale: isHovered ? 1.2 : 1
      }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.8,
        stiffness: 400
      }}
    />
  )
}