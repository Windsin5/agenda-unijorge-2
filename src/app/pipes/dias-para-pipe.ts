import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diasPara',
  standalone: true
})
export class DiasParaPipe implements PipeTransform {
  transform(data: string | null | undefined, hoje: Date = new Date()): string {
    if (!data) return '';

    const [ano, mes, dia] = data.split('-').map(Number);
    if (!ano || !mes || !dia) return '';

    const utcEvento = Date.UTC(ano, mes - 1, dia);
    const utcHoje = Date.UTC(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

    const msPorDia = 1000 * 60 * 60 * 24;
    const diffDias = Math.round((utcEvento - utcHoje) / msPorDia);

    if (diffDias < 0) return 'Encerrado';
    if (diffDias === 0) return 'Hoje';
    if (diffDias === 1) return 'Amanhã';
    return `Faltam ${diffDias} dias`;
  }
}