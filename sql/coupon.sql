CREATE TABLE coupon(coupon_code VARCHAR(80) PRIMARY KEY, is_percent BOOLEAN NOT NULL, savings NUMERIC(8, 2) NOT NULL, valid_from TIMESTAMP, valid_to TIMESTAMP);
INSERT INTO coupon(coupon_code, is_percent, savings, valid_from, valid_to) VALUES ('2019SAVINGS', false, 5, '2019-01-01 00:00:00', '2020-01-01 00:00:00');
INSERT INTO coupon(coupon_code, is_percent, savings, valid_from, valid_to) VALUES ('ORDER15OFF', true, 15, '2020-04-01 00:00:00', '2020-04-30 00:00:00');
