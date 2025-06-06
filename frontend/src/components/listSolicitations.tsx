/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getUserSolicitations } from '../services/api';

export default function UserSolicitations() {
  const [solicitations, setSolicitations] = useState<any[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchSolicitations() {
      setMessage('');
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Você precisa estar logado.');
        return;
      }
      try {
        const data = await getUserSolicitations(token);
        setSolicitations(data);
      } catch (err: any) {
        setMessage(err.message || 'Erro ao buscar suas solicitações');
      }
    }
    fetchSolicitations();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Minhas Solicitações</h2>
      {message && <div>{message}</div>}
      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Endereço</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {solicitations.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.tipoSolicitacao}</td>
              <td>{s.endereco}</td>
              <td>{s.descricao}</td>
              <td>{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}