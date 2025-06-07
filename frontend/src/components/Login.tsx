/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    try {
      const data = await loginUser(form);
      console.log(data.token);
      setToken(data.token);
      setMessage('Login realizado com sucesso!');
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); // Salva a role do usuário
      console.log(data);
      navigate('/solicitation'); // Redireciona após login
    } catch (err: any) {
      setMessage(err.message || 'Erro ao fazer login');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h2>Login</h2>
      <input name="email" placeholder="E-mail" type="email" value={form.email} onChange={handleChange} required />
      <input name="password" placeholder="Senha" type="password" value={form.password} onChange={handleChange} required />
      <button type="submit">Entrar</button>
      {message && <div>{message}</div>}
      {token && (
        <div>
          <small>Token JWT:</small>
          <pre style={{ whiteSpace: 'break-spaces', wordBreak: 'break-all' }}>{token}</pre>
        </div>
      )}
    </form>
  );
}