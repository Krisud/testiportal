/*
  # Initial Schema Setup for IT Services Portal

  1. New Tables
    - profiles
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - is_admin (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - companies
      - id (uuid, primary key)
      - name (text)
      - contact_email (text)
      - contact_phone (text)
      - address (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - company_users
      - id (uuid, primary key)
      - company_id (uuid, references companies)
      - user_id (uuid, references auth.users)
      - role (text)
      - created_at (timestamp)

    - products
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - type (text)
      - price (numeric)
      - billing_cycle (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - contracts
      - id (uuid, primary key)
      - company_id (uuid, references companies)
      - product_id (uuid, references products)
      - quantity (integer)
      - start_date (date)
      - end_date (date)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin and customer access
*/

-- Create tables
CREATE TABLE profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    is_admin boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
);

CREATE TABLE companies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    contact_email text,
    contact_phone text,
    address text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE company_users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id uuid REFERENCES companies NOT NULL,
    user_id uuid REFERENCES auth.users NOT NULL,
    role text NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(company_id, user_id)
);

CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    type text NOT NULL,
    price numeric NOT NULL,
    billing_cycle text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE contracts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id uuid REFERENCES companies NOT NULL,
    product_id uuid REFERENCES products NOT NULL,
    quantity integer NOT NULL DEFAULT 1,
    start_date date NOT NULL,
    end_date date,
    status text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Profiles are viewable by owners and admins"
    ON profiles FOR SELECT
    USING (
        auth.uid() = user_id OR 
        EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true)
    );

CREATE POLICY "Companies are viewable by their users and admins"
    ON companies FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM company_users WHERE company_id = companies.id AND user_id = auth.uid()
        ) OR 
        EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true)
    );

CREATE POLICY "Products are viewable by all authenticated users"
    ON products FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Contracts are viewable by company users and admins"
    ON contracts FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM company_users 
            WHERE company_id = contracts.company_id AND user_id = auth.uid()
        ) OR 
        EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND is_admin = true)
    );

-- Function to set first user as admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, is_admin)
  VALUES (NEW.id, NOT EXISTS (SELECT 1 FROM public.profiles LIMIT 1));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to handle new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();