"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Truck, CheckCircle, Clock, Phone, Mail } from "lucide-react"

interface OrderTrackingProps {
  isOpen: boolean
  onClose: () => void
}

export function OrderTracking({ isOpen, onClose }: OrderTrackingProps) {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulate API call - in real app, this would query the database
    setTimeout(() => {
      // Mock order data
      if (orderNumber.startsWith("ASM") && email) {
        setOrderData({
          order_number: orderNumber,
          status: "confirmed",
          total_amount: 450,
          delivery_fee: 0,
          created_at: "2025-01-15T10:30:00Z",
          customer: {
            first_name: "فاطمة",
            last_name: "الزهراء",
            email: email,
            phone: "+212600123456",
          },
          items: [
            {
              name_ar: "حجاب حريري وردي",
              quantity: 2,
              price: 150,
              image_url: "/pink-silk-hijab.jpg",
            },
            {
              name_ar: "حجاب قطني أزرق",
              quantity: 1,
              price: 120,
              image_url: "/blue-cotton-hijab.jpg",
            },
          ],
          delivery_address: "شارع محمد الخامس، الرباط، المغرب",
        })
      } else {
        setError("لم يتم العثور على الطلب. تأكد من رقم الطلب والبريد الإلكتروني.")
      }
      setLoading(false)
    }, 1000)
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { text: "في الانتظار", color: "bg-yellow-500", icon: Clock }
      case "confirmed":
        return { text: "تم التأكيد", color: "bg-blue-500", icon: CheckCircle }
      case "shipped":
        return { text: "تم الشحن", color: "bg-purple-500", icon: Truck }
      case "delivered":
        return { text: "تم التسليم", color: "bg-green-500", icon: Package }
      case "cancelled":
        return { text: "ملغي", color: "bg-red-500", icon: Clock }
      default:
        return { text: "غير معروف", color: "bg-gray-500", icon: Clock }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold arabic-text">تتبع الطلب</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          {!orderData ? (
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 arabic-text">رقم الطلب</label>
                <Input
                  placeholder="مثال: ASM123456"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 arabic-text">البريد الإلكتروني</label>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm arabic-text">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full bg-pink-600 hover:bg-pink-700">
                {loading ? (
                  "جاري البحث..."
                ) : (
                  <>
                    <Search className="w-4 h-4 ml-2" />
                    البحث عن الطلب
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold arabic-text">طلب رقم: {orderData.order_number}</h3>
                  <Badge className={`${getStatusInfo(orderData.status).color} text-white`}>
                    {getStatusInfo(orderData.status).text}
                  </Badge>
                </div>
                <p className="text-gray-600 arabic-text">
                  تاريخ الطلب: {new Date(orderData.created_at).toLocaleDateString("ar-MA")}
                </p>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 arabic-text">معلومات العميل</h4>
                    <div className="space-y-2 text-sm">
                      <p className="arabic-text">
                        <strong>الاسم:</strong> {orderData.customer.first_name} {orderData.customer.last_name}
                      </p>
                      <p>
                        <strong className="arabic-text">البريد الإلكتروني:</strong> {orderData.customer.email}
                      </p>
                      <p>
                        <strong className="arabic-text">الهاتف:</strong> {orderData.customer.phone}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 arabic-text">عنوان التسليم</h4>
                    <p className="text-sm arabic-text">{orderData.delivery_address}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Order Items */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-4 arabic-text">المنتجات المطلوبة</h4>
                  <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.name_ar}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium arabic-text">{item.name_ar}</h5>
                          <p className="text-sm text-gray-600">
                            الكمية: {item.quantity} × {item.price} درهم
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{item.quantity * item.price} درهم</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-4 arabic-text">ملخص الطلب</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="arabic-text">المجموع الفرعي:</span>
                      <span>{orderData.total_amount - orderData.delivery_fee} درهم</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="arabic-text">رسوم التوصيل:</span>
                      <span>{orderData.delivery_fee === 0 ? "مجاني" : `${orderData.delivery_fee} درهم`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span className="arabic-text">المجموع الكلي:</span>
                      <span>{orderData.total_amount} درهم</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3 arabic-text">هل تحتاج مساعدة؟</h4>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`tel:+212631721359`, "_self")}
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 ml-1" />
                    اتصل بنا
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(
                        `https://wa.me/212631721359?text=مرحبا، أريد الاستفسار عن طلبي رقم ${orderData.order_number}`,
                        "_blank",
                      )
                    }
                    className="flex-1"
                  >
                    <Mail className="w-4 h-4 ml-1" />
                    واتساب
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setOrderData(null)} className="flex-1">
                  بحث عن طلب آخر
                </Button>
                <Button onClick={onClose} className="flex-1 bg-pink-600 hover:bg-pink-700">
                  إغلاق
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
