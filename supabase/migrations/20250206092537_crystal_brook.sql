/*
  # Create news table and sample data

  1. New Tables
    - `news`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `priority` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS
    - Add policy for all authenticated users to read news
*/

-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  priority text NOT NULL DEFAULT 'low',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policy for reading news
CREATE POLICY "Anyone can read news"
  ON news FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample news
INSERT INTO news (title, content, priority) VALUES
('New Security Features Released', 'We''ve added new security features to our EDR solution including AI-powered threat detection.', 'high'),
('System Maintenance Notice', 'Scheduled maintenance will be performed this weekend to improve system performance.', 'medium'),
('Product Update: Cloud Backup Pro', 'New features added to Cloud Backup Pro including improved compression and faster backup speeds.', 'medium'),
('Customer Portal Improvements', 'We''ve updated the customer portal with new features and a more intuitive interface.', 'low'),
('Holiday Support Schedule', 'Check our updated support schedule for the upcoming holiday season.', 'low');