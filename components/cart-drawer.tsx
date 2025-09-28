"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, Minus, ShoppingBag, Truck } from "lucide-react"

interface CartItem {
  id: number
  name_ar: string
  price: number
  image_url: string
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onCheckout: (customerInfo: any) => void
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "الرباط",
    notes: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = customerInfo.city === "الرباط" ? 0 : 30
  const total = subtotal + deliveryFee

  // Check for special offer: 2 hijabs get 1 free
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const freeItems = Math.floor(totalQuantity / 2)
  const discountAmount = freeItems > 0 ? freeItems * Math.min(...cartItems.map((item) => item.price)) : 0

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    onCheckout({
      ...customerInfo,
      items: cartItems,
      subtotal,
      deliveryFee,
      discount: discountAmount,
      total: total - discountAmount,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold arabic-text">سلة التسوق</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {!showCheckout ? (
            <>
              {/* Cart Items */}
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 arabic-text">السلة فارغة</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.name_ar}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold arabic-text">{item.name_ar}</h3>
                              <p className="text-pink-600 font-bold">{item.price} درهم</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-red-500 hover:text-red-700 mr-2"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Special Offer Banner */}
                  {totalQuantity >= 2 && (
                    <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white p-4 rounded-lg mb-4">
                      <p className="text-center font-semibold arabic-text">
                        🎉 عرض خاص: اشتري حجابين واحصلي على الثالث مجاناً!
                      </p>
                      {freeItems > 0 && (
                        <p className="text-center text-sm mt-1 arabic-text">
                          لديك {freeItems} حجاب مجاني! وفرت {discountAmount} درهم
                        </p>
                      )}
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="arabic-text">المجموع الفرعي:</span>
                      <span>{subtotal} درهم</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="arabic-text">الخصم:</span>
                        <span>-{discountAmount} درهم</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="arabic-text">رسوم التوصيل:</span>
                      <span>{deliveryFee === 0 ? "مجاني" : `${deliveryFee} درهم`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span className="arabic-text">المجموع:</span>
                      <span>{total - discountAmount} درهم</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowCheckout(true)}
                    className="w-full mt-6 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  >
                    متابعة الطلب
                  </Button>
                </>
              )}
            </>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCheckout} className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 arabic-text">معلومات التوصيل</h3>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  placeholder="الاسم الأول"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  required
                  className="arabic-text"
                />
                <Input
                  name="lastName"
                  placeholder="اسم العائلة"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  required
                  className="arabic-text"
                />
              </div>

              <Input
                name="email"
                type="email"
                placeholder="البريد الإلكتروني"
                value={customerInfo.email}
                onChange={handleInputChange}
                required
              />

              <Input
                name="phone"
                placeholder="رقم الهاتف"
                value={customerInfo.phone}
                onChange={handleInputChange}
                required
              />

              <select
                name="city"
                value={customerInfo.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md arabic-text"
                required
              >
                <option value="الرباط">الرباط (توصيل مجاني)</option>
                <option value="الدار البيضاء">الدار البيضاء (+30 درهم)</option>
                <option value="فاس">فاس (+30 درهم)</option>
                <option value="مراكش">مراكش (+30 درهم)</option>
                <option value="طنجة">طنجة (+30 درهم)</option>
                <option value="أخرى">مدينة أخرى (+30 درهم)</option>
              </select>

              <Textarea
                name="address"
                placeholder="العنوان الكامل"
                value={customerInfo.address}
                onChange={handleInputChange}
                required
                className="arabic-text"
                rows={3}
              />

              <Textarea
                name="notes"
                placeholder="ملاحظات إضافية (اختياري)"
                value={customerInfo.notes}
                onChange={handleInputChange}
                className="arabic-text"
                rows={2}
              />

              {/* Payment Info */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800 arabic-text">الدفع عند الاستلام</span>
                </div>
                <p className="text-sm text-green-700 arabic-text">
                  ستدفعين المبلغ عند استلام الطلب. لا حاجة لدفع مسبق.
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 arabic-text">ملخص الطلب</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="arabic-text">المجموع الفرعي:</span>
                    <span>{subtotal} درهم</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="arabic-text">الخصم:</span>
                      <span>-{discountAmount} درهم</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="arabic-text">التوصيل:</span>
                    <span>{deliveryFee === 0 ? "مجاني" : `${deliveryFee} درهم`}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-1">
                    <span className="arabic-text">المجموع:</span>
                    <span>{total - discountAmount} درهم</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setShowCheckout(false)} className="flex-1">
                  رجوع
                </Button>
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  تأكيد الطلب
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
