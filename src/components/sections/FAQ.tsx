import { useState } from 'react'
import { SectionTitle } from '../ui/SectionTitle'
import { AnimatedSection } from '../ui/AnimatedSection'
import { AccordionItem } from '../ui/AccordionItem'
import { faqItems } from '../../data/faq'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  const leftItems = faqItems.slice(0, 4)
  const rightItems = faqItems.slice(4, 8)

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <SectionTitle
          title="Perguntas Frequentes"
          subtitle="Tire suas dúvidas sobre nossos produtos e serviços"
        />

        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-creme rounded-2xl border border-azul-claro/30 overflow-hidden">
              {leftItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </div>
            <div className="bg-creme rounded-2xl border border-azul-claro/30 overflow-hidden">
              {rightItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
