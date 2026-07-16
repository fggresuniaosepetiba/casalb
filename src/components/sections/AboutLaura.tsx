import { motion } from 'framer-motion'
import { Heart, Award, Clock } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { AnimatedSection } from '../ui/AnimatedSection'

const highlights = [
  {
    icon: Heart,
    title: 'Feito com Amor',
    description: 'Cada doce é preparado com carinho, dedicação e atenção aos mínimos detalhes, como se fosse feito para alguém muito especial.',
  },
  {
    icon: Award,
    title: 'Ingredientes Premium',
    description: 'Utilizamos apenas ingredientes selecionados de alta qualidade em todas as nossas receitas.',
  },
  {
    icon: Clock,
    title: 'Sempre Frescos',
    description: 'Preparados diariamente para garantir que você receba sempre o melhor sabor.',
  },
]

export function AboutLaura() {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-creme overflow-hidden">
      <div className="section-container">
        <SectionTitle
          title="Conheça a Laura"
          subtitle="A paixão por confeitaria que transforma sonhos em doces realidade"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <AnimatedSection>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="/images/foto_laura.png"
                  alt="Laura Peixoto - Confeiteira da Casa LB"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-6 -right-4 md:-right-6 bg-white rounded-2xl shadow-xl p-4 md:p-5 border border-azul-claro/30"
              >
                <p className="font-heading text-2xl md:text-3xl text-chocolate mb-0.5">+100</p>
                <p className="font-body text-xs text-cinza">Clientes felizes</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -top-4 -left-4 md:-left-6 bg-chocolate text-white rounded-2xl shadow-xl p-4 md:p-5"
              >
                <p className="font-heading text-2xl md:text-3xl mb-0.5">+10</p>
                <p className="font-body text-xs text-white/80">Anos de experiência</p>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <h3 className="font-heading text-2xl md:text-3xl text-chocolate-escuro">
                Uma história de amor pela confeitaria
              </h3>

              <div className="space-y-4 font-body text-cinza text-sm md:text-base leading-relaxed">
                <p>
                  Uma história construída com carinho, dedicação e muitos momentos especiais.
                </p>
                <p>
                  Sou Laura Peixoto, fundadora da Casa LB de Doces e apaixonada pela confeitaria há mais de 10 anos. O que começou como um hobby, movido pelo prazer de preparar doces para familiares e amigos, transformou-se em um sonho realizado e em uma marca que hoje participa de aniversários, casamentos, batizados, mesversários e tantas outras celebrações. Teste
                </p>
                <p>
                  Acredito que cada doce tem o poder de criar memórias afetivas. Por isso, escolho cuidadosamente cada ingrediente, preparo cada receita de forma artesanal e acompanho pessoalmente cada detalhe da produção, garantindo qualidade, sabor e uma apresentação que encanta antes mesmo da primeira mordida.
                </p>
                <p>
                  Mais do que vender doces, meu propósito é fazer parte de momentos inesquecíveis, entregando carinho em forma de sabor para tornar cada celebração ainda mais especial.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 items-stretch">
                {highlights.map((item, index) => (
                  <AnimatedSection key={item.title} delay={0.3 + index * 0.1}>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-xl p-4 border border-azul-claro/30 text-center h-full flex flex-col"
                    >
                      <item.icon className="w-6 h-6 text-azul mx-auto mb-2" />
                      <h4 className="font-accent text-sm font-semibold text-chocolate-escuro mb-1">
                        {item.title}
                      </h4>
                      <p className="font-body text-xs text-cinza leading-relaxed flex-1">
                        {item.description}
                      </p>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
