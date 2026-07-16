import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { AnimatedSection } from '../ui/AnimatedSection'
import { reviews } from '../../data/reviews'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const initials = review.name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-azul-claro/30 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      >
        <div className="flex items-center gap-1 mb-3">
          <Quote className="w-5 h-5 text-azul/40" />
        </div>

        <p className="font-body text-sm text-cinza leading-relaxed mb-4 flex-1">
          {review.comment}
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-azul-claro/30">
          <div className="w-10 h-10 rounded-full bg-azul-claro flex items-center justify-center flex-shrink-0">
            <span className="font-accent text-sm font-bold text-chocolate">{initials}</span>
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-chocolate-escuro">
              {review.name}
            </p>
            <StarRating rating={review.rating} />
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}

export function Reviews() {
  return (
    <section id="avaliacoes" className="py-16 md:py-24 bg-creme">
      <div className="section-container">
        <SectionTitle
          title="O que dizem nossos clientes"
          subtitle="A satisfação de quem já experimentou nossos doces"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
