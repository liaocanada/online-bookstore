CREATE TABLE book(product_id SERIAL PRIMARY KEY REFERENCES products, name VARCHAR(255), description VARCHAR(2047), price NUMERIC(8, 2), publisher_price NUMERIC(8, 2), sold_count INT, isbn VARCHAR(9), series VARCHAR(255), format VARCHAR(255), pages INT);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (1, 'The Hunger Games', 'A book called The Hunger Games (The Hunger Games, #1) published in 2008 and rated 4.34 (4780653 reviews)', 23, 15.1, 14307, '439023483', 'The Hunger Games', 'paperback', 190);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (2, 'Harry Potter and the Philosopher''s Stone', 'A book called Harry Potter and the Sorcerer''s Stone (Harry Potter, #1) published in 1997 and rated 4.44 (4602479 reviews)', 30, 18.47, 38300, '439554934', 'Harry Potter', 'paperback', 411);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (3, 'Twilight', 'A book called Twilight (Twilight, #1) published in 2005 and rated 3.57 (3866839 reviews)', 24, 17.9, 12183, '316015849', 'Twilight', 'paperback', 177);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (4, 'To Kill a Mockingbird', 'A book called To Kill a Mockingbird published in 1960 and rated 4.25 (3198671 reviews)', 6, 3.58, 2151, '61120081', NULL, 'hardcover', 450);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (5, 'The Great Gatsby', 'A book called The Great Gatsby published in 1925 and rated 3.89 (2683664 reviews)', 19, 8.48, 22453, '743273567', NULL, 'paperback', 213);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (6, 'The Fault in Our Stars', 'A book called The Fault in Our Stars published in 2012 and rated 4.26 (2346404 reviews)', 9, 6.34, 39050, '525478817', NULL, 'ebook', 214);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (7, 'The Hobbit or There and Back Again', 'A book called The Hobbit published in 1937 and rated 4.25 (2071616 reviews)', 17, 6.27, 34928, '618260307', NULL, 'paperback', 132);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (8, 'The Catcher in the Rye', 'A book called The Catcher in the Rye published in 1951 and rated 3.79 (2044241 reviews)', 19, 14.45, 5131, '316769177', NULL, 'paperback', 380);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (9, 'Angels & Demons ', 'A book called Angels & Demons  (Robert Langdon, #1) published in 2000 and rated 3.85 (2001311 reviews)', 9, 5.11, 20864, '1416524797', 'Robert Langdon', 'paperback', 496);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (10, 'Pride and Prejudice', 'A book called Pride and Prejudice published in 1813 and rated 4.24 (2035490 reviews)', 17, 8, 15677, '679783261', NULL, 'hardcover', 139);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (11, 'The Kite Runner ', 'A book called The Kite Runner published in 2003 and rated 4.26 (1813044 reviews)', 19, 15.14, 6628, '1594480001', NULL, 'paperback', 330);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (12, 'Divergent', 'A book called Divergent (Divergent, #1) published in 2011 and rated 4.24 (1903563 reviews)', 30, 15.45, 33762, '62024035', 'Divergent', 'ebook', 380);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (13, 'Nineteen Eighty-Four', 'A book called 1984 published in 1949 and rated 4.14 (1956832 reviews)', 19, 8.92, 25028, '451524934', NULL, 'hardcover', 101);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (14, 'Animal Farm: A Fairy Story', 'A book called Animal Farm published in 1945 and rated 3.87 (1881700 reviews)', 24, 14.17, 27987, '452284244', NULL, 'hardcover', 234);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (15, 'Het Achterhuis: Dagboekbrieven 14 juni 1942 - 1 augustus 1944', 'A book called The Diary of a Young Girl published in 1947 and rated 4.1 (1972666 reviews)', 28, 22.13, 29036, '553296981', NULL, 'paperback', 193);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (16, 'Män som hatar kvinnor', 'A book called The Girl with the Dragon Tattoo (Millennium, #1) published in 2005 and rated 4.11 (1808403 reviews)', 25, 12.11, 8338, '307269752', 'Millennium', 'hardcover', 408);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (17, 'Catching Fire', 'A book called Catching Fire (The Hunger Games, #2) published in 2009 and rated 4.3 (1831039 reviews)', 26, 12.36, 20513, '439023491', 'The Hunger Games', 'paperback', 365);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (18, 'Harry Potter and the Prisoner of Azkaban', 'A book called Harry Potter and the Prisoner of Azkaban (Harry Potter, #3) published in 1999 and rated 4.53 (1832823 reviews)', 5, 3.14, 1207, '043965548X', 'Harry Potter', 'paperback', 384);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (19, ' The Fellowship of the Ring', 'A book called The Fellowship of the Ring (The Lord of the Rings, #1) published in 1954 and rated 4.34 (1766803 reviews)', 20, 15.85, 11939, '618346252', 'The Lord of the Rings', 'paperback', 382);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (20, 'Mockingjay', 'A book called Mockingjay (The Hunger Games, #3) published in 2010 and rated 4.03 (1719760 reviews)', 30, 22.61, 2030, '439023513', 'The Hunger Games', 'ebook', 358);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (21, 'Harry Potter and the Order of the Phoenix', 'A book called Harry Potter and the Order of the Phoenix (Harry Potter, #5) published in 2003 and rated 4.46 (1735368 reviews)', 10, 4.65, 4491, '439358078', 'Harry Potter', 'paperback', 360);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (22, 'The Lovely Bones', 'A book called The Lovely Bones published in 2002 and rated 3.77 (1605173 reviews)', 6, 2.41, 14715, '316166685', NULL, 'paperback', 280);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (23, 'Harry Potter and the Chamber of Secrets', 'A book called Harry Potter and the Chamber of Secrets (Harry Potter, #2) published in 1998 and rated 4.37 (1779331 reviews)', 28, 13.85, 20775, '439064864', 'Harry Potter', 'paperback', 398);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (24, 'Harry Potter and the Goblet of Fire', 'A book called Harry Potter and the Goblet of Fire (Harry Potter, #4) published in 2000 and rated 4.53 (1753043 reviews)', 27, 18.09, 6380, '439139600', 'Harry Potter', 'hardcover', 458);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (25, 'Harry Potter and the Deathly Hallows', 'A book called Harry Potter and the Deathly Hallows (Harry Potter, #7) published in 2007 and rated 4.61 (1746574 reviews)', 12, 8.29, 45843, '545010225', 'Harry Potter', 'ebook', 307);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (26, 'The Da Vinci Code', 'A book called The Da Vinci Code (Robert Langdon, #2) published in 2003 and rated 3.79 (1447148 reviews)', 28, 22.13, 15169, '307277674', 'Robert Langdon', 'ebook', 236);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (27, 'Harry Potter and the Half-Blood Prince', 'A book called Harry Potter and the Half-Blood Prince (Harry Potter, #6) published in 2005 and rated 4.54 (1678823 reviews)', 5, 3.75, 49132, '439785960', 'Harry Potter', 'ebook', 347);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (28, 'Lord of the Flies ', 'A book called Lord of the Flies published in 1954 and rated 3.64 (1605019 reviews)', 14, 6.15, 6783, '140283331', NULL, 'hardcover', 326);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (29, 'An Excellent conceited Tragedie of Romeo and Juliet', 'A book called Romeo and Juliet published in 1595 and rated 3.73 (1628519 reviews)', 18, 8.29, 43789, '743477111', NULL, 'paperback', 308);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (30, 'Gone Girl', 'A book called Gone Girl published in 2012 and rated 4.03 (512475 reviews)', 23, 6.93, 35379, '297859382', NULL, 'paperback', 484);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (31, 'The Help', 'A book called The Help published in 2009 and rated 4.45 (1531753 reviews)', 5, 1.95, 33384, '399155341', NULL, 'paperback', 164);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (32, 'Of Mice and Men ', 'A book called Of Mice and Men published in 1937 and rated 3.84 (1467496 reviews)', 10, 4.39, 32778, '142000671', NULL, 'hardcover', 406);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (33, 'Memoirs of a Geisha', 'A book called Memoirs of a Geisha published in 1997 and rated 4.08 (1300209 reviews)', 17, 8.69, 13216, '739326228', NULL, 'ebook', 478);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (34, 'Fifty Shades of Grey', 'A book called Fifty Shades of Grey (Fifty Shades, #1) published in 2011 and rated 3.67 (1338493 reviews)', 22, 13.47, 10583, '1612130291', 'Fifty Shades', 'hardcover', 478);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (35, 'O Alquimista', 'A book called The Alchemist published in 1988 and rated 3.82 (1299566 reviews)', 18, 12.99, 38448, '61122416', NULL, 'ebook', 348);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (36, 'The Giver', 'A book called The Giver (The Giver, #1) published in 1993 and rated 4.12 (1296825 reviews)', 14, 10.97, 13255, '385732554', 'The Giver', 'paperback', 151);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (37, 'The Lion, the Witch and the Wardrobe', 'A book called The Lion, the Witch, and the Wardrobe (Chronicles of Narnia, #1) published in 1950 and rated 4.19 (1531800 reviews)', 26, 19.79, 11295, '60764899', 'Chronicles of Narnia', 'paperback', 200);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (38, 'The Time Traveler''s Wife', 'A book called The Time Traveler''s Wife published in 2003 and rated 3.95 (746287 reviews)', 18, 7.96, 17444, '965818675', NULL, 'paperback', 359);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (39, 'A Game of Thrones', 'A book called A Game of Thrones (A Song of Ice and Fire, #1) published in 1996 and rated 4.45 (1319204 reviews)', 22, 9.72, 48505, '553588486', 'A Song of Ice and Fire', 'paperback', 381);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (40, 'Eat, pray, love: one woman''s search for everything across Italy, India and Indonesia', 'A book called Eat, Pray, Love published in 2006 and rated 3.51 (1181647 reviews)', 16, 7.47, 36639, '143038419', NULL, 'ebook', 365);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (41, 'The Lightning Thief', 'A book called The Lightning Thief (Percy Jackson and the Olympians, #1) published in 2005 and rated 4.23 (1366265 reviews)', 11, 8.02, 9725, '786838655', 'Percy Jackson and the Olympians', 'paperback', 487);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (42, 'Little Women', 'A book called Little Women (Little Women, #1) published in 1868 and rated 4.04 (1257121 reviews)', 23, 7.48, 44954, '451529308', 'Little Women', 'paperback', 205);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (43, 'Jane Eyre', 'A book called Jane Eyre published in 1847 and rated 4.1 (1198557 reviews)', 13, 6.78, 31868, '142437204', NULL, 'paperback', 105);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (44, 'The Notebook', 'A book called The Notebook (The Notebook, #1) published in 1996 and rated 4.06 (1053403 reviews)', 28, 12.1, 35220, '553816713', 'The Notebook', 'hardcover', 397);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (45, 'Life of Pi', 'A book called Life of Pi published in 2001 and rated 3.88 (1003228 reviews)', 19, 11.57, 36479, '770430074', NULL, 'paperback', 296);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (46, 'Water for Elephants', 'A book called Water for Elephants published in 2006 and rated 4.07 (1068146 reviews)', 23, 16.86, 6, '1565125606', NULL, 'hardcover', 429);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (47, 'The Book Thief', 'A book called The Book Thief published in 2005 and rated 4.36 (1159741 reviews)', 27, 21.49, 41076, '375831002', NULL, 'ebook', 119);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (48, 'Fahrenheit 451', 'A book called Fahrenheit 451 published in 1953 and rated 3.97 (570498 reviews)', 8, 5.45, 25831, '307347974', NULL, 'paperback', 121);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (49, 'New Moon (Twilight, #2)', 'A book called New Moon (Twilight, #2) published in 2006 and rated 3.52 (1149630 reviews)', 25, 12.17, 8967, '316160199', 'Twilight', 'paperback', 226);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (50, 'Where the Sidewalk Ends: The Poems and Drawings of Shel Silverstein', 'A book called Where the Sidewalk Ends published in 1974 and rated 4.29 (1016888 reviews)', 21, 8.03, 13647, '60513039', NULL, 'paperback', 403);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (51, 'City of Bones', 'A book called City of Bones (The Mortal Instruments, #1) published in 2007 and rated 4.12 (1154031 reviews)', 15, 11.55, 27986, '1416914285', 'The Mortal Instruments', 'paperback', 223);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (52, 'Eclipse', 'A book called Eclipse (Twilight, #3) published in 2007 and rated 3.69 (1134511 reviews)', 11, 3.85, 37282, '316160202', 'Twilight', 'paperback', 219);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (53, 'Eragon', 'A book called Eragon (The Inheritance Cycle, #1) published in 2002 and rated 3.86 (1104021 reviews)', 15, 7.16, 4720, '375826696', 'The Inheritance Cycle', 'ebook', 280);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (54, 'The Hitchhiker''s Guide to the Galaxy', 'A book called The Hitchhiker''s Guide to the Galaxy (Hitchhiker''s Guide to the Galaxy, #1) published in 1979 and rated 4.2 (936782 reviews)', 11, 6.08, 6070, '345391802', 'Hitchhiker''s Guide to the Galaxy', 'ebook', 496);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (55, 'Brave New World', 'A book called Brave New World published in 1932 and rated 3.97 (1022601 reviews)', 26, 19.93, 37697, '60929871', NULL, 'paperback', 233);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (56, 'Breaking Dawn', 'A book called Breaking Dawn (Twilight, #4) published in 2008 and rated 3.7 (1070245 reviews)', 7, 2.93, 12272, '031606792X', 'Twilight', 'ebook', 181);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (57, 'The Secret Life of Bees', 'A book called The Secret Life of Bees published in 2001 and rated 4.01 (916189 reviews)', 13, 6.58, 13585, '142001740', NULL, 'paperback', 154);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (58, 'The Adventures of Huckleberry Finn', 'A book called The Adventures of Huckleberry Finn published in 1884 and rated 3.8 (953758 reviews)', 5, 1.53, 43028, '142437174', NULL, 'hardcover', 444);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (59, 'Charlotte''s Web', 'A book called Charlotte''s Web published in 1952 and rated 4.15 (1064521 reviews)', 24, 13.42, 45773, '64410935', NULL, 'hardcover', 221);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (60, 'The Curious Incident of the Dog in the Night-Time', 'A book called The Curious Incident of the Dog in the Night-Time published in 2003 and rated 3.85 (867553 reviews)', 23, 18.2, 32922, '1400032717', NULL, 'paperback', 193);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (61, 'The Girl on the Train', 'A book called The Girl on the Train published in 2015 and rated 3.88 (1008778 reviews)', 11, 7.02, 2103, '1594633665', NULL, 'paperback', 217);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (62, 'Northern Lights', 'A book called The Golden Compass (His Dark Materials, #1) published in 1995 and rated 3.94 (953970 reviews)', 12, 8.6, 41346, '679879242', 'His Dark Materials', 'ebook', 376);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (63, 'Wuthering Heights', 'A book called Wuthering Heights published in 1847 and rated 3.82 (899195 reviews)', 28, 13.61, 40863, '393978893', NULL, 'paperback', 338);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (64, 'My Sister''s Keeper', 'A book called My Sister''s Keeper published in 2004 and rated 4.06 (863879 reviews)', 22, 9.17, 44611, '743454537', NULL, 'paperback', 121);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (65, 'Slaughterhouse-Five, or The Children''s Crusade: A Duty-Dance with Death ', 'A book called Slaughterhouse-Five published in 1969 and rated 4.06 (846488 reviews)', 6, 4.8, 7609, '385333846', NULL, 'paperback', 163);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (66, 'Gone with the Wind', 'A book called Gone with the Wind published in 1936 and rated 4.28 (873981 reviews)', 16, 10.37, 2573, '446675539', NULL, 'paperback', 185);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (67, 'A Thousand Splendid Suns', 'A book called A Thousand Splendid Suns published in 2007 and rated 4.34 (818742 reviews)', 9, 6.1, 30428, '1594489505', NULL, 'paperback', 158);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (68, 'The Perks of Being a Wallflower', 'A book called The Perks of Being a Wallflower published in 1999 and rated 4.21 (888806 reviews)', 20, 13.38, 12535, '671027344', NULL, 'paperback', 429);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (69, 'Insurgent', 'A book called Insurgent (Divergent, #2) published in 2012 and rated 4.07 (836362 reviews)', 7, 2.41, 29436, '7442912', 'Divergent', 'paperback', 173);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (70, 'Ender''s Game', 'A book called Ender''s Game (Ender''s Saga, #1) published in 1985 and rated 4.3 (813439 reviews)', 7, 3.9, 49699, '812550706', 'Ender''s Saga', 'paperback', 223);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (71, 'Frankenstein; or, The Modern Prometheus', 'A book called Frankenstein published in 1818 and rated 3.75 (808589 reviews)', 24, 12.43, 6234, '141439475', NULL, 'ebook', 378);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (72, 'The Shining', 'A book called The Shining (The Shining #1) published in 1977 and rated 4.17 (791850 reviews)', 19, 11.24, 14059, '450040186', NULL, 'paperback', 322);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (73, 'The Host', 'A book called The Host (The Host, #1) published in 2008 and rated 3.84 (749780 reviews)', 11, 8.17, 15529, '316068047', 'The Host', 'paperback', 422);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (74, 'Looking for Alaska', 'A book called Looking for Alaska published in 2005 and rated 4.09 (783470 reviews)', 8, 5.5, 24705, '142402516', NULL, 'paperback', 408);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (75, NULL, 'A book called Bridget Jones''s Diary (Bridget Jones, #1) published in 1996 and rated 3.75 (736498 reviews)', 27, 15.46, 6315, '014028009X', 'Bridget Jones', 'paperback', 297);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (76, 'Sense and Sensibility', 'A book called Sense and Sensibility published in 1811 and rated 4.06 (738894 reviews)', 11, 4, 20236, '141439661', NULL, 'paperback', 329);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (77, 'Holes', 'A book called Holes (Holes, #1) published in 1998 and rated 3.93 (747445 reviews)', 28, 20.58, 16808, '439244196', 'Holes', 'paperback', 144);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (78, 'The Devil Wears Prada', 'A book called The Devil Wears Prada (The Devil Wears Prada, #1) published in 2003 and rated 3.7 (665930 reviews)', 27, 11.64, 26322, '307275558', 'The Devil Wears Prada', 'hardcover', 168);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (79, 'Ὀδύσσεια', 'A book called The Odyssey published in -720 and rated 3.73 (670326 reviews)', 18, 10.69, 44617, '143039954', NULL, 'paperback', 411);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (80, 'Le Petit Prince', 'A book called The Little Prince published in 1946 and rated 4.28 (738757 reviews)', 18, 13.46, 20621, '156012197', NULL, 'ebook', 183);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (81, 'The Glass Castle', 'A book called The Glass Castle published in 2005 and rated 4.24 (621099 reviews)', 6, 2.85, 40708, '074324754X', NULL, 'paperback', 297);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (82, 'Into the Wild', 'A book called Into the Wild published in 1996 and rated 3.94 (647684 reviews)', 16, 7.46, 1164, '385486804', NULL, 'ebook', 163);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (83, 'A Tale of Two Cities', 'A book called A Tale of Two Cities published in 1859 and rated 3.81 (637412 reviews)', 22, 16.15, 36598, '141439602', NULL, 'ebook', 338);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (84, 'Jurassic Park', 'A book called Jurassic Park (Jurassic Park, #1) published in 1990 and rated 3.96 (447833 reviews)', 21, 10.52, 49538, '030734813X', 'Jurassic Park', 'ebook', 313);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (85, 'The Giving Tree', 'A book called The Giving Tree published in 1964 and rated 4.38 (702332 reviews)', 5, 3.38, 15241, '60256656', NULL, 'paperback', 289);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (86, 'A Time to Kill', 'A book called A Time to Kill published in 1989 and rated 4.03 (597775 reviews)', 5, 2.32, 32911, '385338600', NULL, 'paperback', 420);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (87, 'Un di Velt Hot Geshvign', 'A book called Night (The Night Trilogy #1) published in 1958 and rated 4.3 (691231 reviews)', 27, 16.79, 35692, '374500010', NULL, 'paperback', 181);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (88, 'Paper Towns', 'A book called Paper Towns published in 2008 and rated 3.88 (461311 reviews)', 18, 7.13, 22892, '014241493X', NULL, 'hardcover', 429);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (89, 'The Princess Bride', 'A book called The Princess Bride  published in 1973 and rated 4.25 (628637 reviews)', 10, 4.26, 7810, '345418263', NULL, 'paperback', 181);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (90, 'The Outsiders', 'A book called The Outsiders published in 1967 and rated 4.06 (659248 reviews)', 27, 8.46, 14311, '014038572X', NULL, 'paperback', 285);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (91, 'The Maze Runner', 'A book called The Maze Runner (Maze Runner, #1) published in 2009 and rated 4.02 (719925 reviews)', 27, 10.26, 28314, '385737947', 'Maze Runner', 'paperback', 497);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (92, 'Freakonomics: A Rogue Economist Explores the Hidden Side of Everything', 'A book called Freakonomics: A Rogue Economist Explores the Hidden Side of Everything (Freakonomics, #1) published in 2005 and rated 3.93 (524191 reviews)', 24, 12.44, 19955, '61234001', 'Freakonomics', 'paperback', 202);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (93, 'The Secret Garden', 'A book called The Secret Garden published in 1911 and rated 4.12 (639357 reviews)', 25, 18.42, 30499, '517189607', NULL, 'paperback', 324);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (94, 'Cien años de soledad', 'A book called One Hundred Years of Solitude published in 1967 and rated 4.04 (490565 reviews)', 12, 4.25, 8593, '60531045', NULL, 'hardcover', 428);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (95, 'The Picture of Dorian Gray', 'A book called The Picture of Dorian Gray published in 1891 and rated 4.06 (590014 reviews)', 19, 14.89, 22614, '375751513', NULL, 'hardcover', 250);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (96, 'Fifty Shades Freed', 'A book called Fifty Shades Freed (Fifty Shades, #3) published in 2012 and rated 3.88 (387290 reviews)', 12, 4.72, 800, '345803507', 'Fifty Shades', 'ebook', 202);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (97, 'Dracula', 'A book called Dracula published in 1897 and rated 3.98 (618973 reviews)', 7, 2.39, 48613, '393970124', NULL, 'paperback', 295);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (98, 'Flickan som lekte med elden', 'A book called The Girl Who Played with Fire (Millennium, #2) published in 2006 and rated 4.22 (563994 reviews)', 6, 3.84, 42067, '307269981', 'Millennium', 'paperback', 500);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (99, 'Fifty Shades Darker', 'A book called Fifty Shades Darker (Fifty Shades, #2) published in 2011 and rated 3.87 (552059 reviews)', 29, 20.63, 5323, '1612130585', 'Fifty Shades', 'paperback', 492);
INSERT INTO book(product_id, name, description, price, publisher_price, sold_count, isbn, series, format, pages) VALUES (100, 'The Poisonwood Bible', 'A book called The Poisonwood Bible published in 1998 and rated 4.02 (546502 reviews)', 30, 10.5, 44059, '60786507', NULL, 'paperback', 425);
