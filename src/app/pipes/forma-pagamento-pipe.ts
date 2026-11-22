import { Pipe, PipeTransform } from '@angular/core';

export type FormaPagamento = 'pix' | 'cartao' | 'boleto' | 'dinheiro' | '';

@Pipe({
  name: 'formaPagamento',
  standalone: true
})
export class FormaPagamentoPipe implements PipeTransform {

  // O Record obriga o TypeScript a cobrar TODAS as chaves do tipo FormaPagamento
  private readonly descricoes: Record<FormaPagamento, string> = {
    pix: 'Pix',
    cartao: 'Cartão de crédito',
    boleto: 'Boleto',
    dinheiro: 'Dinheiro',
    '': 'Não informado'
  };

  transform(valor: FormaPagamento | null | undefined): string {
    // 1. Primeira linha sempre trata o vazio/nulo/undefined
    if (!valor) {
      return this.descricoes[''];
    }

    // 2. Busca o texto correspondente no objeto descricoes. Se não encontrar, retorna "Não informado"
    return this.descricoes[valor] ?? 'Não informado';
  }
}