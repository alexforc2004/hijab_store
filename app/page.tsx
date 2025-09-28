"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReviewsSection } from "@/components/reviews-section"
import { ContactSection } from "@/components/contact-section"
import { CartDrawer } from "@/components/cart-drawer"
import { OrderSuccess } from "@/components/order-success"
import { OrderTracking } from "@/components/order-tracking"
import { WishlistDrawer } from "@/components/wishlist-drawer"

// Mock data for products (in real app, this would come from API)
const products = [
  {
    id: 1,
    name_ar: "حجاب حريري وردي",
    name_en: "Pink Silk Hijab",
    price: 150.0,
    image_url: "/pink-silk-hijab.jpg",
    category: "حريري",
    is_featured: true,
  },
  {
    id: 2,
    name_ar: "حجاب قطني أزرق",
    name_en: "Blue Cotton Hijab",
    price: 120.0,
    image_url: "/blue-cotton-hijab.jpg",
    category: "قطني",
    is_featured: true,
  },
  {
    id: 3,
    name_ar: "حجاب شيفون أخضر",
    name_en: "Green Chiffon Hijab",
    price: 180.0,
    image_url: "/green-chiffon-hijab.jpg",
    category: "شيفون",
    is_featured: true,
  },
  {
    id: 4,
    name_ar: "حجاب مطرز ذهبي",
    name_en: "Golden Embroidered Hijab",
    price: 250.0,
    image_url: "/golden-embroidered-hijab.jpg",
    category: "مطرز",
    is_featured: true,
  },
  {
    id: 5,
    name_ar: "حجاب كريب أسود",
    name_en: "Black Crepe Hijab",
    price: 130.0,
    image_url: "/black-crepe-hijab.jpg",
    category: "كريب",
    is_featured: false,
  },
  {
    id: 6,
    name_ar: "حجاب جورجيت بيج",
    name_en: "Beige Georgette Hijab",
    price: 160.0,
    image_url: "/beige-georgette-hijab.jpg",
    category: "جورجيت",
    is_featured: false,
  },
  {
    id: 7,
    name_ar: "حجاب ساتان أبيض",
    name_en: "White Satin Hijab",
    price: 200.0,
    image_url: "/white-satin-hijab.jpg",
    category: "ساتان",
    is_featured: false,
  },
  {
    id: 8,
    name_ar: "حجاب مخمل بنفسجي",
    name_en: "Purple Velvet Hijab",
    price: 220.0,
    image_url: "/purple-velvet-hijab.jpg",
    category: "مخمل",
    is_featured: false,
  },
]

export default function HomePage() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState({ isOpen: false, orderNumber: "", customerInfo: null })

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateCartQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id)
    } else {
      setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCheckout = (customerInfo) => {
    // Generate order number
    const orderNumber = `ASM${Date.now().toString().slice(-6)}`

    // In real app, this would save to database
    console.log("[v0] Order placed:", { orderNumber, customerInfo })

    // Show success modal
    setOrderSuccess({
      isOpen: true,
      orderNumber,
      customerInfo,
    })

    // Clear cart
    setCart([])
    setIsCartOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-green-50">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onOrderTrackingClick={() => setIsOrderTrackingOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 arabic-text">
            متجر أسماء للحجاب
          </h1>
          <p className="text-xl text-gray-600 mb-8 arabic-text leading-relaxed">
            أجمل وأرقى الحجابات المغربية بجودة عالية وأسعار مناسبة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
              تسوقي الآن
            </Button>
            <div className="flex items-center gap-2 text-green-600">
              <MapPin className="w-5 h-5" />
              <span className="arabic-text">توصيل مجاني في الرباط</span>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-8 px-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 arabic-text">عرض خاص</h2>
          <p className="text-xl arabic-text">اشتري حجابين بـ 400 درهم واحصلي على الثالث مجاناً!</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 arabic-text">المنتجات المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter((p) => p.is_featured)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={wishlist.some((item) => item.id === product.id)}
                />
              ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-12 arabic-text">جميع المنتجات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isInWishlist={wishlist.some((item) => item.id === product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Contact Section */}
      <ContactSection />

      <Footer />

      {/* Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveItem={removeFromWishlist}
        onAddToCart={addToCart}
      />

      <OrderTracking isOpen={isOrderTrackingOpen} onClose={() => setIsOrderTrackingOpen(false)} />

      <OrderSuccess
        isOpen={orderSuccess.isOpen}
        onClose={() => setOrderSuccess({ isOpen: false, orderNumber: "", customerInfo: null })}
        orderNumber={orderSuccess.orderNumber}
        customerInfo={orderSuccess.customerInfo}
      />
    </div>
  )
}
