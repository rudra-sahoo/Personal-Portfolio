"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Github, Twitter, Linkedin, Heart, ExternalLink } from "lucide-react"

export default function Footer() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  // Add scroll animation for background
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const socialLinks = [
    { 
      icon: <Github className="w-5 h-5" />, 
      href: "https://github.com/rudra-sahoo",
      label: "GitHub"
    },
    { 
      icon: <Twitter className="w-5 h-5" />, 
      href: "https://x.com/Rudra7555",
      label: "Twitter"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: "https://www.linkedin.com/in/rudra-narayana-sahoo-695342288/",
      label: "LinkedIn"
    }
  ]

  return (
    <footer ref={ref} className="relative py-20 bg-black/90 overflow-hidden">
      {/* Enhanced Animated Background Grid */}
      <div className="absolute inset-0">
        {/* Main Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        {/* Diagonal Grid with Animation */}
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, #4f4f4f12 49%, #4f4f4f12 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, #4f4f4f12 49%, #4f4f4f12 51%, transparent 52%)
            `,
            backgroundSize: '4rem 4rem',
            y: backgroundY
          }}
        />

        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(var(--primary-rgb),0.1),transparent_110%)]" />
        
        {/* Mask for Fade Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content Container with higher z-index */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-8"
        >
          {/* Logo with enhanced animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 
              relative after:absolute after:inset-0 after:bg-primary/10 after:blur-xl after:transform after:scale-150"
          >
            Rudra Sahoo
          </motion.div>

          {/* Social Links with enhanced hover effects */}
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative px-4 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300
                  before:absolute before:inset-0 before:border before:border-primary/20 before:rounded-lg 
                  before:scale-50 before:opacity-0 hover:before:scale-100 hover:before:opacity-100 
                  before:transition-all before:duration-300"
                whileHover={{ y: -2 }}
              >
                <span className="flex items-center gap-2 relative z-10">
                  {link.icon}
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </motion.a>
            ))}
          </div>

          {/* Enhanced Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent
              relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-primary/10 
              after:to-transparent after:blur-sm"
          />

          {/* Copyright with enhanced animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-2 text-sm text-muted-foreground"
          >
            <p className="flex items-center gap-2">
              Made with 
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>
              by Rudra Sahoo
            </p>
            <p>© 2025 All rights reserved</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Gradient Border Top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent
          after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-primary/10 
          after:to-transparent after:blur-sm"
      />
    </footer>
  )
}