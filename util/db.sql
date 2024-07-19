CREATE DATABASE simple_management;

USE simple_management;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    phone VARCHAR(15),
    address_street VARCHAR(255),
    address_neighborhood VARCHAR(255),
    address_number VARCHAR(10),
    address_city VARCHAR(255),
    business_name VARCHAR(255),
    cnpj VARCHAR(18) UNIQUE,
    trade_name VARCHAR(255)
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    barcode VARCHAR(100) UNIQUE,
    name TEXT,
    cost DECIMAL(10, 2),
    price DECIMAL(10, 2),
    quantity INT
);

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    cost DECIMAL(10, 2),
    price DECIMAL(10, 2)
);

CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    total DECIMAL(10, 2),
    date DATETIME,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE sales_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_id INT,
    product_id INT,
    quantity INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
