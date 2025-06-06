/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { createSolicitation } from '../services/api';

export default function SolicitationForm() {
  type TipoSolicitacao = 'TROCA_LAMPADA' | 'TAPA_BURACO';

  interface CreateSolicitationForm {
    tipoSolicitacao: TipoSolicitacao;
    endereco: string;
    descricao: string;
  }

  const [form, setForm] = useState<CreateSolicitationForm>({
    tipoSolicitacao: 'TROCA_LAMPADA',
    endereco: '',
    descricao: '',
  });
  const [message, setMessage] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Você precisa estar logado para cadastrar uma solicitação.');
      return;
    }
    console.log(token);
    try {
      await createSolicitation(form, token);
      setMessage('Solicitação cadastrada com sucesso!');
      setForm({ tipoSolicitacao: 'TROCA_LAMPADA', endereco: '', descricao: '' });
    } catch (err: any) {
      setMessage(err.message || 'Erro ao cadastrar solicitação');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h2>Cadastrar Solicitação</h2>
      <select name="tipoSolicitacao" value={form.tipoSolicitacao} onChange={handleChange}>
        <option value="TROCA_LAMPADA">Troca de Lâmpada</option>
        <option value="TAPA_BURACO">Tapa Buraco</option>
      </select>
      <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} required />
      <input name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
      <button type="submit">Cadastrar Solicitação</button>
      {message && <div>{message}</div>}
    </form>
  );
}