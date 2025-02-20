import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Code2, 
  GraduationCap, 
  Award,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  Globe,
  Server,
  Cloud,
  Brain,
  Zap,
  ExternalLink,
  Briefcase,
  Book
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Types
interface Experience {
  company: string
  position: string
  period: string
  description: string[]
}

interface Education {
  school: string
  degree: string
  period: string
  details: string
}

interface PersonalInfo {
  name: string
  title: string
  location: string
  email: string
  phone: string
  about: string
  github: string
  linkedin: string
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  skills: string[]
}

// Enhanced Data
const personalInfo: PersonalInfo = {
  name: "Rudra Narayana Sahoo",
  title: "Full Stack Developer",
  location: "Odisha, India",
  email: "contact@rudrasahoo.me",
  phone: "+91 8093423855",
  about: `Passionate full-stack developer with expertise in modern web and mobile technologies. 
  Focused on creating efficient, scalable, and user-friendly applications with 1+ years of experience.
  Proficient in leveraging cutting-edge AI tools like Claude 3.5, Cursor AI, and various development 
  assistants to enhance productivity and code quality.`,
  github: "https://github.com/rudrasahoo",
  linkedin: "https://linkedin.com/in/rudrasahoo"
}

const experiences: Experience[] = [
  {
    company: "DuckBuck Studios",
    position: "Full Stack Developer",
    period: "Dec 2023 - Present",
    description: [
      "Developing cross-platform mobile applications using Flutter and Firebase",
      "Leveraging advanced AI tools (Claude 3.5, Cursor AI, Tara AI, Bolt.new, Dora.AI) for enhanced development workflow",
      "Implementing real-time features and responsive UI components",
      "Building scalable architectures using clean code principles and modern state management",
      "Utilizing AI-powered code generation and optimization tools for improved productivity"
    ]
  }
]

const education: Education[] = [
  {
    school: "Vellore Institute of Technology (VIT)",
    degree: "Bachelor of Technology",
    period: "2023 - 2027",
    details: "Computer Science Engineering"
  },
  {
    school: "Oneness International School",
    degree: "Higher Secondary Education (12th)",
    period: "2022 - 2023",
    details: "Science Stream with Computer Science"
  }
]

const certifications = [
  // Will be populated later
  // {
  //   title: "Certification Name",
  //   issuer: "Issuing Organization",
  //   date: "Issue Date",
  //   credential: "Credential ID"
  // }
]

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Globe className="w-6 h-6" />,
    skills: ["Next.js", "React", "Flutter", "TypeScript", "Tailwind CSS"]
  },
  {
    title: "Backend",
    icon: <Server className="w-6 h-6" />,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase"]
  },
  {
    title: "DevOps",
    icon: <Cloud className="w-6 h-6" />,
    skills: ["Docker", "AWS", "CI/CD", "Kubernetes", "Vercel"]
  },
  {
    title: "Technologies",
    icon: <Brain className="w-6 h-6" />,
    skills: ["Kafka", "Redis", "GraphQL", "WebSockets", "REST"]
  }
]

// Animation Variants
const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const skillCardHover = {
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300
    }
  }
}

// Components
function SkillCard({ category, delay }: { category: SkillCategory; delay: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      variants={{
        ...skillCardHover,
        ...fadeInUp
      }}
      whileHover="hover"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ delay }}
      className="p-6 rounded-xl bg-card/10 backdrop-blur-sm border border-primary/10 
        hover:border-primary/20 transition-all group"
    >
      <motion.div 
        className="flex items-center gap-3 mb-4"
        whileHover={{ x: 5 }}
      >
        <span className="text-primary group-hover:rotate-12 transition-transform">
          {category.icon}
        </span>
        <h3 className="font-medium">{category.title}</h3>
      </motion.div>
      <motion.div 
        className="flex flex-wrap gap-2"
        variants={staggerChildren}
      >
        {category.skills.map((skill, index) => (
          <TooltipProvider key={skill}>
            <Tooltip>
              <TooltipTrigger>
                <motion.span
                  variants={fadeInUp}
                  className="px-3 py-1 rounded-full text-sm bg-primary/10 border border-primary/20
                    hover:border-primary/40 hover:bg-primary/20 transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see projects with {skill}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </motion.div>
    </motion.div>
  )
}

function ExperienceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerChildren}
      className="space-y-8"
    >
      <motion.h2 
        variants={fadeInUp}
        className="text-2xl font-bold flex items-center gap-2"
      >
        <Briefcase className="w-6 h-6" />
        Experience
      </motion.h2>
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.company}
          variants={fadeInUp}
          className="border-l-2 border-primary/20 pl-6 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2"
          />
          <h3 className="font-medium text-xl">{exp.position}</h3>
          <p className="text-muted-foreground">{exp.company} • {exp.period}</p>
          <ul className="mt-2 space-y-1">
            {exp.description.map((desc, i) => (
              <motion.li
                key={i}
                variants={fadeInUp}
                className="text-sm text-muted-foreground"
              >
                • {desc}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  )
}

function EducationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerChildren}
      className="space-y-6"
    >
      <motion.h2 
        variants={fadeInUp}
        className="text-2xl font-bold flex items-center gap-2"
      >
        <Book className="w-6 h-6" />
        Education
      </motion.h2>
      {education.map((edu, index) => (
        <motion.div
          key={edu.school}
          variants={fadeInUp}
          className="border-l-2 border-primary/20 pl-6 relative"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2"
          />
          <h3 className="font-medium text-xl">{edu.degree}</h3>
          <p className="text-muted-foreground">{edu.school} • {edu.period}</p>
          <p className="text-sm text-muted-foreground"></p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function CertificationsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerChildren}
      className="space-y-6"
    >
      <motion.h2 
        variants={fadeInUp}
        className="text-2xl font-bold flex items-center gap-2"
      >
        <Award className="w-6 h-6" />
        Certifications
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="text-muted-foreground text-center italic"
      >
        Certifications will be added soon...
      </motion.p>
    </motion.div>
  )
}

function DownloadButton() {
  const handleDownload = () => {
    // TODO: Implement proper PDF generation
    const resumeData = {
      personalInfo,
      experiences,
      education,
      skills: skillCategories,
    }
    
    // For now, just console log
    console.log("Generating PDF with data:", resumeData)
    alert("PDF download functionality coming soon!")
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={handleDownload}
        className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30"
      >
        <Download className="w-4 h-4" />
        Download Resume
      </Button>
    </motion.div>
  )
}

// Main Component
export default function Resume() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalScroll) * 100
      setScrollProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black/95 pt-32 pb-20 relative overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary/50 z-50"
        style={{ scaleX: scrollProgress / 100, transformOrigin: '0%' }}
      />

      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto space-y-16"
        >
          {/* Header with Download Button */}
          <div className="text-center space-y-6">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
                bg-gradient-to-r from-primary via-primary/80 to-primary/60"
            >
              {personalInfo.name}
            </motion.h1>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-muted-foreground"
            >
              {personalInfo.title}
            </motion.p>
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-6 text-muted-foreground"
            >
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </a>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                {personalInfo.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {personalInfo.location}
              </span>
            </motion.div>

            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-3xl mx-auto text-lg text-muted-foreground"
            >
              {personalInfo.about}
            </motion.p>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <DownloadButton />
            </motion.div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={category.title}
                category={category}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Experience Section */}
          <ExperienceSection />

          {/* Education Section */}
          <EducationSection />

          {/* Add Certifications Section */}
          <CertificationsSection />
        </motion.div>
      </div>
    </div>
  )
}