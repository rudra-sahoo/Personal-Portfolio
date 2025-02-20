"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useRef, useState, FormEvent, useEffect } from "react"
import { Send, Phone, Mail, MapPin, Loader2 } from "lucide-react"
import emailjs from '@emailjs/browser'

// Initialize EmailJS once
emailjs.init("YOUR_PUBLIC_KEY") // Replace with your actual public key

export default function Contact() {
  const sectionRef = useRef(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Add validation state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.05, 0.05, 0])
  const backgroundX = useTransform(scrollYProgress, [0, 1], [-50, 50])

  // Contact info animations
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Odisha, India",
      href: "https://goo.gl/maps/your-location-link"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 8093423855",
      href: "tel:+918093423855"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "contact@rudrasahoo.me",
      href: "mailto:contact@rudrasahoo.me"
    }
  ]

  // Enhanced form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Enhanced form validation
  const validateForm = () => {
    let isValid = true
    const newErrors = {
      name: '',
      email: '',
      message: ''
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Enhanced submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setFormStatus('loading')

    try {
      await emailjs.send(
        "service_xxxxxx",  // Replace with your actual service ID
        "template_xxxxxx", // Replace with your actual template ID
        formData
      )

      setFormStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => setFormStatus('idle'), 3000)
    } catch (error) {
      console.error('Failed to send email:', error)
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="min-h-screen relative py-32 bg-black/95"
    >
      <motion.div 
        className="frame-text absolute top-20 -left-20 text-[12rem] md:text-[16rem] font-bold z-0"
        style={{ 
          opacity: backgroundOpacity,
          x: backgroundX
        }}
      >
        CONTACT
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Get In Touch
          </h2>
          <motion.div 
            className="h-1 w-0 bg-primary rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-8 relative z-10"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.label === "Location" ? "_blank" : undefined}
                rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                initial={{ x: -20, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-6 p-6 rounded-xl bg-card/10 backdrop-blur-sm border border-primary/10 
                  hover:border-primary/30 transition-all group cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ type: "spring", duration: 0.8, delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  {info.icon}
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            initial={{ x: 50, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/10 border 
                  ${errors.name ? 'border-red-500' : 'border-primary/10'} 
                  focus:border-primary/30 focus:ring-1 focus:ring-primary/30 
                  transition-all outline-none relative z-10`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative z-10"
            >
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/10 border 
                  ${errors.email ? 'border-red-500' : 'border-primary/10'} 
                  focus:border-primary/30 focus:ring-1 focus:ring-primary/30 
                  transition-all outline-none relative z-10`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10"
            >
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/10 border 
                  ${errors.message ? 'border-red-500' : 'border-primary/10'} 
                  focus:border-primary/30 focus:ring-1 focus:ring-primary/30 
                  transition-all outline-none resize-none relative z-10`}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={formStatus === 'loading'}
              className={`w-full py-4 rounded-lg bg-primary text-primary-foreground flex items-center justify-center gap-2
                transition-all ${formStatus === 'loading' ? 'opacity-70' : 'hover:opacity-90'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formStatus === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : formStatus === 'success' ? (
                'Message Sent!'
              ) : formStatus === 'error' ? (
                'Failed to send. Try again.'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}