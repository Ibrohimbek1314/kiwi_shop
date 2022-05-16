create database kiwi;

create extension pgcrypto;

    drop table if exists users cascade;
    create table users (
        user_id serial not null primary key,
        username character varying(50) not null unique,
        password character varying(255) not null,
        contact character varying(12) not null,
        email character varying(256) not null unique,
        is_admin boolean default false,
        user_create_at timestamp default current_timestamp,
        user_deleted_at timestamp default null
    );


    drop table if exists categories cascade;
    create table categories(
        category_id serial not null primary key,
        categoryname character varying(30) not null unique,
        category_created_at timestamp default current_timestamp,
        category_deleted_at timestamp default null
    );

    drop table if exists products cascade;
    create table products (
        product_id serial not null primary key,
        product_name character varying(256) not null,
        product_img character varying(256) not null,
        product_price decimal(10, 2) not null,
        product_short_description character varying(256) not null,
        product_long_description text,
        categoryname character varying(30) references categories(categoryname),
        product_created_at timestamp default current_timestamp,
        product_deleted_at timestamp default null
    );

    drop table if exists orders cascade;
    create table orders(
        order_id serial not null primary key,
        user_id int not null references users(user_id),
        is_paid character varying (20),
        product_id int not null references products(product_id),
        totalprice int not null,
        count int not null default 1,
        order_created_at timestamp default current_timestamp,
        order_deleted_at timestamp default null
    );

    drop table if exists order_products cascade;
    create table order_products(
        order_products_id serial not null primary key,
        order_id int not null references orders(order_id),
        product_id int not null references products(product_id),
        count int not null default 1,
        order_products_created_at timestamp default current_timestamp,
        order_products_deleted_at timestamp default null
    );




/*
    users
    categories
    products
    order

*/