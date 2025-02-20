"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Resume from "@/components/routes/resume"

export default function ResumePage() {
  return (
    <main className="relative">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 
            border border-primary/20 hover:bg-primary/20 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>

      <Resume />
    </main>
  )
} 