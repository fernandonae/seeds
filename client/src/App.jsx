import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Toast from './components/Toast';
import HeroCarousel from './components/HeroCarousel';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from './pages/AdminPanel';
import Catalogo from './pages/Catalogo';
import Nosotros from './pages/Nosotros';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';


function Home() {
  return (
    <>
      <HeroCarousel />
      <Catalogo soloDestacados />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <div className="min-h-screen bg-[#F5F6EF]">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute rolesPermitidos={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Toast />
        </div>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;