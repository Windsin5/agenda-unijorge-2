export interface Participante {
  id: number;
  eventoId: number;
  nomeCompleto: string;
  descricao: string;
  email: string;
  telefone: string;
  formaPagamento: string;
}

export type DadosParticipante = Omit<Participante, 'id' | 'eventoId'>;
