"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Heart, ShoppingCart, Trash2 } from "lucide-react"

interface WishlistItem {
  id: number
  name_ar: string
  price: number
  image_url: string
  category: string
}

interface WishlistDrawerProps {
  isOpen: boolean
  onClose: () => void
  wishlistItems: WishlistItem[]
  onRemoveItem: (id: number) => void
  onAddToCart: (item: WishlistItem) => void
}

export function WishlistDrawer({ isOpen, onClose, wishlistItems, onRemoveItem, onAddToCart }: WishlistDrawerProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold arabic-text">قائمة الأمنيات</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Wishlist Items */}
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 arabic-text">قائمة الأمنيات فارغة</p>
              <p className="text-sm text-gray-400 arabic-text mt-2">أضيفي المنتجات التي تعجبك هنا</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name_ar}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold arabic-text mb-1">{item.name_ar}</h3>
                        <p className="text-sm text-gray-600 arabic-text mb-2">{item.category}</p>
                        <p className="text-pink-600 font-bold mb-3">{item.price} درهم</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => onAddToCart(item)}
                            className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                          >
                            <ShoppingCart className="w-3 h-3 ml-1" />
                            أضف للسلة
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {wishlistItems.length > 0 && (
            <div className="mt-6 pt-4 border-t">
              <Button
                onClick={() => {
                  wishlistItems.forEach((item) => onAddToCart(item))
                  onClose()
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
              >
                أضف الكل للسلة
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
