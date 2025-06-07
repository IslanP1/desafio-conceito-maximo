/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    try {
      await registerUser(form);
      setMessage('Usuário cadastrado com sucesso!');
      setForm({ name: '', email: '', cpf: '', password: '' });
    } catch (err: any) {
      setMessage(err.message || 'Erro ao cadastrar');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h2>Cadastro de Usuário</h2>
      <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="E-mail" type="email" value={form.email} onChange={handleChange} required />
      <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />
      <input name="password" placeholder="Senha" type="password" value={form.password} onChange={handleChange} required />
      <button type="submit">Cadastrar</button>
      {message && <div>{message}</div>}
      <button type="button" onClick={() => navigate('/login')}>Ir para Login</button>
    </form>
  );
}