import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { validarTitulo, validarData, validarLocal, validarEmailResponsavel, validarVagas } from '../models/evento.validacao';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  // Estado do formulário
  evento = { titulo: '', data: '', local: '', emailResponsavel: '', vagas: '' };
  
  // Controle de "blur" (se o usuário já passou pelo campo)
  touched = { titulo: false, data: false, local: false, emailResponsavel: false, vagas: false };
  
  // Armazena as mensagens de erro
  erros = { titulo: '', data: '', local: '', emailResponsavel: '', vagas: '' };

  // Lista de eventos salvos
  eventosSalvos: any[] = [];

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

  salvar() {
    if (this.formValido) {
      // Salva uma cópia do evento na lista
      this.eventosSalvos.push({ ...this.evento });
      
      // Limpa o formulário e reseta o estado de "tocado"
      this.evento = { titulo: '', data: '', local: '', emailResponsavel: '', vagas: '' };
      this.touched = { titulo: false, data: false, local: false, emailResponsavel: false, vagas: false };
      this.validarCampos();
    }
  }
}