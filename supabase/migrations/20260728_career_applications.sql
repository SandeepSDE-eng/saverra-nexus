-- Career Applications Table
CREATE TABLE public.career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  experience_years TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Permissions
GRANT INSERT ON public.career_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.career_applications TO authenticated;
GRANT ALL ON public.career_applications TO service_role;

-- Row Level Security
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone submit career application" 
ON public.career_applications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "admins read career applications" 
ON public.career_applications FOR SELECT TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins update career applications" 
ON public.career_applications FOR UPDATE TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete career applications" 
ON public.career_applications FOR DELETE TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));
