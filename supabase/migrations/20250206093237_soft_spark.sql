-- Update profiles policies for better access control
DROP POLICY IF EXISTS "Profiles are viewable by owners and admins" ON profiles;

-- Create a single, comprehensive policy for profile access
CREATE POLICY "Unified profiles access policy"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR 
    EXISTS (
      SELECT 1 
      FROM profiles AS admin_profile 
      WHERE admin_profile.user_id = auth.uid() 
      AND admin_profile.is_admin = true
    )
  );