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
          style={{ marginTop: 16 }}
          onClick={() => navigate('/solicitation/update-status')}
        >
          Atualizar Status de Solicitação
        </button>
      )}
    </>
  );
}