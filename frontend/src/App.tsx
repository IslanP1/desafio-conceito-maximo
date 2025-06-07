import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import Solicitation from './pages/Solicitation';
import SolicitationList from './pages/SolicitationRead';
import PainelAdmin from './pages/PainelAdmin';
import Menu from './components/Menu';

export default function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/solicitation" element={<Solicitation />} />
        <Route path="/solicitation/list" element={<SolicitationList />} />
        <Route path="/admin" element={<PainelAdmin />} />
      </Routes>
    </>
  );
}