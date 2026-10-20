export function validarTitulo(titulo: string): string | null {
  if (!titulo || titulo.trim().length < 5 || titulo.trim().length > 80) {
    return "O título deve ter entre 5 e 80 caracteres.";
  }
  return null;
}

export function validarData(data: string): string | null {
  if (!data) {
    return "A data não pode estar no passado.";
  }
  
  // Pega a data de hoje no formato yyyy-mm-dd (ignorando horas)
  const hoje = new Date().toISOString().split('T')[0];
  
  if (data < hoje) {
    return "A data não pode estar no passado.";
  }
  return null;
}

export function validarLocal(local: string): string | null {
  if (!local || local.trim() === '') {
    return "O local não pode ficar em branco.";
  }
  return null;
}

export function validarEmailResponsavel(email: string): string | null {
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !regexEmail.test(email)) {
    return "E-mail em formato inválido.";
  }
  return null;
}

export function validarVagas(vagas: number | string | null | undefined): string | null {
  if (vagas === null || vagas === undefined || vagas === '') {
    return "As vagas devem ser um número inteiro de 1 a 200.";
  }

  const numVagas = typeof vagas === 'string' ? Number(vagas) : vagas;

  if (!Number.isInteger(numVagas) || numVagas < 1 || numVagas > 200) {
    return "As vagas devem ser um número inteiro de 1 a 200.";
  }

  return null;
}