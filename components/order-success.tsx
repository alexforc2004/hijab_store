"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Phone, Mail } from "lucide-react"

interface OrderSuccessProps {
  isOpen: boolean
  onClose: () => void
  orderNumber: string
  customerInfo: any
}

export function OrderSuccess({ isOpen, onClose, orderNumber, customerInfo }: OrderSuccessProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2 arabic-text">تم تأكيد طلبك!</h2>
          <p className="text-gray-600 mb-6 arabic-text">شكراً لك على ثقتك في متجر Hijab Elegance</p>

          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Package className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800 arabic-text">رقم الطلب</span>
            </div>
            <p className="text-2xl font-bold text-green-800">{orderNumber}</p>
          </div>

          <div className="text-right space-y-2 mb-6">
            <p className="arabic-text">
              <strong>الاسم:</strong> {customerInfo.firstName} {customerInfo.lastName}
            </p>
            <p className="arabic-text">
              <strong>الهاتف:</strong> {customerInfo.phone}
            </p>
            <p className="arabic-text">
              <strong>البريد الإلكتروني:</strong> {customerInfo.email}
            </p>
            <p className="arabic-text">
              <strong>المجموع:</strong> {customerInfo.total} درهم
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-blue-800 mb-2 arabic-text">ماذا بعد؟</h3>
            <ul className="text-sm text-blue-700 space-y-1 arabic-text text-right">
              <li>• سنتصل بك خلال 24 ساعة لتأكيد الطلب</li>
              <li>• سيتم تحضير طلبك وشحنه خلال 2-3 أيام</li>
              <li>• الدفع عند الاستلام</li>
              <li>• يمكنك تتبع طلبك برقم الطلب أعلاه</li>
            </ul>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:+212601449135`, "_self")}
              className="flex-1"
            >
              <Phone className="w-4 h-4 ml-1" />
              اتصل بنا
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://wa.me/212601449135?text=مرحبا، رقم طلبي هو ${orderNumber}`, "_blank")}
              className="flex-1"
            >
              <Mail className="w-4 h-4 ml-1" />
              واتساب
            </Button>
          </div>

          <Button onClick={onClose} className="w-full bg-pink-600 hover:bg-pink-700">
            العودة للتسوق
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
