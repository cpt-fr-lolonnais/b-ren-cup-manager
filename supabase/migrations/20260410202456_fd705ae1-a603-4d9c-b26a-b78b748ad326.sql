CREATE TABLE public.tournament_state (
  id UUID NOT NULL PRIMARY KEY,
  state JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tournament_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read tournament state"
  ON public.tournament_state FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert tournament state"
  ON public.tournament_state FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update tournament state"
  ON public.tournament_state FOR UPDATE
  USING (true);