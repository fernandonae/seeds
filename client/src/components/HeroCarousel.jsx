import { useState, useEffect } from 'react';
import api from '../api/axios';

const staticSlides = [
  {
    titulo: 'Siembra tu propio huerto',
    texto: 'Semillas seleccionadas para cada temporada',
    emoji: '🌻',
    badge: 'Nuestra Colección',
  },
  {
    titulo: 'Envío a todo el país',
    texto: 'Recibe tus semillas en la puerta de tu casa',
    emoji: '📦',
    badge: 'Servicio Rápido',
  },
  {
    titulo: 'Calidad garantizada',
    texto: 'Semillas certificadas y de alta germinación',
    emoji: '🌱',
    badge: '100% Orgánico',
  },
];

export default function HeroCarousel() {
  const [carruselProducts, setCarruselProducts] = useState([]);
  const [index, setIndex] = useState(0);

  // Obtener productos de la API y filtrar los que están en carrusel
  useEffect(() => {
    api
      .get('/products')
      .then((res) => {
        const filtrados = res.data.filter((p) => p.enCarrusel);
        setCarruselProducts(filtrados);
      })
      .catch((err) => console.error('Error al obtener productos del carrusel:', err));
  }, []);

  const items = carruselProducts.length > 0 ? carruselProducts : staticSlides;
  const usandoProductos = carruselProducts.length > 0;

  // Avanza automáticamente cada 5 segundos
  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i >= items.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [items]);

  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  const item = items[index] || items[0];

  if (!item) return null;

  return (
    <section className="relative w-full bg-gradient-to-b from-[#F5F6EF] to-[#EAECE1] py-8 md:py-12 px-4">
      <div className="max-w-5xl mx-auto relative bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200 overflow-hidden p-6 md:p-10 transition-all">
        
        {usandoProductos ? (
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[300px]">
            {/* Imagen del Producto */}
            <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-xl overflow-hidden shadow-inner bg-stone-100 flex items-center justify-center group shrink-0">
              {item.imagenes?.[0] ? (
                <img
                  src={item.imagenes[0]}
                  alt={item.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="text-6xl">🌱</div>
              )}
              <span className="absolute top-4 left-4 bg-[#4A5D3A] text-white text-xs px-3 py-1 rounded-full font-medium tracking-wide shadow-sm">
                {item.categoria || 'Semillas'}
              </span>
            </div>

            {/* Información del Producto */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
              <span className="text-xs font-bold tracking-widest text-[#4A5D3A] uppercase mb-1">
                Destacado en carrusel
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 leading-tight">
                {item.nombre}
              </h2>
              <p className="text-stone-600 text-sm md:text-base mt-3 line-clamp-3 leading-relaxed">
                {item.descripcion}
              </p>
              
              <div className="flex items-center gap-4 mt-6">
                <span className="text-2xl md:text-3xl font-serif font-bold text-[#2C3B22]">
                  ${item.precio}
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold">
                  {item.stock > 0 ? `${item.stock} disponibles` : 'Agotado'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Vista Informativa por defecto */
          <div className="flex flex-col items-center text-center py-10 min-h-[280px] justify-center">
            <span className="text-6xl mb-3 animate-pulse">{item.emoji}</span>
            <span className="text-xs uppercase tracking-widest text-[#4A5D3A] font-bold mb-2">
              {item.badge}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
              {item.titulo}
            </h2>
            <p className="text-stone-600 max-w-lg mt-2 text-sm md:text-base">
              {item.texto}
            </p>
          </div>
        )}

        {/* Flechas de navegación integradas */}
        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-stone-700 hover:bg-[#4A5D3A] hover:text-white transition-all flex items-center justify-center shadow-md border border-stone-200"
              aria-label="Anterior"
            >
              ❮
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-stone-700 hover:bg-[#4A5D3A] hover:text-white transition-all flex items-center justify-center shadow-md border border-stone-200"
              aria-label="Siguiente"
            >
              ❯
            </button>
          </>
        )}

        {/* Puntos (Paginación) estilo píldora */}
        {items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-[#4A5D3A]' : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Ir a slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}