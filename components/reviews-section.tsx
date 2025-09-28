"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "فاطمة الزهراء",
    rating: 5,
    comment: "والله الحجاب زوين بزاف وجودة عالية. أسماء خدامة مزيان وتوصيل سريع",
  },
  {
    id: 2,
    name: "خديجة المغربية",
    rating: 5,
    comment: "حجاب راقي وقماش ممتاز. نصحت بيه كل صحباتي. شكرا أسماء",
  },
  {
    id: 3,
    name: "عائشة من الرباط",
    rating: 5,
    comment: "أحسن متجر للحجاب فالمغرب. الألوان زوينة والأسعار معقولة",
  },
  {
    id: 4,
    name: "مريم الأندلسية",
    rating: 5,
    comment: "خدمة ممتازة وحجابات عالية الجودة. كنشري منها دائما",
  },
  {
    id: 5,
    name: "زينب الفاسية",
    rating: 5,
    comment: "ماشاء الله حجابات زوينة بزاف. أسماء بنت ناس وخدامة بضمير",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-bold text-center mb-12 arabic-text">آراء عملائنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 arabic-text leading-relaxed">"{review.comment}"</p>
                <p className="font-semibold text-gray-900 arabic-text">- {review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
