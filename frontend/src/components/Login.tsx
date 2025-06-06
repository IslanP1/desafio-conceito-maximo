/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { loginUser } from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    try {
      const data = await loginUser(form);
      setToken(data.access_token);
      setMessage('Login realizado com sucesso!');
      // Você pode salvar o token no localStorage se quiser manter o usuário logado
      localStorage.setItem('token', data.access_token);
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