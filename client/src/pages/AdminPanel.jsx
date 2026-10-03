import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductForm from '../components/admin/ProductForm';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrandoForm, setMostrandoForm] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const cargarProductos = () => {
    setLoading(true);
    api
      .get('/products')
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleGuardado = () => {
    setMostrandoForm(false);
    setProductoEditando(null);
    cargarProductos();
  };

  const handleEditar = (product) => {
    setProductoEditando(product);
    setMostrandoForm(true);
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return;
    await api.delete(`/products/${id}`);
    cargarProductos();
  };

  const abrirNuevoProducto = () => {
    setProductoEditando(null);
    setMostrandoForm(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F6EF] px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-3xl text-[#4A5D3A]">Panel de administración</h1>
          {!mostrandoForm && (
            <button
              onClick={abrirNuevoProducto}
              className="bg-[#4A5D3A] text-white rounded-lg px-4 py-2 text-sm hover:bg-[#3d4d30] transition-colors"
            >
              + Nuevo producto
            </button>
          )}
        </div>

        {mostrandoForm && (
          <div className="mb-8">
            <ProductForm
              productoEditando={productoEditando}
              onGuardado={handleGuardado}
              onCancelar={() => {
                setMostrandoForm(false);
                setProductoEditando(null);
              }}
            />
          </div>
        )}

        <h2 className="font-serif text-xl text-stone-800 mb-3">Productos</h2>

        {loading && <p className="text-stone-500 text-sm">Cargando...</p>}

        {!loading && products.length === 0 && (
          <p className="text-stone-500 text-sm">No hay productos todavía.</p>
        )}

        <div className="flex flex-col gap-2">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-stone-200 rounded-lg px-4 py-3 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-lime-100 to-emerald-50 flex items-center justify-center shrink-0 overflow-hidden">
                {product.imagenes?.[0] ? (
                  <img src={product.imagenes[0]} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span>🌱</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-900 truncate">{product.nombre}</p>
                <p className="text-xs text-stone-500">
                  {product.categoria} · ${product.precio} · {product.stock} disponibles
                </p>
              </div>

              <button
                onClick={() => handleEditar(product)}
                className="text-sm text-stone-600 hover:text-[#4A5D3A]"
              >
                Editar
              </button>
              <button
                onClick={() => handleEliminar(product._id)}
                className="text-sm text-stone-400 hover:text-red-500"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}