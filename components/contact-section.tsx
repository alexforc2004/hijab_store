"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Show WhatsApp contact
    setShowWhatsApp(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-center mb-12 arabic-text">تواصلي معنا</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 arabic-text">معلومات التواصل</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="font-semibold arabic-text">الهاتف</p>
                  <p className="text-gray-600">+212601449135</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold arabic-text">البريد الإلكتروني</p>
                  <p className="text-gray-600">asma_designer@outlook.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold arabic-text">الموقع</p>
                  <p className="text-gray-600 arabic-text">سلا، المغرب - الرباط</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2 arabic-text">معلومات التوصيل</h4>
              <p className="text-gray-700 arabic-text">
                • توصيل مجاني في الرباط
                <br />• 30 درهم للمناطق الأخرى
                <br />• الدفع عند الاستلام
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-pink-50 to-blue-50">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-6 arabic-text">أرسلي رسالة</h3>

              {!showWhatsApp ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="الاسم الكامل"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="arabic-text"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="البريد الإلكتروني"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    name="phone"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="رسالتك..."
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="arabic-text"
                  />
                  <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                    إرسال الرسالة
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold mb-4 arabic-text">شكراً لتواصلك معنا!</h4>
                  <p className="text-gray-700 mb-6 arabic-text">يمكنك التواصل معنا مباشرة عبر الواتساب</p>
                  <Button
                    onClick={() => window.open(`https://wa.me/212601449135`, "_blank")}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    تواصل عبر الواتساب
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
