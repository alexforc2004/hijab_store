"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"

interface Product {
  id: number
  name_ar: string
  name_en: string
  price: number
  image_url: string
  category: string
  is_featured?: boolean
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onToggleWishlist: (product: Product) => void
  isInWishlist: boolean
}

export function ProductCard({ product, onAddToCart, onToggleWishlist, isInWishlist }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <img
          src={product.image_url || "/placeholder.svg"}
          alt={product.name_ar}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.is_featured && <Badge className="absolute top-3 right-3 bg-pink-500 text-white">مميز</Badge>}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-3 left-3 w-8 h-8 rounded-full ${
            isInWishlist ? "bg-pink-500 text-white" : "bg-white/80 text-gray-600"
          }`}
          onClick={() => onToggleWishlist(product)}
        >
          <Heart className="w-4 h-4" fill={isInWishlist ? "currentColor" : "none"} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-2 arabic-text text-gray-900">{product.name_ar}</h3>
          <p className="text-sm text-gray-600 mb-3 arabic-text">{product.category}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-pink-600">{product.price} درهم</span>
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
          >
            <ShoppingCart className="w-4 h-4 ml-2" />
            أضف للسلة
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
