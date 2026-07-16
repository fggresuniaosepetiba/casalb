import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

export function Hero() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-azul-claro via-creme to-creme"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[10%] w-24 h-24 md:w-36 md:h-36 bg-azul/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-32 right-[15%] w-32 h-32 md:w-48 md:h-48 bg-chocolate/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-[8%] w-16 h-16 md:w-24 md:h-24 bg-azul/30 rounded-full blur-lg"
        />
      </div>

      <div className="section-container relative z-10 text-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6 md:mb-8"
        >
          <img
            src="/images/casalb_logo.jpeg"
            alt="Casa LB - Confeitaria Artesanal"
            className="mx-auto h-28 sm:h-36 md:h-44 lg:h-52 w-auto object-contain drop-shadow-lg rounded-full"
            loading="eager"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-azul/30">
            <Sparkles className="w-4 h-4 text-chocolate" />
            <span className="font-accent text-sm font-semibold text-chocolate">
              Confeitaria Artesanal
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-chocolate-escuro mb-4 md:mb-6 leading-tight"
        >
          Doces que encantam
          <br />
          <span className="text-chocolate">e transformam</span>
          <br />
          momentos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="font-body text-cinza text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
        >
          Bolos personalizados, docinhos artesanais e sobremesas feitas com ingredientes
          selecionados e muito carinho para tornar seus dias ainda mais especiais.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('produtos')}
            className="btn-primary text-base px-8 py-4"
          >
            Ver Cardápio
          </button>
          <button
            onClick={() => scrollTo('sobre')}
            className="btn-secondary text-base px-8 py-4"
          >
            Conheça a Laura
          </button>
        </motion.div>

        <motion.button
          onClick={() => scrollTo('contato')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="mt-6 p-2.5 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors focus:outline-none focus:ring-2 focus:ring-azul mx-auto"
          aria-label="Rolar para o rodapé"
        >
          <ChevronDown className="w-5 h-5 text-chocolate" />
        </motion.button>
      </div>
    </section>
  )
}
