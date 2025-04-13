DROP DATABASE IF EXISTS tiki_db;
CREATE DATABASE tiki_db;

-- Table: shops
CREATE TABLE "shops" (
    "shopid" SERIAL PRIMARY KEY,
    "name" VARCHAR(100),
    "official" BOOLEAN,
    "rating" DECIMAL(3, 2),
    "location" VARCHAR(255),
    "createdat" TIMESTAMP DEFAULT now()
);

-- Table: tags
CREATE TABLE "tags" (
    "tagid" SERIAL PRIMARY KEY,
    "name" VARCHAR(100)
);

-- Table: users
CREATE TABLE "users" (
    "userid" SERIAL PRIMARY KEY,
    "name" VARCHAR(100),
    "email" VARCHAR(100) UNIQUE,
    "password" VARCHAR(100),
    "phone" VARCHAR(15) UNIQUE,
    "address" VARCHAR(255),
    "createdat" TIMESTAMP DEFAULT now()
);


-- Table: categories
CREATE TABLE "categories" (
    "categoryid" SERIAL PRIMARY KEY,
    "name" VARCHAR(100),
    "description" TEXT,
    "img" VARCHAR(255)
);

-- Table: coupons
CREATE TABLE "coupons" (
    "couponid" SERIAL PRIMARY KEY,
    "code" VARCHAR(50),
    "discount" DECIMAL(10, 2),
    "expirationdate" TIMESTAMP
);

-- Table: product_coupons
CREATE TABLE "product_coupons" (
    "productid" INT,
    "couponid" INT,
    PRIMARY KEY ("productid", "couponid")
);

-- Table: product_tags
CREATE TABLE "product_tags" (
    "productid" INT,
    "tagid" INT,
    PRIMARY KEY ("productid", "tagid")
);

-- Table: products
CREATE TABLE "products" (
    "productid" SERIAL PRIMARY KEY,
    "name" VARCHAR(100),
    "description" TEXT,
    "price" DECIMAL(10, 2),
    "stock" INT,
    "madein" VARCHAR(100),
    "rating" DECIMAL(3, 2),
    "discount" DECIMAL(10, 2),
    "maxdeliveryday" INT,
    "images" VARCHAR(255),
    "shopid" INT,
    "categoryid" INT,
    CONSTRAINT "fk_products_categoryid"
        FOREIGN KEY ("categoryid") REFERENCES "categories" ("categoryid")
        ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "fk_products_shopid"
        FOREIGN KEY ("shopid") REFERENCES "shops" ("shopid")
        ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Table: order_items
CREATE TABLE "order_items" (
    "orderitemid" SERIAL PRIMARY KEY,
    "orderid" INT,
    "productid" INT,
    "quantity" INT,
    "price" DECIMAL(10, 2)
);

-- Table: orders
CREATE TABLE "orders" (
    "orderid" SERIAL PRIMARY KEY,
    "userid" INT,
    "totalamount" DECIMAL(10, 2),
    "createdat" TIMESTAMP DEFAULT now()
);

-- Table: shippings
CREATE TABLE "shippings" (
    "shippingid" SERIAL PRIMARY KEY,
    "orderid" INT,
    "address" VARCHAR(255),
    "shippingmethod" VARCHAR(100),
    "cost" DECIMAL(10, 2),
    "deliveredat" TIMESTAMP
);
