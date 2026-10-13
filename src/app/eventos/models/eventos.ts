export interface Evento {
  id: number;
  titulo: string;
  data: string;
  local: string;
  emailResponsavel: string;
  vagas: number | null;
}