export type Genero = 'feminino' | 'masculino' | 'outro' | 'nao_informado' | '';

export type Curso =
  | 'Engenharia de Computacao'
  | 'Sistemas de Informacao'
  | 'Ciencia da Computacao'
  | '';

export const CURSOS: Curso[] = [
  'Engenharia de Computacao',
  'Sistemas de Informacao',
  'Ciencia da Computacao'
];

export interface PessoaModel {
  id: number;
  nomeCompleto: string;
  dataNascimento: string;
  genero: Genero;
  cpf: string;
  rg: string;
  nomeMae: string;
  nomePai: string;
  pais: string;
  estado: string;
  curso: Curso;
  telefone: string;
  email: string;
}

export function pessoaEmBranco(): PessoaModel {
  return {
    id: 1,
    nomeCompleto: 'Ana Souza',
    dataNascimento: '2006-07-05',
    genero: 'feminino',
    cpf: '022.354.894-13',
    rg: '02.478.236-66',
    nomeMae: 'Maria Souza',
    nomePai: 'Ricardo Souza',
    pais: 'Brasil',
    estado: 'Bahia',
    curso: 'Engenharia de Computacao',
    telefone: '(71) 99245-6769',
    email: 'ana@exemplo.com'
  };
}