-- Insert sample data into categories
INSERT INTO "categories" ("name", "description", "img") VALUES
('Electronics', 'Devices and gadgets including phones, laptops, and accessories.', 'the-gioi-cong-nghe.webp'),
('Home Appliances', 'Products like refrigerators, washing machines, and air conditioners.', 'yeu-bep-nghien-nha.webp'),
('Fashion', 'Clothing, footwear, and accessories for men, women, and kids.', 'thoi-trang-nu.webp'),
('Beauty & Health', 'Skincare, haircare, makeup, and wellness products.', 'khoe-dep-toan-dien.webp'),
('Sports & Outdoors', 'Equipment and apparel for sports, fitness, and outdoor activities.', 'the-thao-da-ngoai.webp');

-- Insert sample data into users
INSERT INTO "users" ("name", "email", "password", "phone", "address") VALUES
('Lana Nguyen', 'lana.nguyen@example.com', '$2b$10$KeyITtGkFezZSQGPu0Y3W.56VbInhK8N7oyswi2VoX/A36Ee4bvHa', '0901234021', '123 Le Duan Street, Da Nang', '2025-04-08 16:41:56.19'),
('Hanh Nguyen', 'hanhng@gmail.com', '$2b$10$WZwAXrzeUD6ISJ86qPa8ROIeLXO7NXTPlt8Rn.wo3N8nRd2CcwAxe', '008980067', 'Ha Huy Giap, Quan 12, TPHCM', '2025-04-08 17:11:39.926'),
('Charlie Pham', 'charlie.pham@example.com', 'password3', '0901234003', '789 Vo Nguyen Giap, Ho Chi Minh City', '2025-04-05 16:33:29.767421'),
('Alice Nguyen', 'alice.nguyen@example.com', 'password1', '0901234001', '123 Le Duan Street, Da Nang', '2025-04-07 16:33:29.767421'),
('Bob Tran', 'bob.tran@example.com', 'password2', '0901234002', '456 Nguyen Van Linh, Hanoi', '2025-04-06 16:33:29.767421');

-- Insert sample data into shops
INSERT INTO "shops" ("name", "official", "rating", "location") VALUES
('Tech World', true, 4.5, '123 Tech St, Silicon Valley'),
('Fashion Plaza', false, 4.0, '789 Style Rd, Metropolis'),
('Home Essentials', true, 3.8, '456 Comfort Ln, Suburbia'),
('Saigon Electronics', true, 5.00, '123 Nguyen Hue, Ho Chi Minh City'),
('Hanoi Mart', FALSE, 4.00, '456 Tran Quoc Hoan, Hanoi');

-- Insert sample data into products
INSERT INTO "products" ("name", "description", "price", "stock", "madein", "rating", "discount", "maxdeliveryday", "images", "shopid", "categoryid") VALUES
('iPhone 13', 'Latest Apple smartphone with A15 Bionic chip and dual cameras.', 999.99, 50, 'USA', 5.00, 100.00, 5, 'belt-1.png;belt-2.png;belt-3.png;belt-4.png', 1, 1),
('Samsung Galaxy S22', 'Samsung flagship phone with dynamic AMOLED display.', 899.99, 80, 'South Korea', 5.00, 150.00, 6, 'fridge-1.png;fridge-2.png;fridge-3.png', 2, 1),
('Sony WH-1000XM5', 'Noise-canceling wireless headphones with premium sound quality.', 349.99, 120, 'Japan', 5.00, 50.00, 7, 'glasses-1.png;glasses-2.png;glasses-3.png;glasses-4.png;glasses-5.png', 3, 1),
('Dyson Airwrap', 'Versatile hair styler with innovative heat control technology.', 549.99, 30, 'UK', 4.00, 70.00, 4, 'tv-1.png;tv-2.png', 4, 2),
('Adidas Ultraboost', 'Comfortable running shoes with responsive cushioning.', 199.99, 100, 'Germany', 4.00, 20.00, 3, 'washing-machine-1.png;washing-machine-2.png;washing-machine-3.png', 5, 3),
('MacBook Pro 16"', 'Powerful Apple laptop with M1 Pro chip and Retina display.', 2499.99, 25, 'USA', 5.00, 200.00, 7, 'air-conditioner-1.png;air-conditioner-2.png', 1, 1),
('LG OLED TV', '4K Smart OLED TV with AI-enhanced picture and sound.', 1299.99, 40, 'South Korea', 5.00, 150.00, 8, 'belt-1.png;belt-2.png;belt-3.png;belt-4.png', 2, 1),
('Nike Air Jordan 1', 'Classic basketball shoes with timeless design.', 159.99, 300, 'Vietnam', 4.00, 30.00, 5, 'fridge-1.png;fridge-2.png;fridge-3.png', 5, 3),
('Fitbit Versa 3', 'Smartwatch with fitness tracking and built-in GPS.', 229.99, 150, 'USA', 4.00, 40.00, 6, 'glasses-1.png;glasses-2.png;glasses-3.png;glasses-4.png;glasses-5.png', 1, 4),
('Instant Pot Duo', 'Multifunctional pressure cooker for easy home cooking.', 129.99, 200, 'China', 4.00, 25.00, 5, 'tv-1.png;tv-2.png', 4, 2),
('GoPro Hero 10', 'Compact action camera with 5.3K60 video recording.', 499.99, 60, 'USA', 5.00, 60.00, 7, 'washing-machine-1.png;washing-machine-2.png;washing-machine-3.png', 2, 1),
('Xbox Series X', 'Microsoft gaming console with powerful performance.', 499.99, 90, 'China', 5.00, 50.00, 3, 'air-conditioner-1.png;air-conditioner-2.png', 2, 1),
('Canon EOS R6', 'Mirrorless camera for high-quality photography and video.', 2499.99, 15, 'Japan', 5.00, 100.00, 8, 'belt-1.png;belt-2.png;belt-3.png;belt-4.png', 3, 1),
('Levi’s 501 Jeans', 'Iconic straight-leg jeans with classic five-pocket design.', 99.99, 250, 'Vietnam', 4.00, 20.00, 5, 'fridge-1.png;fridge-2.png;fridge-3.png', 5, 3),
('KitchenAid Mixer', 'Stand mixer for baking enthusiasts with multiple attachments.', 399.99, 45, 'USA', 4.00, 30.00, 5, 'glasses-1.png;glasses-2.png;glasses-3.png;glasses-4.png;glasses-5.png', 4, 2),
('Huawei MateBook D 15', 'Affordable laptop with powerful specs and sleek design.', 749.99, 80, 'China', 4.00, 50.00, 6, 'tv-1.png;tv-2.png', 2, 1),
('Razer DeathAdder V2', 'Ergonomic gaming mouse with precision optical sensor.', 69.99, 400, 'Taiwan', 5.00, 10.00, 3, 'air-conditioner-1.png;air-conditioner-2.png', 3, 1),
('Dyson V15 Detect', 'Cordless vacuum cleaner with laser dirt detection.', 699.99, 35, 'UK', 5.00, 75.00, 7, 'washing-machine-1.png;washing-machine-2.png;washing-machine-3.png', 4, 2),
('Gucci Marmont Bag', 'Luxury leather handbag with iconic design.', 2299.99, 10, 'Italy', 5.00, 500.00, 9, 'air-conditioner-1.png;air-conditioner-2.png', 5, 3),
('Logitech MX Keys', 'Wireless keyboard for enhanced productivity and comfort.', 99.99, 120, 'Switzerland', 5.00, 15.00, 4, 'glasses-1.png;glasses-2.png;glasses-3.png;glasses-4.png;glasses-5.png', 3, 1);


-- Insert sample data into tags
INSERT INTO "tags" ("name") VALUES
('Electronics'), ('Clothing'), ('Home'), ('Books'), ('Sports');

-- Insert sample data into coupons
INSERT INTO "coupons" ("code", "discount", "expirationdate") VALUES
('WELCOME10', 10.00, '2025-05-08 16:33:36.866818'),
('SPRING15', 15.00, '2025-06-07 16:33:36.866818'),
('SUMMER20', 20.00, '2025-07-07 16:33:36.866818'),
('FALL25', 25.00, '2025-08-06 16:33:36.866818'),
('HOLIDAY30', 30.00, '2025-09-05 16:33:36.866818');

-- Insert sample data into product_tags
INSERT INTO "product_tags" ("productid", "tagid") VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (5, 2), (5, 3), (5, 4), (6, 1), (7, 2), (8, 3), (9, 4), (10, 5), (11, 1), (12, 2), (13, 3), (14, 4), (15, 5), (16, 5), (17, 1), (18, 2), (19, 3), (20, 4), (21, 5);

-- Insert sample data into product_coupons
INSERT INTO "product_coupons" ("productid", "couponid") VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (5, 2), (5, 3), (5, 4), (6, 1), (7, 2), (8, 3), (9, 4), (10, 5), (11, 1), (12, 2), (13, 3), (14, 4), (15, 5), (16, 5), (17, 1), (18, 2), (19, 3), (20, 4), (21, 5);


-- Insert sample data into orders
INSERT INTO "orders" ("userid", "totalamount") VALUES
(1, 718.98),
(2, 109.98),
(3, 104.99),
(4, 644.99),
(5, 204.99);


-- Insert sample data into order_items
INSERT INTO "order_items" ("orderid", "productid", "quantity", "price") VALUES
(1, 1, 1, 699.99),
(1, 2, 1, 19.99),
(2, 5, 1, 89.99),
(2, 3, 1, 19.99),
(3, 4, 1, 14.99);

-- Insert sample data into shippings
INSERT INTO "shippings" ("orderid", "address", "shippingmethod", "cost", "deliveredat") VALUES
(1, '123 Le Duan Street, Da Nang, Vietnam', 'Standard Shipping', 15.00, '2025-04-09 16:33:29.803259'),
(2, '456 Nguyen Van Linh, Hanoi, Vietnam', 'Express Delivery', 12.50, '2025-04-10 16:33:29.803259'),
(3, '789 Vo Nguyen Giap, Ho Chi Minh City, Vietnam', 'Overnight Shipping', 10.00, '2025-04-11 16:33:29.803259'),
(4, '321 Tran Phu Street, Hue, Vietnam', 'Same-Day Delivery', 8.00, '2025-04-12 16:33:29.803259'),
(5, '654 Hai Phong Road, Hai Phong, Vietnam', 'Economy Shipping', 18.00, '2025-04-13 16:33:29.803259');

