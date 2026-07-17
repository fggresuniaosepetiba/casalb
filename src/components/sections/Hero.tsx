import { motion } from 'framer-motion'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'

export function Hero() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FDF5EC 30%, #F8EDE0 60%, #F5E8D8 100%)',
      }}
    >
      {/* Desktop: full background image */}
      <img
        src="/images/image_hero_2.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-[65%_center] hidden md:block"
        loading="eager"
      />

      {/* Mobile: image contained, visible */}
      <div className="absolute inset-0 md:hidden flex items-center justify-center">
        <img
          src="/images/image_hero_2.png"
          alt=""
          aria-hidden="true"
          className="w-full h-[55vh] object-contain object-center"
          loading="eager"
        />
      </div>

      {/* Desktop overlay */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: 'linear-gradient(to right, rgba(255,248,240,0.92) 0%, rgba(255,248,240,0.70) 30%, rgba(255,248,240,0.15) 55%, rgba(255,248,240,0) 70%)',
        }}
      />

      {/* Mobile overlay — very light so cake is visible */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,248,240,0.60) 0%, rgba(255,248,240,0.10) 40%, rgba(255,248,240,0.10) 55%, rgba(255,248,240,0.85) 80%, rgba(255,248,240,0.97) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end md:justify-center px-6 sm:px-10 lg:px-16 xl:px-24 pb-12 md:pb-0 pt-32 md:pt-32">
        <div className="max-w-[520px]">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[4.2rem] text-chocolate-escuro leading-[1.1] mb-5 md:mb-6"
          >
            Doces que{' '}
            <span className="text-azul italic">encantam</span>
            <br />
            e transformam
            <br />
            momentos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-cinza text-sm md:text-base lg:text-lg max-w-md mb-8 md:mb-10 leading-relaxed"
          >
            Bolos personalizados, docinhos artesanais e sobremesas feitas com ingredientes
            selecionados e muito carinho para tornar seus dias ainda mais especiais. Fale conosco no WhatsApp
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center md:items-start gap-4"
          >
            <button
              onClick={() => scrollTo('produtos')}
              className="btn-primary text-sm md:text-base px-7 py-3.5"
            >
              Ver Cardápio
            </button>
            <button
              onClick={() => scrollTo('sobre')}
              className="btn-secondary text-sm md:text-base px-7 py-3.5"
            >
              Conheça a Laura
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
