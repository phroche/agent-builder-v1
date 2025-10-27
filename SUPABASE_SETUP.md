# Supabase Setup Guide

This guide will help you set up Supabase for your agent builder project.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Step 1: Install Dependencies

The Supabase package has been added to `package.json`. Run:

```bash
npm install
```

## Step 2: Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in your project details:
   - Name: agent-builder (or your preferred name)
   - Database Password: (create a strong password)
   - Region: (choose the closest to your users)
4. Click "Create new project" and wait for it to be set up

## Step 3: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Find these two values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 4: Configure Environment Variables

1. Open the `.env.local` file in the root of your project
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**Important:** Never commit your `.env.local` file to version control!

## Step 5: Create the Database Table

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `lib/supabase/schema.sql` and paste it into the SQL editor
4. Click "Run" to execute the SQL

This will:
- Create the `agent_cards` table with all required columns
- Set up indexes for better performance
- Insert sample data (15 agent cards)
- Enable Row Level Security (RLS)
- Create a policy for public read access

## Step 6: Verify the Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see the `agent_cards` table
3. Click on it to view the 15 sample records

## Step 7: Run Your Application

```bash
npm run dev
```

Your application should now be connected to Supabase and displaying agents from the database!

## Database Schema

The `agent_cards` table has the following structure:

| Column      | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| id          | UUID      | Primary key (auto-generated)          |
| name        | TEXT      | Agent name                            |
| description | TEXT      | Agent description                     |
| image       | TEXT      | URL to agent image                    |
| tools       | TEXT[]    | Array of tools the agent uses         |
| published   | BOOLEAN   | Whether agent is published            |
| error       | BOOLEAN   | Whether agent has errors              |
| created_at  | TIMESTAMP | Timestamp when record was created     |
| updated_at  | TIMESTAMP | Timestamp when record was last updated|

## Custom Hook

The `useAgents()` hook provides the following functionality:

```typescript
const { agents, loading, error, refetch, addAgent, updateAgent, deleteAgent } = useAgents()
```

- `agents`: Array of agent objects from the database
- `loading`: Boolean indicating if data is being fetched
- `error`: Error object if fetch failed
- `refetch()`: Function to manually refresh the data
- `addAgent(agent)`: Function to add a new agent
- `updateAgent(id, updates)`: Function to update an existing agent
- `deleteAgent(id)`: Function to delete an agent

## Troubleshooting

### Error: "Missing Supabase environment variables"

Make sure you've:
1. Created the `.env.local` file
2. Added your actual Supabase URL and anon key
3. Restarted your development server after adding the variables

### Error loading agents

1. Check that the `agent_cards` table exists in your Supabase dashboard
2. Verify that Row Level Security policies allow read access
3. Check the browser console for more detailed error messages

### npm install fails

If you encounter issues with `npm install`, try:
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

## Security Notes

- The `anon` key is safe to use in client-side code
- Row Level Security (RLS) is enabled to protect your data
- Currently, the table allows public read access
- You can add authentication and more restrictive policies as needed

## Next Steps

- Add authentication using Supabase Auth
- Implement more restrictive RLS policies
- Add image upload functionality using Supabase Storage
- Set up real-time subscriptions to watch for data changes