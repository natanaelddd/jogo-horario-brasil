
-- Remover todas as tabelas existentes
DROP TABLE IF EXISTS public.standings CASCADE;
DROP TABLE IF EXISTS public.games CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;
DROP TABLE IF EXISTS public.fetch_logs CASCADE;
DROP TABLE IF EXISTS public.data_sources CASCADE;

-- Criar tabela de times
CREATE TABLE public.teams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  nome_completo TEXT,
  sigla TEXT NOT NULL,
  escudo_url TEXT,
  cidade TEXT,
  estado TEXT,
  estadio TEXT,
  fundacao DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de jogos
CREATE TABLE public.games (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campeonato TEXT NOT NULL,
  serie TEXT,
  fase TEXT,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  time_casa TEXT NOT NULL,
  time_fora TEXT NOT NULL,
  time_casa_id UUID REFERENCES public.teams(id),
  time_fora_id UUID REFERENCES public.teams(id),
  estadio TEXT NOT NULL,
  transmissao TEXT[] DEFAULT '{}',
  rodada INTEGER,
  status TEXT DEFAULT 'agendado' CHECK (status IN ('agendado', 'ao_vivo', 'finalizado')),
  placar_casa INTEGER,
  placar_fora INTEGER,
  arbitro TEXT,
  publico INTEGER,
  tempo_jogo TEXT,
  cartoes_amarelos_casa INTEGER DEFAULT 0,
  cartoes_amarelos_fora INTEGER DEFAULT 0,
  cartoes_vermelhos_casa INTEGER DEFAULT 0,
  cartoes_vermelhos_fora INTEGER DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de classificação
CREATE TABLE public.standings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campeonato TEXT NOT NULL,
  temporada TEXT NOT NULL DEFAULT '2025',
  team_id UUID NOT NULL REFERENCES public.teams(id),
  posicao INTEGER NOT NULL,
  pontos INTEGER NOT NULL DEFAULT 0,
  jogos INTEGER NOT NULL DEFAULT 0,
  vitorias INTEGER NOT NULL DEFAULT 0,
  empates INTEGER NOT NULL DEFAULT 0,
  derrotas INTEGER NOT NULL DEFAULT 0,
  gols_pro INTEGER NOT NULL DEFAULT 0,
  gols_contra INTEGER NOT NULL DEFAULT 0,
  saldo_gols INTEGER,
  aproveitamento NUMERIC,
  ultimos_jogos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de logs de busca
CREATE TABLE public.fetch_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL CHECK (status IN ('success', 'error', 'partial')),
  source TEXT NOT NULL,
  campeonato TEXT NOT NULL,
  games_found INTEGER DEFAULT 0,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de fontes de dados
CREATE TABLE public.data_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 1,
  campeonatos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir alguns times de exemplo
INSERT INTO public.teams (nome, nome_completo, sigla, cidade, estado) VALUES
('Flamengo', 'Clube de Regatas do Flamengo', 'FLA', 'Rio de Janeiro', 'RJ'),
('Palmeiras', 'Sociedade Esportiva Palmeiras', 'PAL', 'São Paulo', 'SP'),
('Corinthians', 'Sport Club Corinthians Paulista', 'COR', 'São Paulo', 'SP'),
('São Paulo', 'São Paulo Futebol Clube', 'SAO', 'São Paulo', 'SP'),
('Santos', 'Santos Futebol Clube', 'SAN', 'Santos', 'SP'),
('Grêmio', 'Grêmio Foot-Ball Porto Alegrense', 'GRE', 'Porto Alegre', 'RS'),
('Internacional', 'Sport Club Internacional', 'INT', 'Porto Alegre', 'RS'),
('Atlético-MG', 'Clube Atlético Mineiro', 'ATM', 'Belo Horizonte', 'MG'),
('Cruzeiro', 'Cruzeiro Esporte Clube', 'CRU', 'Belo Horizonte', 'MG'),
('Botafogo', 'Botafogo de Futebol e Regatas', 'BOT', 'Rio de Janeiro', 'RJ');

-- Inserir jogos de maio de 2025 (próximos jogos)
INSERT INTO public.games (campeonato, data, hora, time_casa, time_fora, estadio, transmissao, status, rodada) VALUES
('brasileiro-a', '2025-05-10', '16:00', 'Flamengo', 'Palmeiras', 'Maracanã', ARRAY['Globo', 'Premiere'], 'agendado', 1),
('brasileiro-a', '2025-05-10', '18:30', 'Corinthians', 'São Paulo', 'Neo Química Arena', ARRAY['Globo', 'SporTV'], 'agendado', 1),
('brasileiro-a', '2025-05-11', '16:00', 'Santos', 'Grêmio', 'Vila Belmiro', ARRAY['Premiere'], 'agendado', 1),
('brasileiro-a', '2025-05-11', '18:30', 'Internacional', 'Atlético-MG', 'Beira-Rio', ARRAY['SporTV'], 'agendado', 1),
('brasileiro-a', '2025-05-12', '20:00', 'Botafogo', 'Cruzeiro', 'Nilton Santos', ARRAY['Globo'], 'agendado', 1),
('copa-do-brasil', '2025-05-15', '21:30', 'Flamengo', 'Corinthians', 'Maracanã', ARRAY['Globo', 'SporTV'], 'agendado', null),
('copa-do-brasil', '2025-05-16', '19:15', 'Palmeiras', 'Santos', 'Allianz Parque', ARRAY['SporTV'], 'agendado', null),
('libertadores', '2025-05-20', '21:30', 'Flamengo', 'Boca Juniors', 'Maracanã', ARRAY['SBT', 'Paramount+'], 'agendado', null),
('libertadores', '2025-05-21', '19:15', 'Palmeiras', 'River Plate', 'Allianz Parque', ARRAY['SBT', 'Paramount+'], 'agendado', null),
('brasileiro-a', '2025-05-25', '16:00', 'São Paulo', 'Botafogo', 'Morumbis', ARRAY['Premiere'], 'agendado', 2);

-- Inserir classificação de exemplo para o Brasileiro A
INSERT INTO public.standings (campeonato, temporada, team_id, posicao, pontos, jogos, vitorias, empates, derrotas, gols_pro, gols_contra, saldo_gols, aproveitamento)
SELECT 
  'brasileiro-a',
  '2025',
  t.id,
  ROW_NUMBER() OVER (ORDER BY RANDOM()),
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0.0
FROM public.teams t
LIMIT 10;
