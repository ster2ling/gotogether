# Supabase Setup for GoTogether

## 🚀 Quick Setup

### 1. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy your **Project URL** and **anon/public key**

### 2. Update Environment Variables

Edit `.env.local` and replace the placeholder values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Set Up Database Schema

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script

### 4. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/dashboard`

### 5. Update Your App

Replace the mock auth context with Supabase auth:

```tsx
// In src/app/layout.tsx
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SupabaseAuthProvider>
          {children}
        </SupabaseAuthProvider>
      </body>
    </html>
  )
}
```

## 📊 Database Schema

The schema includes:

- **users** - User profiles (extends Supabase auth)
- **boards** - Travel planning boards
- **board_cards** - Cards on boards (destinations, activities, etc.)
- **board_messages** - Chat messages on boards
- **board_collaborators** - User permissions for boards

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with policies that ensure:
- Users can only access their own data
- Board owners can manage their boards
- Collaborators have appropriate permissions
- Public boards are viewable by everyone

## 🚀 Next Steps

1. **Test Authentication**: Try signing up and signing in
2. **Create Boards**: Test board creation and management
3. **Add Real-time Features**: Enable real-time subscriptions for live collaboration
4. **Add File Storage**: Set up Supabase Storage for images

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Check your environment variables
2. **"RLS policy violation"**: Ensure you're authenticated
3. **"Table doesn't exist"**: Run the SQL schema script

### Debug Mode:

Add this to see detailed Supabase logs:

```tsx
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true
  }
})
```

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) 