import { Injectable } from '@angular/core';
import { Evento } from './eventos.model';
import { DadosParticipante, Participante } from './participante.model';

@Injectable({ providedIn: 'root' })
export class EventosService {
  private readonly eventosKey = 'agenda-unijorge.eventos';
  private readonly participantesKey = 'agenda-unijorge.participantes';

  listarEventos(): Evento[] {
    return this.ler<Evento>(this.eventosKey);
  }

  cadastrarEvento(dados: Omit<Evento, 'id'>): Evento {
    const eventos = this.listarEventos();
    const evento = { ...dados, id: this.proximoId(eventos) };
    this.gravar(this.eventosKey, [...eventos, evento]);
    return evento;
  }

  listarParticipantes(eventoId: number): Participante[] {
    this.exigirEvento(eventoId);
    return this.ler<Participante>(this.participantesKey)
      .filter(participante => participante.eventoId === eventoId);
  }

  cadastrarParticipante(eventoId: number, dados: DadosParticipante): Participante {
    this.exigirEvento(eventoId);
    const participantes = this.ler<Participante>(this.participantesKey);
    const participante: Participante = {
      ...dados,
      id: this.proximoId(participantes),
      eventoId
    };
    this.gravar(this.participantesKey, [...participantes, participante]);
    return participante;
  }

  atualizarParticipante(
    eventoId: number,
    participanteId: number,
    dados: DadosParticipante
  ): Participante {
    this.exigirEvento(eventoId);
    const participantes = this.ler<Participante>(this.participantesKey);
    const indice = participantes.findIndex(
      participante => participante.id === participanteId && participante.eventoId === eventoId
    );

    if (indice === -1) {
      throw new Error('Participante não encontrado neste evento.');
    }

    const participante = { ...participantes[indice], ...dados };
    participantes[indice] = participante;
    this.gravar(this.participantesKey, participantes);
    return participante;
  }

  excluirParticipante(eventoId: number, participanteId: number): void {
    this.exigirEvento(eventoId);
    const participantes = this.ler<Participante>(this.participantesKey);
    const existeNoEvento = participantes.some(
      participante => participante.id === participanteId && participante.eventoId === eventoId
    );

    if (!existeNoEvento) {
      throw new Error('Participante não encontrado neste evento.');
    }

    this.gravar(
      this.participantesKey,
      participantes.filter(
        participante => !(participante.id === participanteId && participante.eventoId === eventoId)
      )
    );
  }

  private exigirEvento(eventoId: number): void {
    if (!this.listarEventos().some(evento => evento.id === eventoId)) {
      throw new Error('Evento não encontrado.');
    }
  }

  private proximoId(itens: Array<{ id: number }>): number {
    return itens.reduce((maiorId, item) => Math.max(maiorId, item.id), 0) + 1;
  }

  private ler<T>(chave: string): T[] {
    const valor = localStorage.getItem(chave);
    if (valor === null) {
      return [];
    }

    const dados: unknown = JSON.parse(valor);
    if (!Array.isArray(dados)) {
      throw new Error(`Os dados armazenados para "${chave}" são inválidos.`);
    }
    return dados as T[];
  }

  private gravar<T>(chave: string, dados: T[]): void {
    localStorage.setItem(chave, JSON.stringify(dados));
  }
}
