  -- Scripts to run to create database and tables
  CREATE DATABASE apiupflow;
  CREATE USER apiUser WITH PASSWORD 'password';
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE TABLE IF NOT EXISTS pdf (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	name TEXT UNIQUE NOT NULL,
	url TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS thumbnail (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    url TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pdf_thumbnail (
    pdf_id UUID NOT NULL,
    thumbnail_id UUID NOT NULL
  );