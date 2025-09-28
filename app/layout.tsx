import type React from "react"
import { Noto_Sans_Arabic, Amiri } from "next/font/google"
import "./globals.css"

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
  display: "swap",
})

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata = {
  title: "Hijab Elegance BY ASMA",
  description: "أفضل متجر للحجاب في المغرب - جودة عالية وأسعار مناسبة",
    generator: 'azz.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={`${notoSansArabic.variable} ${amiri.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
