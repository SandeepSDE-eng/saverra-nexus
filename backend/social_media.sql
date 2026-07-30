-- Create the table for Social Media posts
CREATE TABLE IF NOT EXISTS social_media_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  platform text NOT NULL CHECK (platform IN ('instagram', 'youtube', 'facebook')),
  url text NOT NULL,
  embed_id text NOT NULL,
  title text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE social_media_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active social media posts"
  ON social_media_posts
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Allow authenticated users to manage social media posts"
  ON social_media_posts
  FOR ALL
  USING (auth.role() = 'authenticated');
