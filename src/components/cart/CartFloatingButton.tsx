import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

interface CartFloatingButtonProps {
  totalItems: number
  totalPrice: number
  onClick: () => void
}

export function CartFloatingButton({ totalItems, totalPrice, onClick }: CartFloatingButtonProps) {
  if (totalItems === 0) return null

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 md:w-auto z-40
                 bg-chocolate text-white rounded-2xl shadow-2xl
                 flex items-center justify-between md:justify-start
                 px-5 py-3.5 md:px-6 md:py-4 gap-4
                 hover:bg-chocolate-escuro transition-colors duration-300
                 focus:outline-none focus:ring-2 focus:ring-azul focus:ring-offset-2"
      aria-label={`Abrir carrinho com ${totalItems} itens`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 bg-azul text-chocolate-escuro text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        </div>
        <span className="font-body text-sm font-medium hidden md:inline">
          {totalItems} {totalItems === 1 ? 'item' : 'itens'}
        </span>
      </div>

      <div className="h-5 w-px bg-white/30 hidden md:block" />

      <div className="flex items-center gap-2">
        <span className="font-body text-sm font-semibold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(totalPrice)}
        </span>
        <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-accent font-semibold hidden md:inline">
          Ver Carrinho
        </span>
      </div>
    </motion.button>
  )
}
