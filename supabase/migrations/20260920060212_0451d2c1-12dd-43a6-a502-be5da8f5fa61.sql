
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL DEFAULT 'admin',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.claim_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN RETURN false; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin') ON CONFLICT DO NOTHING;
  RETURN true;
END; $$;
GRANT EXECUTE ON FUNCTION public.claim_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  storage_path text,
  filename text NOT NULL DEFAULT 'file',
  media_type text NOT NULL DEFAULT 'image',
  mime_type text,
  size_bytes bigint,
  alt_text text,
  title text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.occasions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  icon text,
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  image_url text,
  parent_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.formats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  starting_price numeric,
  image_url text,
  icon text,
  features text[] NOT NULL DEFAULT '{}',
  cta_text text DEFAULT 'Explore',
  cta_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric,
  original_price numeric,
  discount_text text,
  description text,
  features text[] NOT NULL DEFAULT '{}',
  cta_text text DEFAULT 'Choose plan',
  cta_url text,
  badge text,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text,
  description text,
  product_type text NOT NULL DEFAULT 'Static Invitation',
  category_id uuid REFERENCES public.categories(id) ON DELETE SET NULL,
  occasion_id uuid REFERENCES public.occasions(id) ON DELETE SET NULL,
  format_id uuid REFERENCES public.formats(id) ON DELETE SET NULL,
  tags text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  price numeric,
  original_price numeric,
  discount_text text,
  show_starting_from boolean NOT NULL DEFAULT false,
  price_label text,
  badge text,
  status text NOT NULL DEFAULT 'draft',
  is_featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  video_section_title text,
  video_section_description text,
  video_url text,
  video_poster_url text,
  video_autoplay boolean NOT NULL DEFAULT false,
  video_muted boolean NOT NULL DEFAULT true,
  video_loop boolean NOT NULL DEFAULT false,
  seo_title text,
  seo_description text,
  og_image_url text,
  no_index boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.product_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  url text NOT NULL,
  poster_url text,
  media_type text NOT NULL DEFAULT 'image',
  title text,
  alt_text text,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX product_media_product_idx ON public.product_media (product_id);

CREATE TABLE public.showcase_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  block_type text NOT NULL DEFAULT 'image_text',
  title text,
  description text,
  media_urls text[] NOT NULL DEFAULT '{}',
  video_url text,
  poster_url text,
  alignment text NOT NULL DEFAULT 'left',
  background text NOT NULL DEFAULT 'ivory',
  button_text text,
  button_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX showcase_product_idx ON public.showcase_sections (product_id);

CREATE TABLE public.homepage_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL,
  title text,
  eyebrow text,
  subtitle text,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  sort_order int NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1,
  brand_name text NOT NULL DEFAULT 'KavyaVerse Digital',
  tagline text DEFAULT 'Every Design, Every Occasion.',
  logo_url text,
  favicon_url text,
  contact_email text,
  whatsapp_number text DEFAULT '919999999999',
  whatsapp_template text DEFAULT 'Hi KavyaVerse Digital, I''m interested in {product} ({price}). I''d like to know more about ordering it.',
  instagram_url text,
  facebook_url text,
  youtube_url text,
  currency text NOT NULL DEFAULT '₹',
  default_cta text DEFAULT 'Start Your Invitation',
  delivery_message text DEFAULT 'Delivered within 24–48 hours.',
  footer_description text DEFAULT 'Beautiful digital invitations for every celebration.',
  footer_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  nav_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  copyright_text text,
  seo_title text,
  seo_description text,
  og_image_url text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);
INSERT INTO public.site_settings (id) VALUES (1);

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['media_library','occasions','categories','formats','pricing_plans','products','product_media','showcase_sections','homepage_sections','site_settings']
  LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "%s public read" ON public.%I FOR SELECT USING (true)', t, t);
    EXECUTE format('CREATE POLICY "%s admin write" ON public.%I FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin())', t, t);
  END LOOP;
END $$;

CREATE TRIGGER t_occasions BEFORE UPDATE ON public.occasions FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER t_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER t_formats BEFORE UPDATE ON public.formats FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER t_pricing BEFORE UPDATE ON public.pricing_plans FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER t_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER t_homepage BEFORE UPDATE ON public.homepage_sections FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER t_settings BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.occasions (name, slug, description, icon, sort_order, is_featured) VALUES
 ('Wedding','wedding','Grand, traditional or modern shaadi cards.','💍',1,true),
 ('Engagement','engagement','Ring ceremony & roka invitations.','❤️',2,true),
 ('Birthday','birthday','First birthdays to milestone parties.','🎂',3,true),
 ('Baby Shower','baby-shower','Godh bharai & seemantham cards.','👶',4,true),
 ('Naming Ceremony','naming-ceremony','Namkaran & cradle ceremony invites.','🌸',5,false),
 ('Pooja','pooja','Satyanarayan, Ganesh, havan & more.','🪔',6,true),
 ('Housewarming','housewarming','Griha pravesh & vastu shanti.','🏠',7,false),
 ('Anniversary','anniversary','Silver, golden & every year between.','🎉',8,false),
 ('Festival','festival','Diwali, Navratri and every festival.','✨',9,false),
 ('Other','other','Retirement, corporate & more.','📅',10,false);

INSERT INTO public.categories (name, slug, description, sort_order) VALUES
 ('Traditional','traditional','Classic Indian motifs and detail.',1),
 ('Modern','modern','Clean, contemporary layouts.',2),
 ('Minimal','minimal','Quiet typography, lots of space.',3),
 ('Floral','floral','Botanical and floral artwork.',4),
 ('Royal','royal','Rich, regal and ornate.',5),
 ('Luxury','luxury','Premium finishes and gold detail.',6);

INSERT INTO public.formats (name, slug, description, starting_price, features, sort_order) VALUES
 ('Static Invitation','static-invitation','Elegant digital invitation card.',499,ARRAY['HD image card','Your names & details','WhatsApp-ready','1 revision'],1),
 ('Video Invitation','video-invitation','Animated invitation for WhatsApp.',1499,ARRAY['20–40 sec HD video','Music & animation','Names, dates & venue','2 revisions'],2),
 ('Premium Custom','premium-custom','Fully customised invitation.',1999,ARRAY['Designed from scratch','Multiple pages','HD image + PDF','Multiple revisions'],3);

INSERT INTO public.pricing_plans (name, price, description, features, badge, is_featured, sort_order) VALUES
 ('Basic',499,'Perfect for simple celebrations',ARRAY['Custom details','HD digital card','WhatsApp-ready','1 revision'],NULL,false,1),
 ('Popular',999,'For a complete invitation experience',ARRAY['Custom design','HD output','WhatsApp ready','PDF version','2 revisions'],'Most chosen',true,2),
 ('Premium',1999,'For special celebrations',ARRAY['Fully customised design','Multiple pages','Animation option','HD video','PDF version','Multiple revisions'],NULL,false,3);

INSERT INTO public.homepage_sections (section_key, eyebrow, title, subtitle, content, sort_order) VALUES
 ('hero','Digital Invitations • Designs • Celebrations','Your Occasion. Your Story. Beautifully Designed.','Beautiful digital invitations for weddings, birthdays, ceremonies and every moment worth celebrating.','{"primary_cta_text":"Explore Invitations","primary_cta_url":"/invitations","secondary_cta_text":"View Pricing","secondary_cta_url":"/pricing","media_type":"none","media_url":""}',1),
 ('occasions','Step 1 · Discover','What Are You Celebrating?','Choose a celebration to start browsing.','{}',2),
 ('formats','Step 2 · Choose','Choose Your Invitation Format','Pick the format that fits your celebration.','{}',3),
 ('featured_products','Designs','Featured Invitations','Hand-picked designs from our collection.','{}',4),
 ('pricing','Step 3 · See Price','Simple Pricing. Clear Choices.','One-time price. No hidden charges.','{}',5),
 ('collection','Gallery','Find a Design You Love.','Browse the full collection.','{}',6),
 ('included','What You Get','Everything You Need to Share Your Moment.',NULL,'{"items":[{"title":"Custom Design","desc":"Styled around your celebration."},{"title":"HD Quality","desc":"Crisp on every screen."},{"title":"WhatsApp Ready","desc":"Perfect size for sharing."},{"title":"PDF Version","desc":"Ready for email or print."},{"title":"Personalised Details","desc":"Names, dates, venue and RSVP."},{"title":"Revision Support","desc":"Changes before delivery."},{"title":"Fast Delivery","desc":"Ready within 24–48 hours."},{"title":"Video Option","desc":"Add motion and music."}]}',7),
 ('how_it_works','Process','From Idea to Invitation.',NULL,'{"steps":[{"n":"01","title":"Choose","desc":"Choose your design."},{"n":"02","title":"Share","desc":"Send your event details."},{"n":"03","title":"Design","desc":"We personalise your invitation."},{"n":"04","title":"Deliver","desc":"Receive your final invitation."}]}',8),
 ('occasion_showcase','Collections','Made for Every Celebration.',NULL,'{}',9),
 ('why_us','Why KavyaVerse','Designed Around Your Moment.',NULL,'{"items":[{"title":"Personalised","desc":"Your details become part of the design."},{"title":"Elegant","desc":"Designed with attention to typography and detail."},{"title":"Easy to Share","desc":"Made for WhatsApp and digital sharing."},{"title":"Made for You","desc":"Every celebration gets its own visual personality."}]}',10),
 ('final_cta',NULL,'Ready to Invite Beautifully?','Choose your style, share your details, and let us create the invitation.','{"primary_cta_text":"Start Your Invitation","secondary_cta_text":"WhatsApp Us"}',11);

CREATE POLICY "media files public read" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "media files admin write" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'media' AND public.is_admin()) WITH CHECK (bucket_id = 'media' AND public.is_admin());
