# Update Database Types

To generate the correct TypeScript types for your Supabase tables including `tool_cards`:

## Option 1: Using Supabase CLI (Recommended)

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/database.types.ts
```

Replace `YOUR_PROJECT_ID` with your actual Supabase project ID (found in Project Settings).

## Option 2: Manual Update

Add the `tool_cards` table definition to `lib/supabase/database.types.ts`:

```typescript
tool_cards: {
  Row: {
    id: string
    name: string
    description: string
    image: string
    category: string
    status: string
    published: boolean
    error: boolean
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    name: string
    description: string
    image: string
    category: string
    status?: string
    published?: boolean
    error?: boolean
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    name?: string
    description?: string
    image?: string
    category?: string
    status?: string
    published?: boolean
    error?: boolean
    created_at?: string
    updated_at?: string
  }
}
```

## What columns should be in tool_cards table?

Based on the tool card component, these columns are expected:
- `id` (uuid/text, primary key)
- `name` (text) - Tool name
- `description` (text) - Tool description
- `image` (text) - Image URL
- `category` (text) - Category like "Communication", "Development", etc.
- `status` (text) - "active" or "inactive"
- `published` (boolean) - Whether published
- `error` (boolean) - Whether has errors
- `created_at` (timestamp)
- `updated_at` (timestamp)
