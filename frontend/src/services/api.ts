export interface RegisterUserData {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface CreateSolicitationData {
  tipoSolicitacao: 'TROCA_LAMPADA' | 'TAPA_BURACO';
  endereco: string;
  descricao: string;
}

export async function registerUser(data: RegisterUserData) {
  const response = await fetch('http://localhost:3000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao cadastrar usuário');
  }

  return response.json();
}

export async function loginUser(data: LoginUserData) {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao fazer login');
  }

  return response.json();
}

export async function createSolicitation(data: CreateSolicitationData, token: string) {
  const response = await fetch('http://localhost:3000/solicitation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao cadastrar solicitação');
  }

  return response.json();
}