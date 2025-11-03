-- Create tool_cards table
CREATE TABLE IF NOT EXISTS public.tool_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'inactive',
  published BOOLEAN DEFAULT false,
  error BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index on created_at for faster ordering
CREATE INDEX IF NOT EXISTS tool_cards_created_at_idx ON public.tool_cards(created_at DESC);

-- Create an index on category for faster filtering
CREATE INDEX IF NOT EXISTS tool_cards_category_idx ON public.tool_cards(category);

-- Create an index on status for faster filtering
CREATE INDEX IF NOT EXISTS tool_cards_status_idx ON public.tool_cards(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tool_cards ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust these based on your authentication requirements)
-- Allow all users to read tool_cards
CREATE POLICY "Allow public read access" ON public.tool_cards
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert tool_cards
CREATE POLICY "Allow authenticated insert access" ON public.tool_cards
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update tool_cards
CREATE POLICY "Allow authenticated update access" ON public.tool_cards
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete tool_cards
CREATE POLICY "Allow authenticated delete access" ON public.tool_cards
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Insert some sample data
INSERT INTO public.tool_cards (name, description, image, category, status, published, error) VALUES
  ('Gmail API', 'Send and receive emails programmatically using Gmail integration', '/tool-gmail.jpg', 'Communication', 'active', true, false),
  ('GitHub API', 'Access repositories, issues, and pull requests via GitHub API', '/tool-github.jpg', 'Development', 'active', true, false),
  ('Slack API', 'Send messages and interact with Slack workspaces', '/tool-slack.jpg', 'Communication', 'active', true, false),
  ('Google Analytics', 'Track and analyze website traffic and user behavior', '/tool-analytics.jpg', 'Analytics', 'active', false, false),
  ('Stripe API', 'Process payments and manage subscriptions', '/tool-stripe.jpg', 'Productivity', 'active', true, false),
  ('MongoDB', 'NoSQL database for storing and retrieving data', '/tool-mongodb.jpg', 'Storage', 'inactive', false, false),
  ('PostgreSQL', 'Relational database for structured data storage', '/tool-postgres.jpg', 'Storage', 'active', true, false),
  ('Auth0', 'Authentication and authorization service', '/tool-auth0.jpg', 'Security', 'active', true, false);
