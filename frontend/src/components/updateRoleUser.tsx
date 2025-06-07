/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole, deleteUser } from '../services/api'

export default function UserRoleManager() {
  const [users, setUsers] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState('USER');

  async function fetchUsers() {
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Você precisa estar logado como ADMIN.');
      return;
    }
    try {
      const data = await getAllUsers(token);
      setUsers(data.users || []);
    } catch (err: any) {
      setMessage(err.message || 'Erro ao buscar usuários');
    }
  }

  async function handleDeleteUser(id: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Você precisa estar logado como ADMIN.');
      return;
    }
    try {
      await deleteUser(id, token);
      setMessage('Usuário deletado com sucesso!');
      fetchUsers();
    } catch (err: any) {
      setMessage(err.message || 'Erro ao deletar usuário');
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleUpdateRole(id: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Você precisa estar logado como ADMIN.');
      return;
    }
    try {
      await updateUserRole(id, newRole, token);
      setMessage('Role atualizada com sucesso!');
      setEditingId(null);
      fetchUsers();
    } catch (err: any) {
      setMessage(err.message || 'Erro ao atualizar role');
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2>Gerenciar Usuários</h2>
      {message && <div>{message}</div>}
      <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.cpf}</td>
              <td>
                {editingId === u.id ? (
                  <select value={newRole} onChange={e => setNewRole(e.target.value)}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                ) : (
                  u.role
                )}
              </td>
              <td>
                {editingId === u.id ? (
                  <>
                    <button onClick={() => handleUpdateRole(u.id)}>Salvar</button>
                    <button onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditingId(u.id); setNewRole(u.role); }}>
                      Alterar Role
                    </button>
                    <button
                      style={{ marginLeft: 8, color: 'white', background: 'red', border: 'none', borderRadius: 4, padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      Deletar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}