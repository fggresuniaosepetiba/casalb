import { createContext, useContext, type ReactNode } from 'react'
import { useCart } from '../hooks/useCart'
import type { CartItem, CartItemFlavor, Product } from '../types'

interface AddItemData {
  selectedOption?: string
  flavors?: CartItemFlavor[]
  fillingSurcharge?: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, data?: AddItemData) => void
  removeItem: (itemKey: string) => void
  updateQuantity: (itemKey: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
