-- Connect to postgres database
\c postgres;

-- Drop database if it exists
DROP DATABASE IF EXISTS "shopify_challenge";

-- Create database
CREATE DATABASE shopify_challenge;

-- Connect to shopify_challenge database
\c shopify_challenge;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create images table
CREATE TABLE images (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  image_url TEXT,
  private BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);