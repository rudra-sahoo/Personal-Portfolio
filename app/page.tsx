import Navigation from "@/components/ui/navigation"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Work from "@/components/sections/work"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import LoadingScreen from "@/components/loading-screen"
import ScrollProgress from "@/components/scroll-progress"

export default function Home() {
  return (
    <main className="relative">
      <LoadingScreen />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Work />
      <Contact />
      <Footer />
    </main>
  )
}