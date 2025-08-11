-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create boards table
CREATE TABLE IF NOT EXISTS public.boards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_public BOOLEAN DEFAULT FALSE
);

-- Create board_cards table
CREATE TABLE IF NOT EXISTS public.board_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE NOT NULL,
    type TEXT CHECK (type IN ('destination', 'accommodation', 'activity', 'restaurant', 'transport', 'note')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    price TEXT,
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    image TEXT,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    created_by UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create board_messages table
CREATE TABLE IF NOT EXISTS public.board_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE NOT NULL,
    text TEXT NOT NULL,
    sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create board_collaborators table
CREATE TABLE IF NOT EXISTS public.board_collaborators (
    board_id UUID REFERENCES public.boards(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('owner', 'editor', 'viewer')) DEFAULT 'viewer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (board_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_boards_created_by ON public.boards(created_by);
CREATE INDEX IF NOT EXISTS idx_board_cards_board_id ON public.board_cards(board_id);
CREATE INDEX IF NOT EXISTS idx_board_cards_created_by ON public.board_cards(created_by);
CREATE INDEX IF NOT EXISTS idx_board_messages_board_id ON public.board_messages(board_id);
CREATE INDEX IF NOT EXISTS idx_board_collaborators_board_id ON public.board_collaborators(board_id);
CREATE INDEX IF NOT EXISTS idx_board_collaborators_user_id ON public.board_collaborators(user_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_collaborators ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for boards table
CREATE POLICY "Users can view boards they own or collaborate on" ON public.boards
    FOR SELECT USING (
        created_by = auth.uid() OR
        id IN (
            SELECT board_id FROM public.board_collaborators 
            WHERE user_id = auth.uid()
        ) OR
        is_public = TRUE
    );

CREATE POLICY "Users can create boards" ON public.boards
    FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update boards they own" ON public.boards
    FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete boards they own" ON public.boards
    FOR DELETE USING (auth.uid() = created_by);

-- RLS Policies for board_cards table
CREATE POLICY "Users can view cards on boards they have access to" ON public.board_cards
    FOR SELECT USING (
        board_id IN (
            SELECT id FROM public.boards 
            WHERE created_by = auth.uid() OR is_public = TRUE
            UNION
            SELECT board_id FROM public.board_collaborators 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create cards on boards they have access to" ON public.board_cards
    FOR INSERT WITH CHECK (
        board_id IN (
            SELECT id FROM public.boards 
            WHERE created_by = auth.uid()
            UNION
            SELECT board_id FROM public.board_collaborators 
            WHERE user_id = auth.uid() AND role IN ('owner', 'editor')
        )
    );

CREATE POLICY "Users can update cards they created or on boards they own" ON public.board_cards
    FOR UPDATE USING (
        created_by = auth.uid() OR
        board_id IN (
            SELECT id FROM public.boards 
            WHERE created_by = auth.uid()
        )
    );

CREATE POLICY "Users can delete cards they created or on boards they own" ON public.board_cards
    FOR DELETE USING (
        created_by = auth.uid() OR
        board_id IN (
            SELECT id FROM public.boards 
            WHERE created_by = auth.uid()
        )
    );

-- RLS Policies for board_messages table
CREATE POLICY "Users can view messages on boards they have access to" ON public.board_messages
    FOR SELECT USING (
        board_id IN (
            SELECT id FROM public.boards 
            WHERE created_by = auth.uid() OR is_public = TRUE
            UNION
            SELECT board_id FROM public.board_collaborators 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create messages on boards they have access to" ON public.board_messages
    FOR INSERT WITH CHECK (
        board_id IN (
            SELECT id FROM public.boards 
            WHERE created_by = auth.uid()
            UNION
            SELECT board_id FROM public.board_collaborators 
            WHERE user_id = auth.uid()
        )
    );

-- RLS Policies for board_collaborators table
CREATE POLICY "Users can view collaborators on boards they have access to" ON public.board_collaborators
    FOR SELECT USING (
        board_id IN (
            SELECT id FROM public.boards 
            WHERE created_by = auth.uid()
            UNION
            SELECT board_id FROM public.board_collaborators 
            WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Board owners can manage collaborators" ON public.board_collaborators
    FOR ALL USING (
        board_id IN (
            SELECT id FROM public.boards 
            WHERE created_by = auth.uid()
        )
    );

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_boards_updated_at BEFORE UPDATE ON public.boards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_board_cards_updated_at BEFORE UPDATE ON public.board_cards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, first_name, last_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 