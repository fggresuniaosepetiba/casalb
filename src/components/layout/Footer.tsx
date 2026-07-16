import { Instagram, MessageCircle } from 'lucide-react'
import { WHATSAPP_PHONE } from '../../data/whatsapp'

const INSTAGRAM_URL = 'https://www.instagram.com/lb_docescomamor/'

const footerLinks = {
  institucional: [
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Avaliações', href: '#avaliacoes' },
    { label: 'FAQ', href: '#faq' },
  ],
  contato: [
    { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_PHONE}`, external: true },
    { label: 'Instagram', href: INSTAGRAM_URL, external: true },
  ],
}

export function Footer() {
  return (
    <footer className="bg-chocolate-escuro text-white">
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 mb-4 border border-white/10">
              <img
                src="/images/casalb_logo.jpeg"
                alt="Casa LB Logo"
                className="h-14 md:h-16 w-auto object-contain rounded-full"
                loading="lazy"
              />
            </div>
            <p className="font-body text-white/70 text-sm text-center md:text-left max-w-xs leading-relaxed">
              Confeitaria artesanal feita com amor e carinho. Doces que transformam momentos especiais em memórias inesquecíveis.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading text-lg mb-4 text-azul">Links Rápidos</h4>
            <nav aria-label="Links do rodapé">
              <ul className="flex flex-col gap-2.5">
                {footerLinks.institucional.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-white/70 hover:text-azul transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading text-lg mb-4 text-azul">Contato</h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.contato.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="font-body text-sm text-white/70 hover:text-azul transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.label === 'Instagram' && <Instagram className="w-4 h-4" />}
                    {link.label === 'WhatsApp' && <MessageCircle className="w-4 h-4" />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="font-body text-xs text-white/50 text-center flex items-center justify-center gap-1.5">
            Feito com 💙 &copy; 2026 Casa LB de Doces. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
