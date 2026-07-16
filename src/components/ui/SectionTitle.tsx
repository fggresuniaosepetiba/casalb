import { AnimatedSection } from './AnimatedSection'

interface SectionTitleProps {
  title: string
  subtitle?: string
  light?: boolean
}

export function SectionTitle({ title, subtitle, light = false }: SectionTitleProps) {
  return (
    <AnimatedSection className="text-center mb-10 md:mb-14">
      <h2
        className={`font-heading text-3xl sm:text-4xl md:text-5xl mb-4 ${
          light ? 'text-white' : 'text-chocolate-escuro'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-body text-base md:text-lg max-w-2xl mx-auto ${
            light ? 'text-white/80' : 'text-cinza'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className="mt-4 mx-auto w-20 h-1 bg-azul rounded-full" />
    </AnimatedSection>
  )
}
