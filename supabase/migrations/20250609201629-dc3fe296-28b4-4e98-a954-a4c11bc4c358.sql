
-- Inserir dados de exemplo para o Mundial de Clubes FIFA 2025
INSERT INTO games (
  id,
  campeonato,
  data,
  hora,
  time_casa,
  time_fora,
  estadio,
  transmissao,
  status,
  fase
) VALUES 
(
  gen_random_uuid(),
  'mundial-clubes',
  '2025-06-15',
  '16:00',
  'Real Madrid',
  'Manchester City',
  'MetLife Stadium',
  ARRAY['FIFA+', 'Globo'],
  'agendado',
  'Semifinal'
),
(
  gen_random_uuid(),
  'mundial-clubes',
  '2025-06-16',
  '19:00',
  'Bayern Munich',
  'Chelsea',
  'Rose Bowl',
  ARRAY['FIFA+', 'ESPN'],
  'agendado',
  'Semifinal'
),
(
  gen_random_uuid(),
  'mundial-clubes',
  '2025-06-12',
  '21:00',
  'Palmeiras',
  'Al Hilal',
  'Hard Rock Stadium',
  ARRAY['FIFA+', 'SporTV'],
  'finalizado',
  'Quartas de Final'
);

-- Inserir alguns jogos recentes finalizados para testar o histórico
INSERT INTO games (
  id,
  campeonato,
  data,
  hora,
  time_casa,
  time_fora,
  estadio,
  transmissao,
  status,
  placar_casa,
  placar_fora,
  rodada
) VALUES 
(
  gen_random_uuid(),
  'brasileiro-a',
  '2025-01-20',
  '16:00',
  'Flamengo',
  'Palmeiras',
  'Maracanã',
  ARRAY['Globo', 'Premiere'],
  'finalizado',
  2,
  1,
  1
),
(
  gen_random_uuid(),
  'brasileiro-a',
  '2025-01-21',
  '18:30',
  'Corinthians',
  'São Paulo',
  'Neo Química Arena',
  ARRAY['Globo', 'SporTV'],
  'finalizado',
  1,
  0,
  1
),
(
  gen_random_uuid(),
  'brasileiro-a',
  '2025-01-22',
  '20:00',
  'Santos',
  'Grêmio',
  'Vila Belmiro',
  ARRAY['Premiere', 'SporTV'],
  'finalizado',
  3,
  2,
  1
);
