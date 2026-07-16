import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '../ui/AnimatedSection'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { WHATSAPP_PHONE } from '../../data/whatsapp'

export function CTAFinal() {
  const { scrollTo } = useSmoothScroll()

  return (
    <section id="contato" className="py-16 md:py-24 bg-gradient-to-br from-chocolate to-chocolate-escuro relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-[10%] w-40 h-40 bg-azul/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-10 left-[15%] w-32 h-32 bg-white/5 rounded-full blur-2xl"
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block text-5xl md:text-6xl mb-6"
            >
              🎂
            </motion.span>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white mb-4 md:mb-6">
              Pronto para adoçar seu dia?
            </h2>

            <p className="font-body text-white/70 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
              Entre em contato pelo WhatsApp e faça seu pedido agora mesmo.
              Estamos prontos para criar algo especial para você!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-8 py-4 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Fale Conosco no WhatsApp
              </a>
              <button
                onClick={() => scrollTo('produtos')}
                className="font-body text-white/80 hover:text-white flex items-center gap-2 transition-colors focus:outline-none focus:underline"
              >
                Ver Cardápio
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
