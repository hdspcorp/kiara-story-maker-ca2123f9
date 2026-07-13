
CREATE TABLE public.content_state (
  channel TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.content_state TO anon, authenticated;
GRANT ALL ON public.content_state TO service_role;
ALTER TABLE public.content_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_can_read_published" ON public.content_state FOR SELECT
  TO anon, authenticated USING (channel = 'published');

CREATE TABLE public.admin_sessions (
  token TEXT PRIMARY KEY,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_sessions TO service_role;
ALTER TABLE public.admin_sessions ENABLE ROW LEVEL SECURITY;
-- no policies; only service_role via server functions

-- Seed empty published + draft rows (data will be filled by server on first read)
INSERT INTO public.content_state (channel, data) VALUES
  ('published', '{}'::jsonb),
  ('draft', '{}'::jsonb)
ON CONFLICT (channel) DO NOTHING;
