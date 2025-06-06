import SolicitationForm from "../components/createSolicitation";
import { useNavigate } from "react-router-dom";

export default function Solicitation() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Certifique-se de salvar a role no login
  console.log('Role:', role);
  return (
    <>
      <SolicitationForm />
      {role === 'ADMIN' && (
        <button
          onClick={() => navigate('/admin')}
          style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >Área administrativa</button>
      )}
    </>
  );
}