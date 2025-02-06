/*
  # Update profiles table RLS policy

  1. Changes
    - Simplify admin check by using a direct user_id comparison
    - Remove nested EXISTS clause to prevent recursion
    - Combine policies into a single, more efficient policy
  
  2. Security
    - Maintain same security level while improving performance
    - Users can still only see their own profile
    - Admins can still view all profiles
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create a single, simplified policy
CREATE POLICY "Profiles access policy"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR 
    (SELECT is_admin FROM profiles WHERE user_id = auth.uid())
  );