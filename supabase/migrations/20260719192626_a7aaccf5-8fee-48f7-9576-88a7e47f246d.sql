
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

-- Auto-grant admin role to designated email on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.email = 'admin@saverra.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Projects
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL DEFAULT 'apartment', -- apartment, villa, commercial, plot, penthouse
  status TEXT NOT NULL DEFAULT 'new-launch', -- new-launch, ultra-luxury, premium, ready-to-move, upcoming
  city TEXT NOT NULL,
  location TEXT NOT NULL,
  builder TEXT,
  bhk_options TEXT, -- e.g. "2, 3, 4 BHK"
  min_bhk INT DEFAULT 2,
  max_bhk INT DEFAULT 4,
  price_display TEXT NOT NULL, -- e.g. "2.45 Cr*"
  price_numeric NUMERIC, -- in lakhs for filtering
  possession TEXT, -- e.g. "Dec 2026"
  rera_number TEXT,
  cover_image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  description TEXT,
  amenities TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  latitude NUMERIC,
  longitude NUMERIC,
  is_featured BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published projects" ON public.projects FOR SELECT USING (is_published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update projects" ON public.projects FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete projects" ON public.projects FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  city TEXT,
  rating INT DEFAULT 5,
  message TEXT NOT NULL,
  avatar_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.testimonials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read testimonials" ON public.testimonials FOR SELECT USING (is_published);
CREATE POLICY "admins manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Inquiries (contact form leads)
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  budget TEXT,
  message TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone submit inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "admins read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed projects
INSERT INTO public.projects (slug, name, tagline, category, status, city, location, builder, bhk_options, min_bhk, max_bhk, price_display, price_numeric, possession, rera_number, cover_image, gallery, description, amenities, highlights, is_featured) VALUES
('saverra-iconic','SAVERRA Iconic','Skyline living redefined','apartment','new-launch','Mumbai','Worli, Mumbai','SAVERRA Developers','3, 4 & 5 BHK Apartments',3,5,'₹ 2.45 Cr*',24500,'Dec 2026','P51900012345',
 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80',
 ARRAY['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80'],
 'An architectural landmark rising above the Worli skyline. Bespoke residences designed for those who seek the extraordinary — floor-to-ceiling glass, private sky decks, and hotel-grade concierge.',
 ARRAY['Infinity Pool','Sky Lounge','Concierge','Valet Parking','Spa & Salon','Business Centre'],
 ARRAY['80th-floor sky lounge','Private elevator lobbies','5-star hotel concierge'],true),
('saverra-enclave','SAVERRA Enclave','Ultra-luxury villas by the sea','villa','ultra-luxury','Mumbai','Bandra, Mumbai','SAVERRA Developers','4 & 5 BHK Villas',4,5,'₹ 8.90 Cr*',89000,'Mar 2027','P51900023456',
 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80',
 ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80'],
 'A private enclave of only 24 villas, each with a private pool, landscaped garden, and uninterrupted sea views.',
 ARRAY['Private Pool','Home Automation','Private Garden','Butler Service','24/7 Security'],
 ARRAY['Only 24 exclusive villas','Private plunge pool per villa','Handcrafted Italian interiors'],true),
('saverra-heights','SAVERRA Heights','Premium living at the tech capital','apartment','premium','Bengaluru','Hebbal, Bengaluru','SAVERRA Developers','2, 3 & 6 BHK Apartments',2,6,'₹ 1.75 Cr*',17500,'Dec 2025','PBM/KA/RERA/1251',
 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80',
 ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80','https://images.unsplash.com/photo-1580216643062-cf460548a66a?w=1600&q=80'],
 'Boutique high-rise designed for modern Bengaluru — steps from the tech corridors, minutes from the airport.',
 ARRAY['Rooftop Infinity Pool','Co-working Lounge','Yoga Deck','Kids Play Area','EV Charging'],
 ARRAY['10 mins to airport','Co-working lounge on 30th floor'],true),
('saverra-square','SAVERRA Square','Grade-A commercial address','commercial','premium','Gurugram','Gurugram, Haryana','SAVERRA Commercial','Office & Retail Spaces',0,0,'₹ 2.10 Cr*',21000,'Jan 2026','GGM/KA/RERA/876',
 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
 ARRAY['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80','https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80'],
 'A trophy commercial tower on the Golf Course Extension Road — pre-leased to marquee tenants.',
 ARRAY['Grade-A Offices','Retail Plaza','Food Court','Valet Parking','24/7 Security'],
 ARRAY['LEED Platinum design','Pre-leased anchor tenants','9% assured rental*'],true),
('saverra-greens','SAVERRA Greens','Premium villa plots','plot','premium','Bengaluru','Devanahalli, Bengaluru','SAVERRA Developers','Premium Villa Plots',0,0,'₹ 68 L*',6800,'Ready','PBM/KA/RERA/678',
 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80',
 ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80','https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1600&q=80'],
 'RERA-approved gated plot township near the international airport, with a clubhouse, sports arena and 70% open space.',
 ARRAY['Clubhouse','Sports Arena','Jogging Track','24/7 Security','Underground Utilities'],
 ARRAY['70% open space','Airport in 15 mins','Ready to register'],true),
('saverra-prestige','SAVERRA Prestige','Ready-to-move luxury apartments','apartment','ready-to-move','Mumbai','Thane, Mumbai','SAVERRA Developers','2, 3 & 4 BHK Apartments',2,4,'₹ 1.35 Cr*',13500,'Ready','P51900034567',
 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=1600&q=80',
 ARRAY['https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=1600&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600&q=80'],
 'Move-in-ready apartments overlooking Yeoor Hills with world-class clubhouse and podium-level gardens.',
 ARRAY['Swimming Pool','Club House','Gymnasium','Landscaped Garden','24/7 Security','Kids Play Area'],
 ARRAY['Ready to move','Yeoor Hills view','Vaastu-compliant homes'],true),
('saverra-crest','SAVERRA Crest','Sky penthouses','penthouse','ultra-luxury','Mumbai','Lower Parel, Mumbai','SAVERRA Developers','4 & 5 BHK Penthouses',4,5,'₹ 12.50 Cr*',125000,'Jun 2027','P51900045678',
 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80',
 ARRAY['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80','https://images.unsplash.com/photo-1600566753086-00f18fe6ba68?w=1600&q=80'],
 'Duplex penthouses crowning the SAVERRA skyline — private terrace pools and 360-degree city views.',
 ARRAY['Private Terrace Pool','Home Theatre','Wine Cellar','Private Elevator','Sky Garden'],
 ARRAY['Only 6 penthouses','Private terrace pool','360° city views'],true),
('saverra-woods','SAVERRA Woods','Forest-side residences','apartment','upcoming','Pune','Baner, Pune','SAVERRA Developers','2 & 3 BHK Apartments',2,3,'₹ 89 L*',8900,'Sep 2027','P52100056789',
 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80',
 ARRAY['https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1600&q=80'],
 'Homes wrapped in 4 acres of natural forest cover with jogging trails, meditation pods, and organic farms.',
 ARRAY['Forest Trail','Meditation Pod','Organic Farm','Swimming Pool','Yoga Deck'],
 ARRAY['4 acres of forest','Certified green building','Pre-launch pricing'],true);

-- Seed testimonials
INSERT INTO public.testimonials (name, city, rating, message, avatar_url) VALUES
('Rahul Sharma','Mumbai',5,'Buying a home with SAVERRA was a seamless experience. Highly professional and trustworthy team.','https://i.pravatar.cc/120?img=12'),
('Priya Mehta','Bengaluru',5,'From site visit to registration, every step felt premium. The property exceeded our expectations.','https://i.pravatar.cc/120?img=47'),
('Arjun Kapoor','Gurugram',5,'The transparency in pricing and legal paperwork is unmatched. Truly a trusted developer.','https://i.pravatar.cc/120?img=33'),
('Neha Reddy','Pune',5,'Loved the amenities and the location. SAVERRA delivered exactly what they promised.','https://i.pravatar.cc/120?img=45');
