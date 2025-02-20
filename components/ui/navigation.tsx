"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "#contact" }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled ? "bg-background/80 backdrop-blur-md py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold">
            Portfolio
          </a>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className={`${
            isMenuOpen
              ? "absolute top-full left-0 right-0 bg-background/80 backdrop-blur-md p-4 border-t border-border"
              : "hidden"
          } md:block md:static md:bg-transparent md:p-0 md:border-none`}>
            <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
              {navigation.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </motion.header>
  )
}