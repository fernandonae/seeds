import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import ProductImageCarousel from './ProductImageCarousel';

export default function ProductCard({ product, onCambio }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const toggleDestacado = async () => {
    try {
      await api.put(`/products/${product._id}`, {
        destacado: !product.destacado,
      });
      onCambio?.();
    } catch (err) {
      alert('No se pudo actualizar el producto');
    }
  };

  const toggleCarrusel = async () => {
    try {
      await api.put(`/products/${product._id}`, {
        enCarrusel: !product.enCarrusel,
      });
      onCambio?.();
    } catch (err) {
      alert('No se pudo actualizar el producto');
    }
  };

  return (
    <div className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
      <ProductImageCarousel imagenes={product.imagenes} />

      <div className="p-4">
        <span className="text-xs uppercase tracking-wide text-emerald-700 font-medium">
          {product.categoria}
        </span>
        <h3 className="font-serif text-lg text-stone-900 mt-1">{product.nombre}</h3>
        <p className="text-sm text-stone-500 mt-1 line-clamp-2">{product.descripcion}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-semibold text-stone-900">${product.precio}</span>
          <span className="text-xs text-stone-400">{product.stock} disponibles</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="mt-3 w-full text-sm bg-[#4A5D3A] text-white rounded-lg px-4 py-2 hover:bg-[#3d4d30] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
        </button>

        {user?.rol === 'admin' && (
          <div className="flex flex-col gap-1.5 mt-2">
            <button
              onClick={toggleDestacado}
              className={`w-full text-xs rounded-lg px-4 py-1.5 border transition-colors ${
                product.destacado
                  ? 'border-amber-400 text-amber-700 bg-amber-50 hover:bg-amber-100'
                  : 'border-stone-300 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {product.destacado ? '★ Quitar del inicio' : '☆ Añadir al inicio'}
            </button>

            <button
              onClick={toggleCarrusel}
              className={`w-full text-xs rounded-lg px-4 py-1.5 border transition-colors ${
                product.enCarrusel
                  ? 'border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                  : 'border-stone-300 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {product.enCarrusel ? '🎠 Quitar del carrusel' : '🎠 Agregar al carrusel'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}