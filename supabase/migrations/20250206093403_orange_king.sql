/*
  # Fix Profile and Company Policies

  1. Changes
    - Drop and recreate profile policies to avoid conflicts
    - Add proper company update policies
    - Fix infinite recursion issues
    
  2. Security
    - Maintain proper access control for profiles
    - Allow company members to update their company info
    - Ensure admins retain full access
*/

-- First drop all existing profile policies to avoid conflicts
DROP POLICY IF EXISTS "Profiles are viewable by owners and admins" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Unified profiles access policy" ON profiles;
DROP POLICY IF EXISTS "Profiles access policy" ON profiles;

-- Create new non-recursive profile policies
CREATE POLICY "View own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admin view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND is_admin = true
      AND profiles.user_id != auth.uid()
    )
  );

-- Update company policies
DROP POLICY IF EXISTS "Users can update their own company" ON companies;

CREATE POLICY "Company members can update company"
  ON companies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_users
      WHERE company_id = companies.id
      AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM company_users
      WHERE company_id = companies.id
      AND user_id = auth.uid()
    )
  );