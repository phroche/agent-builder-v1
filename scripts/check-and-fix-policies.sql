-- Step 1: Check existing policies on both tables
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('agent_cards', 'tool_cards')
ORDER BY tablename, policyname;

-- Step 2: Copy the policies from agent_cards to tool_cards
-- First, let's see what policies agent_cards has, then we'll create the same for tool_cards

-- If agent_cards has a policy like "Enable read access for all users",
-- we need to create the same for tool_cards:

-- Drop existing policies on tool_cards (if any)
DROP POLICY IF EXISTS "Enable read access for all users" ON tool_cards;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON tool_cards;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON tool_cards;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON tool_cards;

-- Create the same policies as agent_cards
-- Allow anyone to read (SELECT)
CREATE POLICY "Enable read access for all users"
ON tool_cards
FOR SELECT
USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users only"
ON tool_cards
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Enable update for authenticated users only"
ON tool_cards
FOR UPDATE
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Enable delete for authenticated users only"
ON tool_cards
FOR DELETE
USING (auth.role() = 'authenticated');

-- Step 3: Verify the policies were created
SELECT
  tablename,
  policyname,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'tool_cards';
