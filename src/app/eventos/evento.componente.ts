import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { validarTitulo, validarData, validarLocal, validarEmailResponsavel, validarVagas } from '../eventos/models/eventos.validacao';
import { Evento } from './eventos.model';
import { EventosService } from './eventos.service';
import { DadosParticipante, Participante } from './participante.model';

type FormularioEvento = Omit<Evento, 'id' | 'vagas'> & { vagas: string };

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './evento.componente.html',
  styleUrls: ['./evento.componente.css']
})
export class EventoComponente implements OnInit {
  constructor(private readonly eventosService: EventosService) {}

  // Estado do formulário
  evento: FormularioEvento = { titulo: '', data: '', local: '', emailResponsavel: '', vagas: '' };
  
  // Controle de "blur" (se o usuário já passou pelo campo)
  touched = { titulo: false, data: false, local: false, emailResponsavel: false, vagas: false };
  
  // Armazena as mensagens de erro
  erros = { titulo: '', data: '', local: '', emailResponsavel: '', vagas: '' };

  // Lista de eventos salvos
  eventosSalvos: Evento[] = [];
  eventoSelecionadoId: number | null = null;
  participantesDoEvento: Participante[] = [];
  participante: DadosParticipante = this.novoParticipante();
  participanteEmEdicaoId: number | null = null;
  erroParticipante = '';
  erroEventos = '';

  ngOnInit(): void {
    try {
      this.eventosSalvos = this.eventosService.listarEventos();
    } catch (error) {
      this.erroEventos = this.mensagemDoErro(error);
    }
  }

  // Chama as validações sempre que houver mudança (para a mensagem sumir sozinha) ou no blur
  validarCampos() {
    this.erros.titulo = validarTitulo(this.evento.titulo) || '';
    this.erros.data = validarData(this.evento.data) || '';
    this.erros.local = validarLocal(this.evento.local) || '';
    this.erros.emailResponsavel = validarEmailResponsavel(this.evento.emailResponsavel) || '';
    this.erros.vagas = validarVagas(this.evento.vagas) || '';
  }

  // Acionado quando o usuário sai do campo
  onBlur(campo: keyof typeof this.touched) {
    this.touched[campo] = true;
    this.validarCampos();
  }

  // Acionado enquanto o usuário digita
  onChange() {
    this.validarCampos();
  }

  // O botão Salvar só fica habilitado se não houver NENHUM erro
  get formValido(): boolean {
    this.validarCampos(); // Garante que o estado está atualizado
    return !this.erros.titulo && !this.erros.data && !this.erros.local && 
           !this.erros.emailResponsavel && !this.erros.vagas;
  }

  salvar(): void {
    if (!this.formValido) {
      return;
    }

    try {
      const evento = this.eventosService.cadastrarEvento({
        ...this.evento,
        vagas: Number(this.evento.vagas)
      });
      this.eventosSalvos = [...this.eventosSalvos, evento];
      this.evento = { titulo: '', data: '', local: '', emailResponsavel: '', vagas: '' };
      this.touched = { titulo: false, data: false, local: false, emailResponsavel: false, vagas: false };
      this.validarCampos();
      this.erroEventos = '';
    } catch (error) {
      this.erroEventos = this.mensagemDoErro(error);
    }
  }

  gerenciarParticipantes(eventoId: number): void {
    if (this.eventoSelecionadoId === eventoId) {
      this.eventoSelecionadoId = null;
      this.cancelarEdicaoParticipante();
      return;
    }

    try {
      this.eventoSelecionadoId = eventoId;
      this.participantesDoEvento = this.eventosService.listarParticipantes(eventoId);
      this.cancelarEdicaoParticipante();
    } catch (error) {
      this.erroParticipante = this.mensagemDoErro(error);
    }
  }

  salvarParticipante(): void {
    const eventoId = this.eventoSelecionadoId;
    if (eventoId === null) {
      this.erroParticipante = 'Selecione um evento para gerenciar seus participantes.';
      return;
    }

    const dados: DadosParticipante = {
      nomeCompleto: this.participante.nomeCompleto.trim(),
      descricao: this.participante.descricao.trim(),
      email: this.participante.email.trim(),
      telefone: this.participante.telefone.trim(),
      formaPagamento: this.participante.formaPagamento.trim()
    };
    if (!this.nomeCompletoValido(dados.nomeCompleto)) {
      this.erroParticipante = 'O nome deve conter pelo menos 10 caracteres.';
      return;
    }

    if (!dados.descricao || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email) ||
        !dados.telefone || !dados.formaPagamento) {
      this.erroParticipante = 'Preencha todos os campos com valores válidos.';
      return;
    }

    try {
      if (this.participanteEmEdicaoId === null) {
        this.eventosService.cadastrarParticipante(eventoId, dados);
      } else {
        this.eventosService.atualizarParticipante(
          eventoId,
          this.participanteEmEdicaoId,
          dados
        );
      }

      this.participantesDoEvento = this.eventosService.listarParticipantes(eventoId);
      this.cancelarEdicaoParticipante();
    } catch (error) {
      this.erroParticipante = this.mensagemDoErro(error);
    }
  }

  editarParticipante(participante: Participante): void {
    this.participanteEmEdicaoId = participante.id;
    this.participante = {
      nomeCompleto: participante.nomeCompleto,
      descricao: participante.descricao,
      email: participante.email,
      telefone: participante.telefone,
      formaPagamento: participante.formaPagamento
    };
    this.erroParticipante = '';
  }

  excluirParticipante(participanteId: number): void {
    const eventoId = this.eventoSelecionadoId;
    if (eventoId === null) {
      return;
    }

    try {
      this.eventosService.excluirParticipante(eventoId, participanteId);
      this.participantesDoEvento = this.eventosService.listarParticipantes(eventoId);
      if (this.participanteEmEdicaoId === participanteId) {
        this.cancelarEdicaoParticipante();
      }
    } catch (error) {
      this.erroParticipante = this.mensagemDoErro(error);
    }
  }

  cancelarEdicaoParticipante(): void {
    this.participanteEmEdicaoId = null;
    this.participante = this.novoParticipante();
    this.erroParticipante = '';
  }

  nomeCompletoValido(nome: string): boolean {
    return (nome.match(/\p{L}/gu) ?? []).length >= 10;
  }

  private novoParticipante(): DadosParticipante {
    return { nomeCompleto: '', descricao: '', email: '', telefone: '', formaPagamento: '' };
  }

  private mensagemDoErro(error: unknown): string {
    return error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';
  }
}