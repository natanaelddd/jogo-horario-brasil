
import { Campeonato, CampeonatoType } from '@/types/game';

export const CAMPEONATOS: Record<CampeonatoType, Campeonato> = {
  'brasileiro-a': {
    id: 'brasileiro-a',
    nome: 'Campeonato Brasileiro Série A',
    categoria: 'nacional',
    cor: 'bg-brasil-green',
    icone: 'Trophy',
    ativo: true,
    temporada: '2025'
  },
  'brasileiro-b': {
    id: 'brasileiro-b',
    nome: 'Campeonato Brasileiro Série B',
    categoria: 'nacional',
    cor: 'bg-brasil-yellow',
    icone: 'Trophy',
    ativo: true,
    temporada: '2025'
  },
  'brasileiro-c': {
    id: 'brasileiro-c',
    nome: 'Campeonato Brasileiro Série C',
    categoria: 'nacional',
    cor: 'bg-orange-500',
    icone: 'Trophy',
    ativo: true,
    temporada: '2025'
  },
  'brasileiro-d': {
    id: 'brasileiro-d',
    nome: 'Campeonato Brasileiro Série D',
    categoria: 'nacional',
    cor: 'bg-red-500',
    icone: 'Trophy',
    ativo: true,
    temporada: '2025'
  },
  'copa-do-brasil': {
    id: 'copa-do-brasil',
    nome: 'Copa do Brasil',
    categoria: 'nacional',
    cor: 'bg-blue-600',
    icone: 'Zap',
    ativo: true,
    temporada: '2025'
  },
  'libertadores': {
    id: 'libertadores',
    nome: 'Copa Libertadores da América',
    categoria: 'internacional',
    cor: 'bg-red-700',
    icone: 'Globe',
    ativo: true,
    temporada: '2025'
  },
  'sul-americana': {
    id: 'sul-americana',
    nome: 'Copa Sul-Americana',
    categoria: 'internacional',
    cor: 'bg-orange-600',
    icone: 'Globe',
    ativo: true,
    temporada: '2025'
  },
  'mundial-clubes': {
    id: 'mundial-clubes',
    nome: 'Mundial de Clubes FIFA',
    categoria: 'internacional',
    cor: 'bg-purple-700',
    icone: 'Crown',
    ativo: true,
    temporada: '2025'
  },
  'copa-america': {
    id: 'copa-america',
    nome: 'Copa América',
    categoria: 'selecao',
    cor: 'bg-yellow-600',
    icone: 'Flag',
    ativo: false,
    temporada: '2024'
  },
  'eliminatorias-copa': {
    id: 'eliminatorias-copa',
    nome: 'Eliminatórias Copa do Mundo',
    categoria: 'selecao',
    cor: 'bg-green-700',
    icone: 'Flag',
    ativo: true,
    temporada: '2025'
  },
  'amistosos-selecao': {
    id: 'amistosos-selecao',
    nome: 'Amistosos da Seleção',
    categoria: 'selecao',
    cor: 'bg-blue-500',
    icone: 'Flag',
    ativo: true,
    temporada: '2025'
  },
  'estaduais': {
    id: 'estaduais',
    nome: 'Campeonatos Estaduais',
    categoria: 'nacional',
    cor: 'bg-indigo-600',
    icone: 'MapPin',
    ativo: true,
    temporada: '2025'
  },
  'recopa-sul-americana': {
    id: 'recopa-sul-americana',
    nome: 'Recopa Sul-Americana',
    categoria: 'internacional',
    cor: 'bg-teal-600',
    icone: 'Award',
    ativo: false,
    temporada: '2025'
  },
  'supercopa-brasil': {
    id: 'supercopa-brasil',
    nome: 'Supercopa do Brasil',
    categoria: 'nacional',
    cor: 'bg-emerald-600',
    icone: 'Star',
    ativo: false,
    temporada: '2025'
  }
};

export const getCampeonatosByCategoria = (categoria: 'nacional' | 'internacional' | 'selecao') => {
  return Object.values(CAMPEONATOS).filter(camp => camp.categoria === categoria && camp.ativo);
};

export const getCampeonatoAtivos = () => {
  return Object.values(CAMPEONATOS).filter(camp => camp.ativo);
};
