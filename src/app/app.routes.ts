import { Routes } from '@angular/router';
import { Home } from './home/home';
import { EventoComponente } from './eventos/evento.componente';
import { Eventos } from './eventos/eventos';
import { Pessoa } from './pessoa/pessoa';
import { Padrao } from './padrao/padrao';
import { NaoEncontrada } from './nao-encontrada/nao-encontrada';

export const routes: Routes = [
  // Rota padrão abre a página Inicial (Home) ao acessar http://localhost:4200/
  { path: '', component: Home },

  // Rotas mapeadas para o formulário de cadastro de evento
  { path: 'novo-evento', component: EventoComponente },
  { path: 'eventos/novo', component: EventoComponente },
  { path: 'evento/novo', component: EventoComponente },
  { path: 'evento', component: EventoComponente },
  { path: 'eventos', component: EventoComponente },

  // Outras rotas do sistema
  { path: 'home', component: Home },
  { path: 'lista-eventos', component: Eventos },
  { path: 'pessoa', component: Pessoa },
  { path: 'padrao', component: Padrao },

  // Rota de erro (404) para caminhos não encontrados
  { path: '**', component: NaoEncontrada }
];