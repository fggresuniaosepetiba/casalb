import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-24 right-8 z-40 w-11 h-11 rounded-full bg-chocolate/80 backdrop-blur-sm text-white shadow-lg hover:bg-chocolate transition-colors focus:outline-none focus:ring-2 focus:ring-azul"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5 m-auto" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
