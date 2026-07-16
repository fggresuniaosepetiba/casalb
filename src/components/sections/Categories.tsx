import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { AnimatedSection } from '../ui/AnimatedSection'
import { categories } from '../../data/categories'

interface CategoriesProps {
  onCategorySelect: (categoryId: string) => void
  selectedCategory: string | null
}

export function Categories({ onCategorySelect, selectedCategory }: CategoriesProps) {
  return (
    <section id="categorias" className="py-16 md:py-24 bg-creme">
      <div className="section-container">
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 border border-azul/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-chocolate" />
            <span className="font-accent text-sm font-semibold text-chocolate">
              Confeitaria Artesanal
            </span>
          </div>
        </div>

        <SectionTitle
          title="Nossas Categorias"
          subtitle="Explore nossa seleção de doces e salgados artesanais"
        />

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <AnimatedSection key={category.id} delay={index * 0.08}>
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full flex flex-col items-center gap-2 md:gap-3 p-4 md:p-5 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-azul ${
                  selectedCategory === category.id
                    ? 'bg-chocolate text-white shadow-lg shadow-chocolate/20'
                    : 'bg-white hover:bg-azul-claro/40 text-chocolate-escuro shadow-sm border border-azul-claro/40'
                }`}
                aria-pressed={selectedCategory === category.id}
              >
                <span className="text-3xl md:text-4xl" role="img" aria-label={category.name}>
                  {category.icon}
                </span>
                <span className="font-accent text-xs md:text-sm font-semibold text-center leading-tight">
                  {category.name}
                </span>
              </motion.button>
            </AnimatedSection>
          ))}
        </div>

        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => onCategorySelect(null as unknown as string)}
              className="font-body text-sm text-cinza hover:text-chocolate transition-colors underline underline-offset-4 focus:outline-none focus:text-chocolate"
            >
              Ver todas as categorias
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
