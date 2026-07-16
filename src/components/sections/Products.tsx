import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Check, Star, AlertTriangle } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Badge } from '../ui/Badge'
import { useCartContext } from '../../context/CartContext'
import { products } from '../../data/products'
import { categories } from '../../data/categories'
import { formatCurrency } from '../../utils/whatsapp'
import type { CartItemFlavor } from '../../types'

interface ProductsProps {
  selectedCategory: string | null
}

export function Products({ selectedCategory }: ProductsProps) {
  const { addItem, items } = useCartContext()
  const [addedId, setAddedId] = useState<string | null>(null)
  const [openOptionsId, setOpenOptionsId] = useState<string | null>(null)
  const [optionQuantities, setOptionQuantities] = useState<Record<string, number>>({})
  const [boloModal, setBoloModal] = useState<{ productId: string; option: string } | null>(null)

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products

  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c.id === categoryId)?.name ?? ''

  const handleAddClick = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product?.options && product.options.length > 0) {
      setOpenOptionsId((prev) => (prev === productId ? null : productId))
      setOptionQuantities({})
      return
    }
    handleAddSimple(productId)
  }

  const handleAddSimple = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addItem(product)
      setAddedId(productId)
      setTimeout(() => setAddedId(null), 1500)
    }
  }

  const updateOptionQty = (option: string, delta: number) => {
    setOptionQuantities((prev) => {
      const current = prev[option] ?? 0
      const next = Math.max(0, current + delta)
      if (next === 0) {
        const { [option]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [option]: next }
    })
  }

  const handleTypedQty = (option: string, raw: string) => {
    const digits = raw.replace(/\D/g, '')
    if (digits === '') {
      setOptionQuantities((prev) => {
        const { [option]: _, ...rest } = prev
        return rest
      })
      return
    }
    const qty = parseInt(digits, 10)
    setOptionQuantities((prev) => ({ ...prev, [option]: qty }))
  }

  const getValidation = (product: typeof products[0]) => {
    const min = product.minQuantity
    const isCento = product.isCento
    const activeFlavors = Object.entries(optionQuantities).filter(([, q]) => q > 0)
    const totalQty = Object.values(optionQuantities).reduce((s, q) => s + q, 0)
    const flavorCount = activeFlavors.length
    const minPerFlavor = 25

    const errors: string[] = []

    if (min) {
      if (totalQty > 0 && totalQty < min) {
        errors.push(`Pedido mínimo de ${min} unidades.`)
      }
    }

    if (isCento) {
      const maxFlavors = Math.max(4, Math.floor(totalQty / 100) * 4)
      if (flavorCount > maxFlavors) {
        errors.push(`Máximo de ${maxFlavors} sabores para ${totalQty} unidades.`)
      }
      for (const [name, qty] of activeFlavors) {
        if (qty < minPerFlavor) {
          errors.push(`"${name}" precisa de no mínimo ${minPerFlavor} unidades.`)
        }
      }
      if (totalQty > 0 && totalQty < 100) {
        errors.push(`O pedido mínimo para Docinhos é de 100 unidades.`)
      }
    }

    return { errors, totalQty, flavorCount, isValid: errors.length === 0 && totalQty > 0 }
  }

  const handleConfirmOptions = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    if (product.isCento) {
      const flavors: CartItemFlavor[] = Object.entries(optionQuantities)
        .filter(([, q]) => q > 0)
        .map(([name, quantity]) => ({ name, quantity }))

      addItem(product, { flavors })
    } else {
      for (const [option, qty] of Object.entries(optionQuantities)) {
        for (let i = 0; i < qty; i++) {
          addItem(product, { selectedOption: option })
        }
      }
    }

    setOpenOptionsId(null)
    setOptionQuantities({})
    setAddedId(productId)
    setTimeout(() => setAddedId(null), 1500)
  }

  const handleBoloOptionClick = (productId: string, option: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    const isSpecial = product.specialOptions?.includes(option)
    if (isSpecial) {
      setBoloModal({ productId, option })
    } else {
      addItem(product, { selectedOption: option })
      setOpenOptionsId(null)
      setOptionQuantities({})
      setAddedId(productId)
      setTimeout(() => setAddedId(null), 1500)
    }
  }

  const confirmBoloSpecial = () => {
    if (!boloModal) return
    const product = products.find((p) => p.id === boloModal.productId)
    if (!product) return

    addItem(product, { selectedOption: boloModal.option, fillingSurcharge: 15 })
    setBoloModal(null)
    setOpenOptionsId(null)
    setOptionQuantities({})
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  const getItemQuantity = (productId: string) =>
    items.find((item) => item.product.id === productId)?.quantity ?? 0

  return (
    <section id="produtos" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <SectionTitle
          title="Nossos Produtos"
          subtitle="Doces e salgados artesanais feitos com amor"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const qty = getItemQuantity(product.id)
              const justAdded = addedId === product.id
              const hasOptions = product.options && product.options.length > 0
              const isOptionsOpen = openOptionsId === product.id
              const isBolo = product.specialOptions && product.specialOptions.length > 0
              const validation = isOptionsOpen ? getValidation(product) : null

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                >
                  <AnimatedSection delay={index * 0.05}>
                    <motion.div
                      whileHover={!isOptionsOpen ? { y: -4 } : undefined}
                      className="bg-creme rounded-2xl overflow-hidden border border-azul-claro/30 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
                    >
                      <div className="relative h-44 bg-azul-claro/30 flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-6xl opacity-60">
                            {categories.find((c) => c.id === product.categoryId)?.icon ?? '🍰'}
                          </span>
                        )}

                        {product.tags && product.tags.length > 0 && (
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            {product.tags.map((tag) => (
                              <Badge
                                key={tag}
                                text={tag}
                                variant={tag === 'mais vendido' ? 'success' : 'accent'}
                              />
                            ))}
                          </div>
                        )}

                        {qty > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-3 right-3 bg-chocolate text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                          >
                            {qty}
                          </motion.div>
                        )}
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="font-body font-semibold text-chocolate-escuro text-sm leading-snug">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-0.5 flex-shrink-0">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="font-body text-xs text-cinza">5.0</span>
                          </div>
                        </div>

                        <span className="font-accent text-xs text-azul font-semibold mb-2">
                          {getCategoryName(product.categoryId)}
                        </span>

                        <p className="font-body text-xs text-cinza leading-relaxed mb-3 line-clamp-2 flex-1">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-azul-claro/30">
                          <span className="font-heading text-lg text-chocolate">
                            {formatCurrency(product.price)}
                          </span>

                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => handleAddClick(product.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-accent font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-azul ${
                              justAdded
                                ? 'bg-sucesso text-white'
                                : isOptionsOpen
                                  ? 'bg-chocolate-escuro text-white'
                                  : 'bg-chocolate text-white hover:bg-chocolate-escuro'
                            }`}
                            aria-label={`Adicionar ${product.name} ao carrinho`}
                          >
                            {justAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                Adicionado
                              </>
                            ) : hasOptions ? (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                Escolher
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                Adicionar
                              </>
                            )}
                          </motion.button>
                        </div>

                        <AnimatePresence>
                          {isOptionsOpen && product.options && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pt-3 mt-3 border-t border-azul-claro/30">
                                <p className="font-accent text-xs text-chocolate font-semibold mb-2">
                                  {product.isCento
                                    ? 'Monte seu cento:'
                                    : isBolo
                                      ? 'Escolha o recheio:'
                                      : product.minQuantity
                                        ? `Escolha os sabores (mín. ${product.minQuantity}):`
                                        : 'Escolha os sabores:'}
                                </p>

                                {isBolo ? (
                                  <div className="flex flex-col gap-2">
                                    {product.options?.map((option) => (
                                      <motion.button
                                        key={option}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleBoloOptionClick(product.id, option)}
                                        className="w-full text-left px-3 py-2.5 rounded-xl bg-white border border-azul-claro/40 hover:bg-azul-claro/40 transition-colors font-body text-xs text-chocolate-escuro focus:outline-none focus:ring-2 focus:ring-azul"
                                      >
                                        {option}
                                      </motion.button>
                                    ))}
                                    {product.specialOptions?.map((option) => (
                                      <motion.button
                                        key={option}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleBoloOptionClick(product.id, option)}
                                        className="w-full text-left px-3 py-2.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 transition-colors font-body text-xs text-chocolate-escuro focus:outline-none focus:ring-2 focus:ring-amber-400 flex items-center justify-between"
                                      >
                                        <span>{option}</span>
                                        <span className="text-amber-600 font-semibold">+ R$ 15,00</span>
                                      </motion.button>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex flex-col gap-2">
                                    {product.options.map((option) => {
                                      const optQty = optionQuantities[option] ?? 0
                                      const showTyped = product.isCento || (product.minQuantity && product.minQuantity >= 20)

                                      return (
                                        <div
                                          key={option}
                                          className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-azul-claro/40"
                                        >
                                          <span className="font-body text-xs text-chocolate-escuro font-medium">
                                            {option}
                                          </span>
                                          <div className="flex items-center gap-2">
                                            <button
                                              onClick={() => updateOptionQty(option, -1)}
                                              disabled={optQty === 0}
                                              className="w-7 h-7 rounded-full flex items-center justify-center bg-creme hover:bg-azul-claro disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-1 focus:ring-azul"
                                              aria-label={`Diminuir ${option}`}
                                            >
                                              <Minus className="w-3 h-3 text-chocolate" />
                                            </button>
                                            {showTyped ? (
                                              <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                value={optQty || ''}
                                                onChange={(e) => handleTypedQty(option, e.target.value)}
                                                placeholder="0"
                                                className="w-12 h-7 text-center font-body text-sm font-semibold text-chocolate-escuro bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                aria-label={`Quantidade de ${option}`}
                                              />
                                            ) : (
                                              <span className="font-body text-sm font-semibold text-chocolate-escuro min-w-[20px] text-center">
                                                {optQty}
                                              </span>
                                            )}
                                            <button
                                              onClick={() => updateOptionQty(option, 1)}
                                              className="w-7 h-7 rounded-full flex items-center justify-center bg-creme hover:bg-azul-claro transition-colors focus:outline-none focus:ring-1 focus:ring-azul"
                                              aria-label={`Aumentar ${option}`}
                                            >
                                              <Plus className="w-3 h-3 text-chocolate" />
                                            </button>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}

                                {validation && validation.errors.length > 0 && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 flex items-start gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                                  >
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                                    <div className="flex flex-col gap-0.5">
                                      {validation.errors.map((err) => (
                                        <p key={err} className="font-body text-[11px] text-red-600 leading-snug">
                                          {err}
                                        </p>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}

                                {validation && validation.isValid && !isBolo && (
                                  <motion.button
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => handleConfirmOptions(product.id)}
                                    className="w-full mt-3 py-2.5 rounded-xl bg-chocolate text-white font-accent text-xs font-semibold hover:bg-chocolate-escuro transition-colors focus:outline-none focus:ring-2 focus:ring-azul"
                                  >
                                    {product.isCento
                                      ? `Adicionar ${validation.totalQty} unidades — ${formatCurrency(product.price * Math.ceil(validation.totalQty / 100))}`
                                      : `Adicionar ${validation.totalQty} ${validation.totalQty === 1 ? 'item' : 'itens'}`}
                                  </motion.button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-body text-cinza py-12"
          >
            Nenhum produto encontrado nesta categoria.
          </motion.p>
        )}
      </div>

      <AnimatePresence>
        {boloModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setBoloModal(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm pointer-events-auto"
                role="dialog"
                aria-modal="true"
                aria-label="Recheio especial"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="font-heading text-lg text-chocolate-escuro mb-2">
                    Recheio Especial
                  </h3>
                  <p className="font-body text-sm text-cinza leading-relaxed mb-1">
                    O recheio <strong className="text-chocolate-escuro">{boloModal.option}</strong> é um recheio especial e possui um adicional de <strong className="text-chocolate-escuro">R$ 15,00</strong> sobre o valor do bolo.
                  </p>
                  <p className="font-body text-sm text-cinza mb-6">
                    Deseja continuar?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setBoloModal(null)}
                      className="flex-1 py-2.5 rounded-xl border border-gray-300 font-accent text-sm font-semibold text-cinza hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={confirmBoloSpecial}
                      className="flex-1 py-2.5 rounded-xl bg-chocolate text-white font-accent text-sm font-semibold hover:bg-chocolate-escuro transition-colors focus:outline-none focus:ring-2 focus:ring-chocolate"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
