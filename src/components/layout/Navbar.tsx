import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

interface NavbarProps {
  totalItems: number
  onCartClick: () => void
}

const navLinks = [
  { label: 'Início', id: 'hero' },
  { label: 'Produtos', id: 'produtos' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Avaliações', id: 'avaliacoes' },
  { label: 'FAQ', id: 'faq' },
]

export function Navbar({ totalItems, onCartClick }: NavbarProps) {
  const { scrollDirection, isScrolled } = useScrollDirection()
  const { scrollTo } = useSmoothScroll()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => scrollTo(id), 100)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: scrollDirection === 'down' && !isMobileMenuOpen ? -100 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-azul rounded-lg"
              aria-label="Casa LB - Ir para o início"
            >
              <img
                src="/images/casalb_logo.jpeg"
                alt="Casa LB Logo"
                className="h-10 md:h-14 w-auto object-contain rounded-full"
                loading="eager"
              />
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="font-body text-sm font-medium text-texto hover:text-chocolate transition-colors duration-200 relative group focus:outline-none focus:text-chocolate"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-azul rounded-full transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onCartClick}
                className="relative p-2.5 rounded-full hover:bg-azul-claro/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azul"
                aria-label={`Carrinho - ${totalItems} itens`}
              >
                <ShoppingCart className="w-5 h-5 text-chocolate" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-chocolate text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      {totalItems > 99 ? '99+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-full hover:bg-azul-claro/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-azul"
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-chocolate" />
                ) : (
                  <Menu className="w-5 h-5 text-chocolate" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-xl rounded-b-2xl mx-4"
            >
              <div className="py-4 px-6 flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    onClick={() => handleNavClick(link.id)}
                    className="py-3 px-4 text-left font-body font-medium text-texto hover:text-chocolate hover:bg-azul-claro/30 rounded-xl transition-all duration-200 focus:outline-none focus:bg-azul-claro/30"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
