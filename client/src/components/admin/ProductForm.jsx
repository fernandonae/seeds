import { useState } from 'react';
import api from '../../api/axios';

const initialForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  categoria: '',
};

const inputClass =
  'w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm text-stone-800 bg-[#FBFBF7] focus:outline-none focus:ring-2 focus:ring-[#4A5D3A]/30 focus:border-[#4A5D3A] transition-colors placeholder:text-stone-400';

const labelClass = 'text-xs font-medium uppercase tracking-wide text-stone-500 block mb-1.5';

export default function ProductForm({ productoEditando, onGuardado, onCancelar }) {
  const [form, setForm] = useState(
    productoEditando
      ? {
          nombre: productoEditando.nombre,
          descripcion: productoEditando.descripcion,
          precio: productoEditando.precio,
          stock: productoEditando.stock,
          categoria: productoEditando.categoria,
        }
      : initialForm
  );
  const [imagenes, setImagenes] = useState(productoEditando?.imagenes || []);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImagenSeleccionada = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSubiendoImagen(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('imagen', file);

      const res = await api.post('/upload', formData);
      setImagenes((prev) => [...prev, res.data.url]);
    } catch (err) {
      setError('No se pudo subir la imagen. Intenta de nuevo.');
    } finally {
      setSubiendoImagen(false);
      e.target.value = '';
    }
  };

  const quitarImagen = (url) => {
    setImagenes((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setError(null);

    const payload = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock),
      imagenes,
    };

    try {
      if (productoEditando) {
        await api.put(`/products/${productoEditando._id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      onGuardado();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar el producto.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 flex flex-col gap-5"
    >
      <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
        <span className="text-xl">{productoEditando ? '✏️' : '🌱'}</span>
        <h3 className="font-serif text-xl text-[#4A5D3A]">
          {productoEditando ? 'Editar producto' : 'Nuevo producto'}
        </h3>
      </div>

      <div>
        <label className={labelClass}>Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          placeholder="Ej. Semilla de tomate"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Descripción</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          required
          rows={3}
          placeholder="Describe brevemente el producto..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Precio</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              className={`${inputClass} pl-6`}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            required
            min="0"
            placeholder="0"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Categoría</label>
        <input
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          required
          placeholder="Ej. Hortalizas"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Imágenes</label>

        <div className="flex flex-wrap gap-3 mb-3">
          {imagenes.map((url) => (
            <div key={url} className="relative w-20 h-20 group">
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover rounded-xl border border-stone-200"
              />
              <button
                type="button"
                onClick={() => quitarImagen(url)}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow-sm hover:bg-red-600 transition-colors"
                aria-label="Quitar imagen"
              >
                ✕
              </button>
            </div>
          ))}

          <label
            className={`w-20 h-20 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer text-stone-400 hover:border-[#4A5D3A] hover:text-[#4A5D3A] transition-colors ${
              subiendoImagen ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <span className="text-xl leading-none">＋</span>
            <span className="text-[10px] mt-1">
              {subiendoImagen ? 'Subiendo...' : 'Agregar'}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenSeleccionada}
              disabled={subiendoImagen}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={guardando || subiendoImagen}
          className="flex-1 bg-[#4A5D3A] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-[#3d4d30] active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 shadow-sm"
        >
          {guardando
            ? 'Guardando...'
            : productoEditando
            ? 'Guardar cambios'
            : 'Crear producto'}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="px-5 py-2.5 text-sm font-medium text-stone-600 border border-stone-200 rounded-xl hover:bg-stone-50 active:scale-[0.98] transition-all"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}