import { useState } from 'react';

export default function ProductImageCarousel({ imagenes = [] }) {
  const [index, setIndex] = useState(0);

  const hasImages = imagenes.length > 0;

  const prev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? imagenes.length - 1 : i - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === imagenes.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="relative aspect-square bg-gradient-to-br from-lime-100 to-emerald-50 flex items-center justify-center overflow-hidden">
      {hasImages ? (
        <img
          src={imagenes[index]}
          alt={`Imagen ${index + 1}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-4xl">🌱</span>
      )}

      {hasImages && imagenes.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-stone-700 text-sm hover:bg-white transition-colors"
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-stone-700 text-sm hover:bg-white transition-colors"
            aria-label="Imagen siguiente"
          >
            ›
          </button>

          {/* Puntitos indicadores */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {imagenes.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === index ? 'bg-[#4A5D3A]' : 'bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}