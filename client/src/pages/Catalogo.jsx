import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

export default function Catalogo({ soloDestacados = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = () => {
    setLoading(true);
    api
      .get('/products')
      .then((res) => {
        const data = soloDestacados
          ? res.data.filter((p) => p.destacado)
          : res.data;
        setProducts(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <main className="px-6 py-8 max-w-6xl mx-auto">
      <h1 className="font-serif text-3xl text-[#4A5D3A] mb-6">
        {soloDestacados ? 'Destacados' : 'Catálogo'}
      </h1>

      {loading && <p className="text-stone-500">Cargando productos...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-stone-500">
          {soloDestacados
            ? 'Todavía no hay productos destacados.'
            : 'Todavía no hay productos en el catálogo.'}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onCambio={cargarProductos} />
        ))}
      </div>
    </main>
  );
}