// src/app/eventos/eventos.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Evento } from './models/eventos'; // Interface no singular

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eventos.html',
  styleUrl: './eventos.css'
})
export class Eventos { // Nome da classe igual ao que está nas rotas

  evento: Evento = {
    id: 0,
    titulo: '',
    data: '',
    local: '',
    emailResponsavel: '',
    vagas: null
  };

  salvar() {
    this.evento.id = Date.now();
    console.log('Evento salvo:', this.evento);

    this.evento = {
      id: 0,
      titulo: '',
      data: '',
      local: '',
      emailResponsavel: '',
      vagas: null
    };
  }
}