import { useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const isLogged = !!localStorage.getItem('token');

  return (
    <nav style={{ display: 'flex', gap: 12, margin: '1rem 0' }}>
      <button onClick={() => navigate('/')}>Home</button>
      {!isLogged && <button onClick={() => navigate('/login')}>Login</button>}
      {!isLogged && <button onClick={() => navigate('/register')}>Cadastrar</button>}
      {isLogged && <button onClick={() => navigate('/solicitation')}>Solicitações</button>}
      {role === 'ADMIN' && (
        <>
          <button onClick={() => navigate('/admin')}>Área Admin</button>
          <button onClick={() => navigate('/solicitation/list')}>Todas Solicitações</button>
        </>
      )}
      {isLogged && (
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/login');
          }}
        >
          Sair
        </button>
      )}
    </nav>
  );
}