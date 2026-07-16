import { useState, useCallback, useEffect } from 'react'
import type { CartItem, CartItemFlavor, Product } from '../types'

const CART_STORAGE_KEY = 'casa-lb-cart'

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as CartItem[]
    }
  } catch {
    // Ignore parse errors
  }
  return []
}

function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Ignore storage errors
  }
}

interface AddItemData {
  selectedOption?: string
  flavors?: CartItemFlavor[]
  fillingSurcharge?: number
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    saveCartToStorage(items)
  }, [items])

  const addItem = useCallback((product: Product, data?: AddItemData) => {
    const isCento = product.isCento

    let key: string
    if (isCento) {
      key = product.id
    } else if (data?.selectedOption) {
      key = `${product.id}__${data.selectedOption}`
    } else {
      key = product.id
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.key === key)

      if (isCento && data?.flavors) {
        const newItem: CartItem = {
          key,
          product,
          quantity: 1,
          flavors: data.flavors,
        }
        if (existing) {
          return prev.map((item) => item.key === key ? newItem : item)
        }
        return [...prev, newItem]
      }

      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      return [...prev, {
        key,
        product,
        quantity: 1,
        selectedOption: data?.selectedOption,
        fillingSurcharge: data?.fillingSurcharge,
      }]
    })
  }, [])

  const removeItem = useCallback((itemKey: string) => {
    setItems((prev) => prev.filter((item) => item.key !== itemKey))
  }, [])

  const updateQuantity = useCallback((itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.key !== itemKey))
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.key === itemKey ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => {
    if (item.flavors) {
      return sum + item.flavors.reduce((fs, f) => fs + f.quantity, 0)
    }
    return sum + item.quantity
  }, 0)

  const totalPrice = items.reduce((sum, item) => {
    let base: number
    if (item.flavors) {
      const totalUnits = item.flavors.reduce((s, f) => s + f.quantity, 0)
      const centos = Math.ceil(totalUnits / 100)
      base = item.product.price * centos
    } else {
      base = item.product.price * item.quantity
    }
    const surcharge = item.fillingSurcharge ?? 0
    return sum + base + surcharge
  }, 0)

  const openDrawer = useCallback(() => setIsDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  }
}
