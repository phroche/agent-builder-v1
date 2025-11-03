-- Test if we can query the tool_cards table
-- Run this in Supabase SQL Editor

-- 1. Check if table exists and has data
SELECT COUNT(*) as total_rows FROM tool_cards;

-- 2. Get all data from tool_cards
SELECT * FROM tool_cards;

-- 3. Check the column names and types
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'tool_cards'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- 4. Check RLS policies
SELECT
    schemaname,
    tablename,
    policyname,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename = 'tool_cards';
