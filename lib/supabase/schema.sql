-- Create agent_cards table
CREATE TABLE IF NOT EXISTS agent_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tools TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  error BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on the published column for faster queries
CREATE INDEX IF NOT EXISTS idx_agent_cards_published ON agent_cards(published);

-- Create an index on the error column for faster queries
CREATE INDEX IF NOT EXISTS idx_agent_cards_error ON agent_cards(error);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_agent_cards_updated_at
  BEFORE UPDATE ON agent_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (based on your existing mock data)
INSERT INTO agent_cards (name, description, image, tools, published, error) VALUES
('Leave Policy Answer Bot', 'This is a description of the leave policy answer bot which exceeds one line.', '/new-agent.jpg', ARRAY['Gmail', 'Git'], true, true),
('Support Pro', 'A customer support agent that answers FAQs and escalates complex issues.', '/support-agent.jpg', ARRAY['Docs', 'CRM', 'Email'], true, false),
('Research Analyst', 'Scans the web, summarizes findings, and provides citations.', '/research-agent.jpg', ARRAY['Web', 'Notes', 'Citations'], false, false),
('Meeting Summarizer', 'Joins calls, records, and drafts summary notes with action items.', '/meeting-agent.jpg', ARRAY['Calendar', 'Transcribe', 'Docs'], true, true),
('Marketing Copywriter', 'Creates high-converting landing page copy and A/B test variants.', '/marketing-agent.jpg', ARRAY['SEO', 'A/B', 'Analytics', 'CMS'], false, false),
('Code Review Assistant', 'Analyzes pull requests and suggests improvements for code quality.', '/code-agent.jpg', ARRAY['GitHub', 'Git', 'Slack'], true, false),
('Invoice Manager', 'Processes invoices, tracks payments, and sends reminders automatically.', '/invoice-agent.jpg', ARRAY['QuickBooks', 'Gmail', 'Sheets'], false, false),
('Social Media Scheduler', 'Plans and publishes content across multiple social platforms.', '/social-agent.jpg', ARRAY['Twitter', 'LinkedIn', 'Instagram', 'Facebook'], true, false),
('Data Analytics Bot', 'Generates reports and visualizations from your business data.', '/analytics-agent.jpg', ARRAY['BigQuery', 'Tableau', 'Sheets'], false, true),
('Onboarding Coordinator', 'Guides new employees through setup, paperwork, and training.', '/onboarding-agent.jpg', ARRAY['HR Portal', 'Docs', 'Calendar', 'Slack'], true, false),
('Bug Tracker', 'Monitors error logs and automatically creates tickets with context.', '/bug-agent.jpg', ARRAY['Jira', 'Sentry', 'GitHub'], false, false),
('Content Moderator', 'Reviews user submissions and flags inappropriate content.', '/moderator-agent.jpg', ARRAY['AI Vision', 'Database', 'Slack'], true, false),
('Sales Lead Qualifier', 'Scores and prioritizes incoming leads based on fit and intent.', '/sales-agent.jpg', ARRAY['CRM', 'Gmail', 'LinkedIn'], false, false),
('Inventory Tracker', 'Monitors stock levels and triggers reorder alerts when low.', '/inventory-agent.jpg', ARRAY['ERP', 'Sheets', 'Gmail'], true, true),
('Newsletter Generator', 'Curates content and designs weekly newsletters for subscribers.', '/newsletter-agent.jpg', ARRAY['Mailchimp', 'RSS', 'Canva'], false, false);

-- Enable Row Level Security (RLS)
ALTER TABLE agent_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow anyone to read agent_cards
CREATE POLICY "Allow public read access" ON agent_cards
  FOR SELECT
  USING (true);

-- You can add more restrictive policies for INSERT, UPDATE, DELETE as needed
-- For example, only authenticated users can insert/update/delete:
-- CREATE POLICY "Allow authenticated insert" ON agent_cards
--   FOR INSERT
--   WITH CHECK (auth.role() = 'authenticated');