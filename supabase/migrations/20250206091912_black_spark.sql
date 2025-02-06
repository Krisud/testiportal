/*
  # Add sample data for the IT Services Portal

  1. Sample Data
    - Add sample companies
    - Add sample products
    - Add sample contracts
*/

-- Insert sample products
INSERT INTO products (name, description, type, price, billing_cycle) VALUES
('Enterprise EDR', 'Advanced endpoint detection and response solution with AI-powered threat hunting', 'security', 25.00, 'monthly'),
('Cloud Backup Pro', 'Secure cloud backup solution with unlimited storage and versioning', 'backup', 15.00, 'monthly'),
('Network Monitor Plus', 'Comprehensive network monitoring and analytics suite', 'monitoring', 35.00, 'monthly'),
('IT Support 24/7', 'Round-the-clock IT support and maintenance service', 'support', 50.00, 'monthly'),
('Email Security Gateway', 'Advanced email protection with anti-phishing and encryption', 'security', 10.00, 'monthly');

-- Insert sample companies
INSERT INTO companies (name, contact_email, contact_phone, address) VALUES
('TechCorp Solutions', 'contact@techcorp.com', '+1-555-0123', '123 Tech Street, Silicon Valley, CA'),
('DataFlow Systems', 'info@dataflow.com', '+1-555-0124', '456 Data Drive, Boston, MA'),
('CloudNine Industries', 'support@cloudnine.com', '+1-555-0125', '789 Cloud Avenue, Seattle, WA'),
('SecureNet Ltd', 'contact@securenet.com', '+1-555-0126', '321 Security Road, Austin, TX'),
('InnovateIT Group', 'hello@innovateit.com', '+1-555-0127', '654 Innovation Blvd, New York, NY');

-- Insert sample contracts (one for each company with different products)
INSERT INTO contracts (company_id, product_id, quantity, start_date, end_date, status)
SELECT 
  c.id as company_id,
  p.id as product_id,
  FLOOR(RANDOM() * 50 + 10)::integer as quantity,
  CURRENT_DATE - INTERVAL '1 month' * FLOOR(RANDOM() * 6)::integer as start_date,
  CURRENT_DATE + INTERVAL '1 year' as end_date,
  'active' as status
FROM companies c
CROSS JOIN products p
WHERE random() < 0.7;