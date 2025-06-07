/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getAllSolicitations, updateSolicitationStatus } from '../services/api';

export default function ReadSolicitation() {
  const [solicitations, setSolicitations] = useState<any[]>([]);
  const [tipo, setTipo] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<'PENDING' | 'GOING' | 'COMPLETED'>('PENDING');

  async function fetchSolicitations(selectedTipo?: string) {
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Você precisa estar logado como ADMIN.');
      return;
    }
    try {
      const data = await getAllSolicitations(token, selectedTipo);
      setSolicitations(data);
    } catch (err: any) {
      setMessage(err.message || 'Erro ao buscar solicitações');
    }
  }

  useEffect(() => {
    fetchSolicitations();
  }, []);

  function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    setTipo(e.target.value);
    fetchSolicitations(e.target.value);
  }

  async function handleUpdateStatus(id: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Você precisa estar logado como ADMIN.');
      return;
    }
    try {
      await updateSolicitationStatus(id, { status: newStatus }, token);
      setMessage('Status atualizado com sucesso!');
      setEditingId(null);
      fetchSolicitations(tipo);
    } catch (err: any) {
      setMessage(err.message || 'Erro ao atualizar status');
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Solicitações</h2>
      <label>
        Filtrar por tipo:&nbsp;
        <select value={tipo} onChange={handleFilter}>
          <option value="">Todos</option>
          <option value="TROCA_LAMPADA">Troca de Lâmpada</option>
          <option value="TAPA_BURACO">Tapa Buraco</option>
        </select>
      </label>
      {message && <div>{message}</div>}
      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Endereço</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Solicitante</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {solicitations.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.tipoSolicitacao}</td>
              <td>{s.endereco}</td>
              <td>{s.descricao}</td>
              <td>
                {editingId === s.id ? (
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as any)}
                  >
                    <option value="PENDING">Pendente</option>
                    <option value="GOING">Em andamento</option>
                    <option value="COMPLETED">Concluída</option>
                  </select>
                ) : (
                  s.status
                )}
              </td>
              <td>{s.nomeSolicitante}</td>
              <td>
                {editingId === s.id ? (
                  <>
                    <button onClick={() => handleUpdateStatus(s.id)}>Salvar</button>
                    <button onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => { setEditingId(s.id); setNewStatus(s.status); }}>
                    Atualizar Status
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}