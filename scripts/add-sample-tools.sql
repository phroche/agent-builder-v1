-- Sample tools data to insert into tool_cards table
-- Run this in your Supabase SQL Editor to add sample tools

INSERT INTO public.tool_cards (name, description, image, category, status, published, error) VALUES
  ('Gmail API', 'Send and receive emails programmatically using Gmail integration', 'https://via.placeholder.com/150/4285F4/FFFFFF?text=Gmail', 'Communication', 'active', true, false),
  ('GitHub API', 'Access repositories, issues, and pull requests via GitHub API', 'https://via.placeholder.com/150/181717/FFFFFF?text=GitHub', 'Development', 'active', true, false),
  ('Slack API', 'Send messages and interact with Slack workspaces', 'https://via.placeholder.com/150/4A154B/FFFFFF?text=Slack', 'Communication', 'active', true, false),
  ('Google Analytics', 'Track and analyze website traffic and user behavior', 'https://via.placeholder.com/150/F9AB00/FFFFFF?text=GA', 'Analytics', 'active', false, false),
  ('Stripe API', 'Process payments and manage subscriptions', 'https://via.placeholder.com/150/635BFF/FFFFFF?text=Stripe', 'Productivity', 'active', true, false),
  ('MongoDB', 'NoSQL database for storing and retrieving data', 'https://via.placeholder.com/150/47A248/FFFFFF?text=Mongo', 'Storage', 'inactive', false, false),
  ('PostgreSQL', 'Relational database for structured data storage', 'https://via.placeholder.com/150/336791/FFFFFF?text=Postgres', 'Storage', 'active', true, false),
  ('Auth0', 'Authentication and authorization service', 'https://via.placeholder.com/150/EB5424/FFFFFF?text=Auth0', 'Security', 'active', true, false),
  ('Twilio API', 'Send SMS messages and make voice calls', 'https://via.placeholder.com/150/F22F46/FFFFFF?text=Twilio', 'Communication', 'active', false, true),
  ('OpenAI API', 'Access GPT models for natural language processing', 'https://via.placeholder.com/150/10A37F/FFFFFF?text=OpenAI', 'Development', 'active', true, false);
