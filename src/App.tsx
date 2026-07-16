import { useState, useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Categories } from './components/sections/Categories'
import { Products } from './components/sections/Products'
import { AboutLaura } from './components/sections/AboutLaura'
import { Reviews } from './components/sections/Reviews'
import { FAQ } from './components/sections/FAQ'
import { CTAFinal } from './components/sections/CTAFinal'
import { CartDrawer } from './components/cart/CartDrawer'
import { CartFloatingButton } from './components/cart/CartFloatingButton'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { useCartContext } from './context/CartContext'

function AppContent() {
  const { totalItems, totalPrice, openDrawer } = useCartContext()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-creme">
      <Navbar totalItems={totalItems} onCartClick={openDrawer} />

      <main>
        <Hero />
        <Categories
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <Products selectedCategory={selectedCategory} />
        <AboutLaura />
        <Reviews />
        <FAQ />
        <CTAFinal />
      </main>

      <Footer />

      <CartDrawer />

      <CartFloatingButton
        totalItems={totalItems}
        totalPrice={totalPrice}
        onClick={openDrawer}
      />

      <ScrollToTop />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
