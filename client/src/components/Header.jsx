import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import LoginModal from './LoginModal';
import CartDrawer from './CartDrawer';

const navLinks = [
  { label: 'Catálogo', to: '/catalogo' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
];

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const handleUserClick = () => {
    if (user) {
      if (confirm(`¿Cerrar sesión de ${user.nombre}?`)) {
        logout();
      }
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F5F6EF]/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <h1 className="font-serif text-2xl text-[#4A5D3A]">Semillas</h1>
            <p className="text-stone-500 text-xs hidden sm:block">
              Catálogo de semillas para tu cultivo
            </p>
          </Link>

          {/* Nav links — visibles solo en pantallas medianas/grandes */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-stone-600 hover:text-[#4A5D3A] transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-stone-600 hover:text-[#4A5D3A] transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Login / usuario / carrito — visible en pantallas medianas/grandes */}
          <div className="hidden md:flex items-center gap-3">
            {/* Botón carrito */}
            <button
              onClick={() => setShowCart(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Ver carrito"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4A5D3A] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Link panel admin — solo visible si el usuario es admin */}
            {user?.rol === 'admin' && (
              <Link
                to="/admin"
                className="text-sm text-[#4A5D3A] font-medium hover:underline"
              >
                Panel admin
              </Link>
            )}

            {user ? (
              <>
                <span className="text-sm text-stone-600">Hola, {user.nombre}</span>
                <button
                  onClick={logout}
                  className="text-sm border border-stone-300 rounded-lg px-4 py-1.5 hover:bg-stone-100 transition-colors"
                >
                  Salir
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-sm bg-[#4A5D3A] text-white rounded-lg px-4 py-1.5 hover:bg-[#3d4d30] transition-colors"
              >
                Iniciar sesión
              </button>
            )}
          </div>

          {/* Ícono carrito + Botón circular Usuario + Menú hamburguesa — visible solo en celular */}
          <div className="md:hidden flex items-center gap-2">
            {/* Botón carrito */}
            <button
              onClick={() => setShowCart(true)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="Ver carrito"
            >
              🛒
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#4A5D3A] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Botón circular de Usuario / Login */}
            <button
              onClick={handleUserClick}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
                user
                  ? 'bg-[#4A5D3A] text-white border-[#4A5D3A] font-bold text-xs uppercase shadow-sm'
                  : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-stone-200 text-base'
              }`}
              aria-label={user ? `Cuenta de ${user.nombre}` : 'Iniciar sesión'}
              title={user ? `Hola, ${user.nombre}. Toca para salir` : 'Iniciar sesión'}
            >
              {user ? user.nombre?.charAt(0) : '👤'}
            </button>

            {/* Botón menú hamburguesa */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-stone-700 text-2xl w-8 h-8 flex items-center justify-center"
              aria-label="Abrir menú"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Menú desplegable — solo en celular */}
        {menuOpen && (
          <div className="md:hidden border-t border-stone-200 px-6 py-4 flex flex-col gap-4 bg-[#F5F6EF]">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-stone-700 font-medium hover:text-[#4A5D3A]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-stone-700 font-medium hover:text-[#4A5D3A]"
                >
                  {link.label}
                </a>
              )
            )}

            {/* Link panel admin en móvil */}
            {user?.rol === 'admin' && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#4A5D3A] font-semibold"
              >
                Panel admin
              </Link>
            )}
          </div>
        )}
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showCart && (
        <CartDrawer
          onClose={() => setShowCart(false)}
          onRequireLogin={() => setShowLogin(true)}
        />
      )}
    </>
  );
}