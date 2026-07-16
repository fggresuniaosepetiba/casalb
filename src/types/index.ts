export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: string
  featured?: boolean
  tags?: string[]
  options?: string[]
  specialOptions?: string[]
  minQuantity?: number
  isCento?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  image?: string
}

export interface CartItemFlavor {
  name: string
  quantity: number
}

export interface CartItem {
  key: string
  product: Product
  quantity: number
  selectedOption?: string
  flavors?: CartItemFlavor[]
  fillingSurcharge?: number
  observation?: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface Review {
  id: string
  name: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

export type PaymentMethod = 'pix' | 'debito' | 'credito' | 'dinheiro'

export interface PaymentInfo {
  method: PaymentMethod
  cashAmount?: number
}

export type SectionId =
  | 'hero'
  | 'categorias'
  | 'produtos'
  | 'sobre'
  | 'avaliacoes'
  | 'faq'
  | 'contato'
