import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Evento } from './models/eventos';
import { 
  validarTitulo, 
  validarData, 
  validarLocal, 
  validarEmailResponsavel, 
  validarVagas 
} from '../models/eventos.validacao';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class Eventos {

  evento: Evento = {
    id: 0,
    titulo: '',
    data: '',
    local: '',
    emailResponsavel: '',
    vagas: null
  };

  // Objeto para armazenar as mensagens de erro de cada campo
  erros: { [key: string]: string | null } = {
    titulo: null,
    data: null,
    local: null,
    emailResponsavel: null,
    vagas: null
  };

  validarFormulario(): boolean {
    this.erros['titulo'] = validarTitulo(this.evento.titulo);
    this.erros['data'] = validarData(this.evento.data);
    this.erros['local'] = validarLocal(this.evento.local);
    this.erros['emailResponsavel'] = validarEmailResponsavel(this.evento.emailResponsavel);
    this.erros['vagas'] = validarVagas(this.evento.vagas);

    // Retorna true se não houver nenhum erro
    return Object.values(this.erros).every(erro => erro === null);
  }

  salvar() {
    if (this.validarFormulario()) {
      this.evento.id = Date.now();
      console.log('Evento válido e salvo:', this.evento);

      // Reseta o formulário e os erros
      this.evento = {
        id: 0,
        titulo: '',
        data: '',
        local: '',
        emailResponsavel: '',
        vagas: null
      };
      this.erros = { titulo: null, data: null, local: null, emailResponsavel: null, vagas: null };
    } else {
      console.log('Formulário contém erros:', this.erros);
    }
  }
}