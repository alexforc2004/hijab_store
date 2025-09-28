"use client"
import { Heart, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">أ</span>
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold arabic-text">متجر أسماء</h3>
                <p className="text-sm text-gray-400 arabic-text">للحجاب المغربي</p>
              </div>
            </div>
            <p className="text-gray-400 arabic-text leading-relaxed">
              أفضل متجر للحجاب في المغرب، نقدم لك أجود أنواع الحجابات بأسعار مناسبة وجودة عالية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 arabic-text">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-pink-400 arabic-text">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-pink-400 arabic-text">
                  المنتجات
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-pink-400 arabic-text">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-pink-400 arabic-text">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 arabic-text">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pink-400" />
                <span className="text-gray-400">+212601449135</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">asma_designer@outlook.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-gray-400 arabic-text">سلا، المغرب - الرباط</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 arabic-text">جميع الحقوق محفوظة © 2025 Hijab Elegance BY ASMA</p>
          <p className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
            صنع بـ <Heart className="w-4 h-4 text-pink-400" fill="currentColor" /> في المغرب
          </p>
        </div>
      </div>
    </footer>
  )
}
