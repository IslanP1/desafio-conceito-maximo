/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { updateSolicitationStatus } from '../services/api';

export default function UpdateSolicitationStatus() {
  const [id, setId] = useState('');
  const [status, setStatus] = useState<'PENDING' | 'GOING' | 'COMPLETED'>('PENDING');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Você precisa estar logado como ADMIN para atualizar o status.');
      return;
    }
    try {
      await updateSolicitationStatus(Number(id), { status }, token);
      setMessage('Status atualizado com sucesso!');
    } catch (err: any) {
      setMessage(err.message || 'Erro ao atualizar status');
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h2>Atualizar Status da Solicitação</h2>
      <input
        name="id"
        placeholder="ID da Solicitação"
        value={id}
        onChange={e => setId(e.target.value)}
        required
        type="number"
      />
      <select name="status" value={status} onChange={e => setStatus(e.target.value as any)}>
        <option value="PENDING">Pendente</option>
        <option value="GOING">Em andamento</option>
        <option value="COMPLETED">Concluída</option>
      </select>
      <button type="submit">Atualizar Status</button>
      {message && <div>{message}</div>}
    </form>
  );
}