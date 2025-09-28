"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Menu, X, Package } from "lucide-react"

interface HeaderProps {
  cartCount: number
  wishlistCount: number
  onCartClick: () => void
  onWishlistClick: () => void
  onOrderTrackingClick: () => void
}

export function Header({ cartCount, wishlistCount, onCartClick, onWishlistClick, onOrderTrackingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">أ</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-gray-900 arabic-text">Hijab-Elegance</h1>
              <p className="text-sm text-gray-600 arabic-text">للحجاب المغربي</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-pink-600 arabic-text">
              الرئيسية
            </a>
            <a href="#products" className="text-gray-700 hover:text-pink-600 arabic-text">
              المنتجات
            </a>
            <Button
              variant="ghost"
              onClick={onOrderTrackingClick}
              className="text-gray-700 hover:text-pink-600 arabic-text"
            >
              تتبع الطلب
            </Button>
            <a href="#contact" className="text-gray-700 hover:text-pink-600 arabic-text">
              اتصل بنا
            </a>
          </nav>

          {/* Cart, Wishlist and Menu */}
          <div className="flex items-center gap-4">
            {/* Order Tracking - Mobile */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={onOrderTrackingClick}>
              <Package className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative" onClick={onWishlistClick}>
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" onClick={onCartClick}>
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-pink-500 text-white min-w-[20px] h-5 flex items-center justify-center text-xs cart-bounce">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-pink-100">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-gray-700 hover:text-pink-600 arabic-text">
                الرئيسية
              </a>
              <a href="#products" className="text-gray-700 hover:text-pink-600 arabic-text">
                المنتجات
              </a>
              <Button
                variant="ghost"
                onClick={onOrderTrackingClick}
                className="text-gray-700 hover:text-pink-600 arabic-text justify-start p-0"
              >
                تتبع الطلب
              </Button>
              <a href="#contact" className="text-gray-700 hover:text-pink-600 arabic-text">
                اتصل بنا
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
