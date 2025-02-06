/*
  # Add VAT number and update admin privileges

  1. Changes
    - Add VAT number column to companies table
    - Set VAT number for a specific company
    - Update admin privileges for users in that company
  
  2. Security
    - Maintains existing RLS policies
*/

-- Add VAT number column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'companies' 
    AND column_name = 'vat_number'
  ) THEN
    ALTER TABLE companies ADD COLUMN vat_number text;
  END IF;
END $$;

-- Set VAT number for a specific company (using the first company as an example)
UPDATE companies 
SET vat_number = '123123-1'
WHERE id = (SELECT id FROM companies ORDER BY created_at LIMIT 1);

-- Update admin privileges
DO $$ 
BEGIN
  UPDATE profiles
  SET is_admin = true
  WHERE user_id IN (
    SELECT cu.user_id
    FROM company_users cu
    JOIN companies c ON c.id = cu.company_id
    WHERE c.vat_number = '123123-1'
  );
END $$;