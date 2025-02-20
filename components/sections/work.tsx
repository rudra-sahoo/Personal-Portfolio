"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, Code2, GitFork, Star, Activity } from "lucide-react"

interface Repository {
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  languages_url: string
  updated_at: string
  fork: boolean
}

interface LanguageData {
  [key: string]: number
}

export default function Work() {
  const sectionRef = useRef(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null)
  const [languages, setLanguages] = useState<LanguageData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Add pagination states with validation
  const [currentPage, setCurrentPage] = useState(1)
  const [totalRepos, setTotalRepos] = useState(0)
  const reposPerPage = 9

  // Helper function to generate page numbers
  const getPageNumbers = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    
    if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
    if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.05, 0.05, 0])
  const backgroundX = useTransform(scrollYProgress, [0, 1], [50, -50])

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  // Update fetch repos function with better error handling
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        const userResponse = await fetch('https://api.github.com/users/rudra-sahoo');
        
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await userResponse.json();
        const totalRepoCount = userData.public_repos;
        setTotalRepos(totalRepoCount);

        const response = await fetch(
          `https://api.github.com/users/rudra-sahoo/repos?sort=updated&per_page=${reposPerPage}&page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();
        
        const sortedRepos = data
          .sort((a: Repository, b: Repository) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          });

        setRepos(sortedRepos);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, [currentPage, reposPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(totalRepos / reposPerPage)

  // Update pagination controls component
  const PaginationControls = () => {
    if (totalPages <= 0) return null;

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
      <div className="flex justify-center items-center gap-4 mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border border-primary/20 
            ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'}`}
        >
          Previous
        </motion.button>
        
        <div className="flex items-center gap-2">
          {pageNumbers.map((pageNumber, index) => (
            pageNumber === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2">...</span>
            ) : (
              <motion.button
                key={`page-${pageNumber}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage(Number(pageNumber))}
                className={`w-8 h-8 rounded-lg flex items-center justify-center
                  ${currentPage === pageNumber 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-primary/10'}`}
              >
                {pageNumber}
              </motion.button>
            )
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border border-primary/20 
            ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10'}`}
        >
          Next
        </motion.button>
      </div>
    );
  };

  // Fetch languages for selected repository
  const fetchLanguages = async (languagesUrl: string) => {
    try {
      const response = await fetch(languagesUrl)
      if (!response.ok) {
        throw new Error('Failed to fetch languages')
      }
      const data = await response.json()
      setLanguages(data)
    } catch (error) {
      console.error('Error fetching languages:', error)
      setLanguages({})
    }
  }

  // Calculate language percentages
  const calculatePercentages = (languages: LanguageData) => {
    const total = Object.values(languages).reduce((a, b) => a + b, 0)
    return Object.entries(languages).map(([name, value]) => ({
      name,
      percentage: ((value / total) * 100).toFixed(1)
    }))
  }

  // Update language color mapping with more languages
  const languageColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    Kotlin: '#A97BFF',
    Swift: '#ffac45',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Go: '#00ADD8',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Rust: '#dea584',
    Dart: '#00B4AB',
    Vue: '#41b883',
    React: '#61dafb',
    Shell: '#89e051',
    PowerShell: '#012456',
    Dockerfile: '#384d54',
    Jupyter: '#DA5B0B',
  }

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="min-h-screen relative py-32 bg-black/95"
    >
      <motion.div 
        className="frame-text absolute top-20 right-10 text-[12rem] md:text-[16rem] font-bold"
        style={{ 
          opacity: backgroundOpacity,
          x: backgroundX
        }}
      >
        WORK
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
            Featured Projects
          </h2>
          <motion.div 
            className="h-1 w-0 bg-primary rounded-full mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my open-source projects and contributions.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(reposPerPage)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card/10 rounded-2xl p-6 h-[300px] animate-pulse"
              >
                <div className="h-4 bg-primary/10 rounded w-3/4 mb-4" />
                <div className="h-20 bg-primary/5 rounded mb-4" />
                <div className="flex gap-2">
                  <div className="h-3 bg-primary/10 rounded w-16" />
                  <div className="h-3 bg-primary/10 rounded w-16" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <>
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all cursor-pointer"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredCard(repo.name)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => {
                    setSelectedRepo(repo)
                    fetchLanguages(repo.languages_url)
                  }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-2xl"
                    initial={false}
                    animate={{
                      opacity: hoveredCard === repo.name ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {repo.name}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {repo.description || "No description available"}
                        </p>
                      </div>
                      <Code2 className="w-6 h-6 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                      {repo.language && (
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: languageColors[repo.language] || '#ddd' }}
                          />
                          {repo.language}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GitFork className="w-4 h-4" />
                        {repo.forks_count}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Add pagination controls */}
            <PaginationControls />
          </>
        )}
      </div>

      {/* Updated Repository Details Modal */}
      <AnimatePresence>
        {selectedRepo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRepo(null)}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-card/95 backdrop-blur-md w-full max-w-2xl rounded-2xl p-6 shadow-xl border border-primary/10"
              onClick={e => e.stopPropagation()}
              style={{ cursor: 'default' }}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedRepo.name}</h2>
                <div className="flex gap-2">
                  {selectedRepo.homepage && (
                    <Link 
                      href={selectedRepo.homepage}
                      target="_blank"
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                      style={{ cursor: 'pointer' }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  )}
                  <Link 
                    href={selectedRepo.html_url}
                    target="_blank"
                    className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    style={{ cursor: 'pointer' }}
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                {selectedRepo.description}
              </p>

              {Object.keys(languages).length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Language Distribution
                  </h3>
                  <div className="h-2 rounded-full bg-primary/10 overflow-hidden flex">
                    {calculatePercentages(languages).map(({ name, percentage }, index) => (
                      <motion.div
                        key={name}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        style={{ 
                          backgroundColor: languageColors[name] || '#ddd',
                        }}
                        className="h-full first:rounded-l-full last:rounded-r-full"
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {calculatePercentages(languages).map(({ name, percentage }) => (
                      <div key={name} className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: languageColors[name] || '#ddd' }}
                        />
                        <span>{name}</span>
                        <span className="text-muted-foreground">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}