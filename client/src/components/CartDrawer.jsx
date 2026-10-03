import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function CartDrawer({ onClose, onRequireLogin }) {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      onClose();
      onRequireLogin();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderItems = items.map((item) => ({
        product: item._id,
        cantidad: item.cantidad
      }));

      await api.post('/orders', { items: orderItems });

      clearCart();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo completar la compra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-[#F5F6EF] h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <h2 className="font-serif text-xl text-[#4A5D3A]">Tu carrito</h2>
          <button onClick={onClose} className="text-2xl text-stone-500 hover:text-stone-800">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {success ? (
            <p className="text-emerald-700 text-sm font-medium">
              ¡Compra realizada con éxito! ✓
            </p>
          ) : items.length === 0 ? (
            <p className="text-stone-500 text-sm">Tu carrito está vacío.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item._id} className="flex gap-3 items-center">
                  <div className="w-14 h-14 rounded-md bg-gradient-to-br from-lime-100 to-emerald-50 flex items-center justify-center text-xl shrink-0">
                    🌱
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">{item.nombre}</p>
                    <p className="text-xs text-stone-500">${item.precio} c/u</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item._id, item.cantidad - 1)}
                        className="w-6 h-6 rounded border border-stone-300 text-sm hover:bg-stone-100"
                      >
                        −
                      </button>
                      <span className="text-sm w-5 text-center">{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.cantidad + 1)}
                        className="w-6 h-6 rounded border border-stone-300 text-sm hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-stone-400 hover:text-red-500 text-sm"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}

          {error && (
            <p className="text-red-600 text-sm mt-3">{error}</p>
          )}
        </div>

        {items.length > 0 && !success && (
          <div className="px-5 py-4 border-t border-stone-200">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-stone-600">Total</span>
              <span className="font-semibold text-stone-900">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-[#4A5D3A] text-white rounded-lg px-4 py-2 text-sm hover:bg-[#3d4d30] transition-colors disabled:opacity-50"
            >
              {loading ? 'Procesando...' : user ? 'Confirmar compra' : 'Iniciar sesión para pagar'}
            </button>
            <button
              onClick={clearCart}
              className="w-full mt-2 text-xs text-stone-400 hover:text-red-500"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}