import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaModel, pessoaEmBranco } from './pessoa.model';

@Component({
  selector: 'app-pessoa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pessoa.html',
  styleUrl: './pessoa.css' // Verifique se o seu arquivo de estilo chama pessoa.css
})
export class Pessoa {
  // Essa é a classe que o seu app.routes.ts está procurando!
  pessoaDados: PessoaModel = pessoaEmBranco();
}