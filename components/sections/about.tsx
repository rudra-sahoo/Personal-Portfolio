"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"

export default function About() {
  // Main section ref for scroll-based animations
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  
  // Optimize scroll tracking by using lighter transform values
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Use separate scroll progress for different animation elements
  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.2"]
  })
  
  // Enhanced background text animation
  const backgroundRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10])
  const backgroundY = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 0, 50])
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], ["0px", "15px", "0px"])
  const backgroundSkew = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5])
  
  // Optimize transform values with fewer keyframes and easing
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.05, 0.05, 0])
  const backgroundX = useTransform(scrollYProgress, [0, 1], [-50, 50]) // Reduced movement range
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]) // Smaller scale range
  
  // More subtle rotation and scale for better performance
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05])
  
  // Optimized motion values with reduced ranges
  const contentY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [50, 0, -50])
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  
  // Optimized parallax with reduced motion
  const titleY = useTransform(titleScrollProgress, [0, 1], [0, -25])
  const imageY = useTransform(scrollYProgress, [0.2, 0.8], [0, 30])
  const statsY = useTransform(scrollYProgress, [0.3, 0.9], [30, -15])

  // Enhanced view tracking for better animation triggers
  const [contentRef, contentInView] = useInView({
    threshold: 0.2,
    triggerOnce: true // Changed to true for better performance
  })
  
  // Use separate in-view detection for stats section
  const [statsRef, statsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  // Progressive loading for better performance
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Updated stats array
  const stats = [
    { number: "5+", label: "Projects Completed" },
    { number: "1+", label: "Years Experience" }
  ]
  
  // Handle intersection animations
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }
  
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen relative py-32 overflow-hidden will-change-transform"
    >
      {isClient && (
        <motion.div 
          className="frame-text absolute top-20 -left-20 text-[12rem] md:text-[16rem] font-bold opacity-0 select-none pointer-events-none"
          style={{ 
            opacity: backgroundOpacity,
            x: backgroundX,
            scale: backgroundScale,
            rotate: backgroundRotate,
            y: backgroundY,
            letterSpacing
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          ABOUT ME
        </motion.div>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
          className="text-center mb-16"
          style={isClient ? { y: titleY } : {}}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            The Story Behind My Journey
          </h2>
          <motion.div 
            className="h-1 w-0 bg-primary rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Enhanced image section with hardware acceleration */}
          {isClient && (
            <motion.div
              ref={imageRef}
              style={{ y: imageY }}
              className="relative aspect-square group will-change-transform"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatePresence>
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-2xl will-change-transform"
                  style={{ 
                    rotate: imageRotate,
                    scale: imageScale,
                    transformOrigin: "center center"
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </AnimatePresence>
              
              <motion.div 
                className="relative h-full w-full rounded-2xl overflow-hidden will-change-transform"
                style={{ 
                  scale: imageScale,
                  transformOrigin: "center center" 
                }}
                whileHover={{ scale: 1.03 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 250, 
                  damping: 25,
                  mass: 0.5 // Lower mass for more responsive feel
                }}
              >
                <Image
                  src="/IMG_0797.jpg"
                  alt="Rudra - Founder of DuckBuck Studios"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transform-gpu" // Hardware acceleration
                />
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Bio content with optimized animations */}
          {isClient && (
            <motion.div
              ref={contentRef}
              style={{ 
                y: contentY,
                opacity: contentOpacity,
              }}
              className="space-y-8 will-change-transform"
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-primary/10 transform-gpu"
                whileHover={{ 
                  boxShadow: "0 15px 30px -15px rgba(var(--primary-rgb), 0.25)",
                  borderColor: "rgba(var(--primary-rgb), 0.3)",
                  y: -3 // Reduced motion for smoother animation
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 350, 
                  damping: 30,
                  mass: 0.8 // Tuned for smoothness
                }}
              >
                <motion.h2 
                  className="text-3xl font-bold mb-4 text-primary"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Hi, I'm Rudra
                </motion.h2>
                
                <motion.div className="space-y-4">
                  <motion.p 
                    className="text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    A passionate developer from Odisha, India, currently leading innovation at DuckBuck Studios. 
                    With a vision to revolutionize digital communication, I'm developing{" "}
                    <Link href="https://duckbuck.in" className="text-primary relative group inline-flex items-center" target="_blank">
                      <span>DuckBuck</span>
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 ease-out"></span>
                    </Link>
                    , a real-time voice communication platform that enables users to communicate like walkie-talkies over the internet.
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    My journey in tech has been driven by a desire to create meaningful solutions that make a difference. 
                    From founding startups to delivering cutting-edge projects, I bring a unique blend of technical expertise 
                    and creative problem-solving to every challenge.
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Stats with enhanced staggered animations */}
              <motion.div
                ref={statsRef}
                style={statsInView ? { y: statsY } : {}}
                className="grid grid-cols-2 gap-6 will-change-transform"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10 transition-all transform-gpu"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={statsInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: index * 0.2
                      }
                    } : {}}
                    whileHover={{ 
                      y: -5,
                      scale: 1.05,
                      boxShadow: "0 20px 40px -20px rgba(var(--primary-rgb), 0.3)",
                      borderColor: "rgba(var(--primary-rgb), 0.4)"
                    }}
                    whileTap={{ scale: 0.98, y: -2 }}
                  >
                    <motion.h3 
                      className="text-3xl font-bold mb-2 text-primary"
                      whileHover={{ scale: 1.1, x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}