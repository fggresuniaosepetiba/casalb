import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, MessageCircle, AlertTriangle, ShoppingBag, CreditCard, Banknote } from 'lucide-react'
import { useCartContext } from '../../context/CartContext'
import { formatCurrency, getWhatsAppUrl } from '../../utils/whatsapp'
import type { PaymentMethod } from '../../types'

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: 'pix', label: 'PIX', icon: CreditCard },
  { id: 'debito', label: 'Débito', icon: CreditCard },
  { id: 'credito', label: 'Crédito', icon: CreditCard },
  { id: 'dinheiro', label: 'Dinheiro', icon: Banknote },
]

function getItemDisplayQty(item: { quantity: number; flavors?: { quantity: number }[] }): number {
  if (item.flavors) {
    return item.flavors.reduce((s, f) => s + f.quantity, 0)
  }
  return item.quantity
}

export function CartDrawer() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice, isDrawerOpen, closeDrawer } =
    useCartContext()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [cashAmount, setCashAmount] = useState('')

  const change = useMemo(() => {
    if (paymentMethod !== 'dinheiro' || !cashAmount) return null
    const parsed = parseFloat(cashAmount.replace(',', '.'))
    if (isNaN(parsed)) return null
    return parsed - totalPrice
  }, [paymentMethod, cashAmount, totalPrice])

  const canSend = paymentMethod !== null && (paymentMethod !== 'dinheiro' || (change !== null && change >= 0))

  const whatsappUrl = getWhatsAppUrl(items, paymentMethod ? {
    method: paymentMethod,
    cashAmount: paymentMethod === 'dinheiro' ? parseFloat(cashAmount.replace(',', '.')) : undefined,
  } : undefined)

  const handleSend = () => {
    clearCart()
    setPaymentMethod(null)
    setCashAmount('')
    closeDrawer()
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-chocolate" />
                <h2 className="font-heading text-xl text-chocolate-escuro">Meu Carrinho</h2>
              </div>
              <button
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-azul"
                aria-label="Fechar carrinho"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-cinza/40 mb-4" />
                  <p className="font-body text-cinza text-lg mb-2">Seu carrinho está vazio</p>
                  <p className="font-body text-cinza/70 text-sm">
                    Adicione produtos deliciosos para começar!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => {
                      const displayQty = getItemDisplayQty(item)
                      const centos = item.flavors ? Math.ceil(displayQty / 100) : 1
                      const itemTotal = item.product.price * centos * (item.flavors ? 1 : item.quantity) + (item.fillingSurcharge ?? 0)

                      return (
                        <motion.div
                          key={item.key}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="bg-creme rounded-xl p-3 border border-azul-claro/30"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1 pr-3">
                              <h3 className="font-body font-semibold text-chocolate-escuro text-sm">
                                {item.product.name}
                              </h3>

                              {item.flavors && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {item.flavors.map((f) => (
                                    <span key={f.name} className="font-body text-[11px] bg-white rounded-full px-2 py-0.5 border border-azul-claro/40 text-chocolate-escuro">
                                      {f.quantity}x {f.name}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {item.selectedOption && (
                                <p className="font-body text-xs text-azul font-semibold mt-1">
                                  {item.fillingSurcharge ? 'Recheio Especial' : 'Sabor'}: {item.selectedOption}
                                </p>
                              )}

                              <p className="font-body text-xs text-cinza mt-0.5">
                                {formatCurrency(item.product.price)} {item.flavors ? 'o cento' : 'cada'}
                              </p>

                              {item.fillingSurcharge && item.fillingSurcharge > 0 && (
                                <p className="font-body text-xs text-amber-600 font-semibold mt-0.5">
                                  + {formatCurrency(item.fillingSurcharge)} recheio especial
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.key)}
                              className="p-1.5 rounded-full hover:bg-red-50 text-cinza hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                              aria-label={`Remover ${item.product.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {!item.flavors && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border border-gray-200">
                                <button
                                  onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-azul-claro transition-colors focus:outline-none focus:ring-1 focus:ring-azul"
                                  aria-label="Diminuir quantidade"
                                >
                                  <Minus className="w-3.5 h-3.5 text-chocolate" />
                                </button>
                                <span className="font-body font-semibold text-sm text-chocolate-escuro min-w-[20px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-azul-claro transition-colors focus:outline-none focus:ring-1 focus:ring-azul"
                                  aria-label="Aumentar quantidade"
                                >
                                  <Plus className="w-3.5 h-3.5 text-chocolate" />
                                </button>
                              </div>
                              <span className="font-body font-semibold text-chocolate-escuro text-sm">
                                {formatCurrency(itemTotal)}
                              </span>
                            </div>
                          )}

                          {item.flavors && (
                            <div className="flex items-center justify-between mt-1">
                              <span className="font-body text-xs text-cinza">
                                {displayQty} unidades
                              </span>
                              <span className="font-body font-semibold text-chocolate-escuro text-sm">
                                {formatCurrency(itemTotal)}
                              </span>
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4">
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="font-body text-xs text-amber-700 leading-relaxed">
                    Valores aproximados. Para encomendas personalizadas, aguardamos confirmação pelo WhatsApp.
                  </p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-cinza text-sm">Total</span>
                  <span className="font-heading text-2xl text-chocolate-escuro">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="font-accent text-xs text-chocolate font-semibold mb-2">
                    Forma de pagamento:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-accent font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-azul ${
                          paymentMethod === opt.id
                            ? 'bg-chocolate text-white border-chocolate'
                            : 'bg-white text-chocolate-escuro border-azul-claro/50 hover:border-azul'
                        }`}
                      >
                        <opt.icon className="w-3.5 h-3.5" />
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {paymentMethod === 'dinheiro' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-4">
                        <label className="font-accent text-xs text-chocolate font-semibold mb-1.5 block">
                          Valor que vai pagar:
                        </label>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="Ex: 50,00"
                          value={cashAmount}
                          onChange={(e) => setCashAmount(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-azul-claro/50 bg-white font-body text-sm text-chocolate-escuro focus:outline-none focus:ring-2 focus:ring-azul focus:border-azul placeholder:text-cinza/50"
                        />
                        {change !== null && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`font-body text-xs mt-1.5 ${
                              change >= 0 ? 'text-sucesso font-semibold' : 'text-red-500 font-semibold'
                            }`}
                          >
                            {change >= 0
                              ? `Troco: ${formatCurrency(change)}`
                              : `Faltam ${formatCurrency(Math.abs(change))}`}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 text-center rounded-full px-6 py-3 font-body font-semibold transition-all duration-300 ${
                    canSend
                      ? 'btn-whatsapp'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                  }`}
                  onClick={handleSend}
                >
                  <MessageCircle className="w-5 h-5" />
                  Continuar no WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
