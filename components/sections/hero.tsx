"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.05,
        y: (e.clientY - window.innerHeight / 2) * 0.05
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Add photo scroll animation
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/rudra-sahoo" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/rudra-narayana-sahoo-695342288/" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/Rudra7555" }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-x-hidden flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-background to-background z-10" />
        <motion.div 
          className="absolute inset-0 opacity-60"
          style={{ y, opacity }}
        >
        </motion.div>
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Background Text */}
      <motion.div 
        className="absolute top-0 left-0 right-0 text-center overflow-hidden text-[20vw] font-bold leading-none opacity-[0.03] select-none pointer-events-none"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
      >
        CREATIVE
      </motion.div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="max-w-2xl"
          >
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 font-medium">
                  Creative Developer
                </span>
              </motion.div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="inline-block">
                Crafting Digital
              </span>
              <br />
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                Experiences
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12"
            >
              Transforming ideas into immersive digital journeys through code and creativity
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-16"
            >
              <motion.a 
                href="#work"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-medium 
                  hover:opacity-90 transition-all flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.a>
              <motion.a 
                href="#contact"
                className="border border-primary/20 hover:border-primary/40 px-8 py-3 rounded-full text-lg 
                  font-medium transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Photo */}
          <motion.div
            className="relative h-[700px] lg:h-[800px] w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div 
              className="relative w-full h-full"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Image
                src="/Subject.png"
                alt="Rudra Sahoo"
                fill
                className="object-contain object-right"
                priority
                quality={100}
              />

              {/* Animated Circles Background */}
              <motion.div
                className="absolute -inset-4 z-[-1] opacity-70"
                animate={{ 
                  background: [
                    'radial-gradient(circle at 30% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)',
                    'radial-gradient(circle at 70% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)',
                    'radial-gradient(circle at 30% 50%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)'
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              {/* Animated Lines */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, transparent 49%, rgba(var(--primary-rgb), 0.1) 50%, transparent 51%)',
                  backgroundSize: '200% 100%'
                }}
                animate={{
                  backgroundPosition: ['200% 0', '0% 0', '-200% 0']
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Keep at bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-30"
      >
        <motion.p
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-sm text-muted-foreground"
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero