import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await api.post('/login', { email, password });
        login(res.data);
      } else {
        await api.post('/register', { nombre, email, password, telefono });
        const res = await api.post('/login', { email, password });
        login(res.data);
      }
      onClose();
    } catch (err) {
      const apiError = err.response?.data;
      setError(apiError?.errors?.[0] || apiError?.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 text-xl"
        >
          ✕
        </button>

        {/* Logo placeholder — más adelante editable desde el panel de admin */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-[#4A5D3A] flex items-center justify-center text-2xl">
            🌱
          </div>
        </div>

        <h2 className="font-serif text-xl text-stone-900 text-center mb-1">
          {mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
        </h2>
        <p className="text-stone-500 text-sm text-center mb-6">
          {mode === 'login' ? 'Ingresa a tu cuenta de Semillas' : 'Únete al catálogo de Semillas'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <>
              <input
                type="text"
                placeholder="Nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5D3A] focus:border-transparent"
                required
              />
              <input
                type="tel"
                placeholder="Teléfono (opcional)"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5D3A] focus:border-transparent"
              />
            </>
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5D3A] focus:border-transparent"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A5D3A] focus:border-transparent"
            required
          />

          {error && (
            <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4A5D3A] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#3d4d30] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Un momento...' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 mt-5">
          {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError(null);
            }}
            className="text-[#4A5D3A] font-medium hover:underline"
          >
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}