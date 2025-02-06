-- Add vat_number column to companies table
ALTER TABLE companies ADD COLUMN IF NOT EXISTS vat_number text;

-- Set initial VAT numbers for sample companies
UPDATE companies 
SET vat_number = CASE name
  WHEN 'TechCorp Solutions' THEN '123123-1'
  WHEN 'DataFlow Systems' THEN '123123-2'
  WHEN 'CloudNine Industries' THEN '123123-3'
  WHEN 'SecureNet Ltd' THEN '123123-4'
  WHEN 'InnovateIT Group' THEN '123123-5'
END;

-- Update admin status for users in company with VAT 123123-1
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