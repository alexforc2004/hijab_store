-- Seed data for Asma Hijab Shop

-- Insert 20 hijab products
INSERT INTO products (name_ar, name_en, description_ar, description_en, price, image_url, category, stock_quantity, is_featured) VALUES
('حجاب حريري وردي', 'Pink Silk Hijab', 'حجاب حريري فاخر باللون الوردي الناعم', 'Luxurious silk hijab in soft pink', 150.00, '/placeholder.svg?height=400&width=400', 'حريري', 25, TRUE),
('حجاب قطني أزرق', 'Blue Cotton Hijab', 'حجاب قطني مريح باللون الأزرق الهادئ', 'Comfortable cotton hijab in calm blue', 120.00, '/placeholder.svg?height=400&width=400', 'قطني', 30, TRUE),
('حجاب شيفون أخضر', 'Green Chiffon Hijab', 'حجاب شيفون خفيف باللون الأخضر الزمردي', 'Light chiffon hijab in emerald green', 180.00, '/placeholder.svg?height=400&width=400', 'شيفون', 20, TRUE),
('حجاب مطرز ذهبي', 'Golden Embroidered Hijab', 'حجاب مطرز بخيوط ذهبية فاخرة', 'Hijab embroidered with luxurious golden threads', 250.00, '/placeholder.svg?height=400&width=400', 'مطرز', 15, TRUE),
('حجاب كريب أسود', 'Black Crepe Hijab', 'حجاب كريب كلاسيكي باللون الأسود', 'Classic crepe hijab in black', 130.00, '/placeholder.svg?height=400&width=400', 'كريب', 35, FALSE),
('حجاب جورجيت بيج', 'Beige Georgette Hijab', 'حجاب جورجيت أنيق باللون البيج', 'Elegant georgette hijab in beige', 160.00, '/placeholder.svg?height=400&width=400', 'جورجيت', 22, FALSE),
('حجاب ساتان أبيض', 'White Satin Hijab', 'حجاب ساتان ناصع البياض للمناسبات', 'Pure white satin hijab for special occasions', 200.00, '/placeholder.svg?height=400&width=400', 'ساتان', 18, FALSE),
('حجاب مخمل بنفسجي', 'Purple Velvet Hijab', 'حجاب مخمل فاخر باللون البنفسجي', 'Luxurious velvet hijab in purple', 220.00, '/placeholder.svg?height=400&width=400', 'مخمل', 12, FALSE),
('حجاب قطني مقلم', 'Striped Cotton Hijab', 'حجاب قطني بخطوط ملونة عصرية', 'Cotton hijab with modern colorful stripes', 140.00, '/placeholder.svg?height=400&width=400', 'قطني', 28, FALSE),
('حجاب شيفون منقط', 'Polka Dot Chiffon Hijab', 'حجاب شيفون بنقاط صغيرة أنيقة', 'Chiffon hijab with elegant small polka dots', 170.00, '/placeholder.svg?height=400&width=400', 'شيفون', 24, FALSE),
('حجاب حريري أحمر', 'Red Silk Hijab', 'حجاب حريري جذاب باللون الأحمر', 'Attractive silk hijab in red', 190.00, '/placeholder.svg?height=400&width=400', 'حريري', 16, FALSE),
('حجاب قطني رمادي', 'Gray Cotton Hijab', 'حجاب قطني عملي باللون الرمادي', 'Practical cotton hijab in gray', 110.00, '/placeholder.svg?height=400&width=400', 'قطني', 32, FALSE),
('حجاب شيفون وردي فاتح', 'Light Pink Chiffon Hijab', 'حجاب شيفون باللون الوردي الفاتح الرقيق', 'Chiffon hijab in delicate light pink', 165.00, '/placeholder.svg?height=400&width=400', 'شيفون', 26, FALSE),
('حجاب مطرز فضي', 'Silver Embroidered Hijab', 'حجاب مطرز بخيوط فضية لامعة', 'Hijab embroidered with shiny silver threads', 240.00, '/placeholder.svg?height=400&width=400', 'مطرز', 14, FALSE),
('حجاب كريب بني', 'Brown Crepe Hijab', 'حجاب كريب دافئ باللون البني', 'Warm brown crepe hijab', 125.00, '/placeholder.svg?height=400&width=400', 'كريب', 29, FALSE),
('حجاب جورجيت أزرق فاتح', 'Light Blue Georgette Hijab', 'حجاب جورجيت باللون الأزرق الفاتح المنعش', 'Georgette hijab in refreshing light blue', 155.00, '/placeholder.svg?height=400&width=400', 'جورجيت', 21, FALSE),
('حجاب ساتان ذهبي', 'Gold Satin Hijab', 'حجاب ساتان لامع باللون الذهبي', 'Shiny satin hijab in gold', 210.00, '/placeholder.svg?height=400&width=400', 'ساتان', 17, FALSE),
('حجاب مخمل أخضر داكن', 'Dark Green Velvet Hijab', 'حجاب مخمل باللون الأخضر الداكن الأنيق', 'Velvet hijab in elegant dark green', 230.00, '/placeholder.svg?height=400&width=400', 'مخمل', 13, FALSE),
('حجاب قطني منقوش', 'Patterned Cotton Hijab', 'حجاب قطني بنقوش هندسية عصرية', 'Cotton hijab with modern geometric patterns', 135.00, '/placeholder.svg?height=400&width=400', 'قطني', 27, FALSE),
('حجاب شيفون متدرج', 'Gradient Chiffon Hijab', 'حجاب شيفون بألوان متدرجة جميلة', 'Chiffon hijab with beautiful gradient colors', 185.00, '/placeholder.svg?height=400&width=400', 'شيفون', 19, FALSE);

-- Insert 5 fake reviews in Darija
INSERT INTO reviews (customer_name, rating, comment_ar, comment_en, is_featured) VALUES
('فاطمة الزهراء', 5, 'والله الحجاب زوين بزاف وجودة عالية. أسماء خدامة مزيان وتوصيل سريع', 'Beautiful hijab with high quality. Asma works well and fast delivery', TRUE),
('خديجة المغربية', 5, 'حجاب راقي وقماش ممتاز. نصحت بيه كل صحباتي. شكرا أسماء', 'Elegant hijab with excellent fabric. I recommended it to all my friends. Thank you Asma', TRUE),
('عائشة من الرباط', 5, 'أحسن متجر للحجاب فالمغرب. الألوان زوينة والأسعار معقولة', 'Best hijab store in Morocco. Beautiful colors and reasonable prices', TRUE),
('مريم الأندلسية', 5, 'خدمة ممتازة وحجابات عالية الجودة. كنشري منها دائما', 'Excellent service and high quality hijabs. I always buy from her', TRUE),
('زينب الفاسية', 5, 'ماشاء الله حجابات زوينة بزاف. أسماء بنت ناس وخدامة بضمير', 'MashaAllah very beautiful hijabs. Asma is a good person and works with conscience', TRUE);
