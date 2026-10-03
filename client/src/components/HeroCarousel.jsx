import { useState, useEffect } from 'react';

const slides = [
  {
    titulo: 'Siembra tu propio huerto',
    texto: 'Semillas seleccionadas para cada temporada',
    emoji: '🌻',
    color: 'from-amber-100 to-yellow-50',
  },
  {
    titulo: 'Envío a todo el país',
    texto: 'Recibe tus semillas en la puerta de tu casa',
    emoji: '📦',
    color: 'from-emerald-100 to-lime-50',
  },
  {
    titulo: 'Calidad garantizada',
    texto: 'Semillas certificadas y de alta germinación',
    emoji: '🌱',
    color: 'from-lime-100 to-emerald-50',
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  // Avanza automáticamente cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  const slide = slides[index];

  return (
    <div className={`relative w-full h-56 sm:h-72 bg-gradient-to-br ${slide.color} flex items-center justify-center overflow-hidden transition-colors`}>
      <div className="text-center px-6">
        <span className="text-5xl">{slide.emoji}</span>
        <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-3">{slide.titulo}</h2>
        <p className="text-stone-600 text-sm sm:text-base mt-1">{slide.texto}</p>
      </div>

      {/* Flechas */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-stone-700 hover:bg-white transition-colors"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-stone-700 hover:bg-white transition-colors"
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Puntitos */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? 'bg-[#4A5D3A]' : 'bg-white/70'
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}