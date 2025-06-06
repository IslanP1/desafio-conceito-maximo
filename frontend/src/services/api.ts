export interface RegisterUserData {
  name: string;
  email: string;
  cpf: string;
  password: string;
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