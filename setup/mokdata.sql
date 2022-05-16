-----------------------------------------mok user--------------------------------------------

insert into users(username, password, contact, email, is_admin) values
('ibragim', crypt('1234', gen_salt('bf')), '998900043433', 'ibragim@gmailcom', true),
('anvar', crypt('1234', gen_salt('bf')), '998900010111', 'anvar@gmailcom', false),
('shaxlo', crypt('1234', gen_salt('bf')), '998946454784', 'shaxlo@gmailcom', false),
('ayubxon', crypt('1234', gen_salt('bf')), '998981102101', 'ayubxon@gmailcom', false),
('ulugbek', crypt('1234', gen_salt('bf')), '998900043433', 'ulugbek@gmailcom', false);

----------------------------------------mok product------------------------------------------


INSERT INTO  products (product_name, categoryname, product_price, product_img, product_short_description, product_long_description ) VALUES 
('chocolate', 'Oziq-Ovqat', 2000, 'chocolate.jpg', 'Melting chocolate cubes.Chocolate sauce.', 'Royalty-free licenlips in personal and commercial projects on an ongoing !' ),
('non', 'Oziq-Ovqat', 3000, 'non.jpg', 'Non o''zbek dasturhonining ko''rkidir.', 'Non xamirni qizdirib, dimlab yoki qovurib tayyorlabo''ladi.!' ),
('uzum', 'Oziq-Ovqat', 10000, 'uzum.jpg', 'Uzum Samarqand qishloqlarida ko''p yetishtiriladi.', 'Uzum tokning g''ujumlardan iborat mevasidir. Botanik jihatdan rezavor meva hisoblanadi' ),
('kompyuter', 'Elektronika', 6200000, 'kompyuter.jpg', 'Kompyuter (ing . computer — hisoblayman), EHM (Elektron Hisoblash Mashinasi) — oldindan .', 'Kompyuter haqida umumiy ma''lumot!' ),
('kitob', 'Konselariya', 25000, 'kitob.jpg', 'Kitob —axborotlarni, g''oya, obraz va bilimlarni saqlash hamda tarqatish', 'Kitob shahri O''zbekistonning navqiron shaharlaridan biri hisoblanadi. !' ),
('naushnik', 'Elektronika', 200000, 'naushnik.jpg', 'Nima uchun naushnik kerak. Eshitish vositasi, har qanday gadjet .', 'Nima uchun naushnik kerak. Eshitish vositasi, har qanday gadjet kabi, ma''lum!' ),
('daftar', 'Konselariya', 5000, 'daftar.jpg', 'Kundalik daftar O''quvchining dars-larga qatnashishi, o''zlashtirishiga oid.', 'O''quvchining dars-larga qatnashishi, o''zlashtirishiga oid ... !' ),
('sichqoncha', 'Elektronika', 65000, 'sichqoncha.jpg', 'Sichqoncha lazer yoki to''pni ishlatadimi yoki simli yoki simsiz bormi, .', 'Sichqoncha lazer yoki to''pni ishlatadimi yoki simli yoki simsiz bormi' );

-------------------------------------------order---------------------------------------------

insert into orders (user_id, is_paid, product_id, totalprice, count) values
(1, 'toladi', 1, 2000, 2),
(3, 'tolamadi', 4, 6200000, 1),
(5, 'toladi', 5, 25000, 3),
(4, 'tolamadi', 7, 5000, 2);