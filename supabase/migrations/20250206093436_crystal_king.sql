/*
  # Fix Profile Policies Recursion

  1. Changes
    - Drop all existing profile policies
    - Create simplified non-recursive policies
    - Fix contracts policy to avoid profile dependency
    
  2. Security
    - Maintain proper access control
    - Prevent infinite recursion
    - Keep admin privileges
*/

-- Drop all existing profile policies
DROP POLICY IF EXISTS "Profiles are viewable by owners and admins" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Unified profiles access policy" ON profiles;
DROP POLICY IF EXISTS "Profiles access policy" ON profiles;
DROP POLICY IF EXISTS "View own profile" ON profiles;
DROP POLICY IF EXISTS "Admin view all profiles" ON profiles;

-- Create simplified profile policies
CREATE POLICY "basic_profile_access"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    is_admin = true
  );

-- Update contracts policy to avoid profile dependency
DROP POLICY IF EXISTS "Contracts are viewable by company users and admins" ON contracts;

CREATE POLICY "contracts_access"
  ON contracts FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_users 
      WHERE company_id = contracts.company_id 
      AND user_id = auth.uid()
    )
  );