import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iniciais',
  standalone: true
})
export class IniciaisPipe implements PipeTransform {
  private readonly ignorar = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);

  transform(nome: string | null | undefined): string {
    if (!nome || !nome.trim()) return '';

    const partes = nome
      .trim()
      .split(/\s+/)
      .filter(p => !this.ignorar.has(p.toLowerCase()));

    if (partes.length === 0) return '';
    if (partes.length === 1) return partes[0][0].toUpperCase();

    const primeira = partes[0][0];
    const ultima = partes[partes.length - 1][0];

    return `${primeira}${ultima}`.toUpperCase();
  }
}