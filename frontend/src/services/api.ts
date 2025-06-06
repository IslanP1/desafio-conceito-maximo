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

export interface UpdateSolicitationStatusData {
  status: 'PENDING' | 'GOING' | 'COMPLETED';
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

export async function updateSolicitationStatus(id: number, data: UpdateSolicitationStatusData, token: string) {
  const response = await fetch(`http://localhost:3000/solicitation/status/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao atualizar status');
  }

  return response.json();
}

export async function getAllSolicitations(token: string, tipo?: string) {
  const url = tipo
    ? `http://localhost:3000/solicitation?tipo=${encodeURIComponent(tipo)}`
    : 'http://localhost:3000/solicitation';
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao buscar solicitações');
  }

  return response.json();
}

export async function getAllUsers(token: string) {
  const response = await fetch('http://localhost:3000/auth/users', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao buscar usuários');
  }
  return response.json();
}

export async function updateUserRole(id: number, role: string, token: string) {
  const response = await fetch(`http://localhost:3000/auth/role/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao atualizar role');
  }
  return response.json();
}

export async function deleteUser(id: number, token: string) {
  const response = await fetch(`http://localhost:3000/auth/user/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao deletar usuário');
  }
  return response.json();
}