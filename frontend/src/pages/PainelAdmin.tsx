import { useNavigate } from 'react-router-dom';
import UserRoleManager from '../components/updateRoleUser';

export default function PainelAdmin() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  return (
    <>
      <h1>Seja bem vindo a área administrativa!</h1>
      {role === 'ADMIN' && (
        <>
          <button
            style={{ marginTop: 16 }}
            onClick={() => navigate('/solicitation/list')}
          >
            Listar Solicitações
          </button>
          <UserRoleManager />
        </>
      )}
    </>
  );
}