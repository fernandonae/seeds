import { useState } from 'react';

// Datos de PRUEBA — reemplaza con las sucursales y zonas reales cuando las tengas.
// top/left son porcentajes de posición sobre el mapa (calculados con las
// coordenadas reales de cada lugar), así que si agregas un lugar nuevo
// real, lo más fácil es ajustarlos a ojo moviendo el punto hasta que caiga
// en el sitio correcto del mapa.
const sucursales = [
  {
    nombre: 'Sucursal Ciudad de México',
    direccion: 'Av. Insurgentes Sur 123, Col. Roma, CDMX',
    top: 72.6,
    left: 60.2,
  },
  {
    nombre: 'Sucursal Guadalajara',
    direccion: 'Av. Vallarta 456, Guadalajara, Jalisco',
    top: 66.1,
    left: 47.1,
  },
  {
    nombre: 'Sucursal Monterrey',
    direccion: 'Av. Constitución 789, Monterrey, Nuevo León',
    top: 39.8,
    left: 56.5,
  },
  {
    nombre: 'Sucursal Culiacán',
    direccion: 'Blvd. Pedro Infante 321, Culiacán, Sinaloa',
    top: 44.6,
    left: 34.5,
  },
];

const zonasSiembra = [
  { nombre: 'Sonora', cultivo: 'Maíz', top: 22.1, left: 23.4 },
  { nombre: 'Bajío, Guanajuato', cultivo: 'Sorgo', top: 63.8, left: 52.2 },
  { nombre: 'Chiapas', cultivo: 'Hortalizas', top: 86.6, left: 78.8 },
  { nombre: 'Tamaulipas', cultivo: 'Sorgo y maíz', top: 50.1, left: 60.1 },
];

const MAPA_URL = 'https://commons.wikimedia.org/wiki/Special:FilePath/Mexico_location_map.svg';

export default function MapaCobertura() {
  const [zonaActiva, setZonaActiva] = useState(null);

  const abrirDireccion = (direccion) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      direccion
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mb-12">
      <h2 className="font-serif text-2xl text-[#4A5D3A] text-center mb-2">
        Dónde estamos y dónde sembramos
      </h2>
      <p className="text-sm text-stone-500 text-center mb-6">
        Toca una sucursal para ver su ubicación, o una semilla para ver qué se siembra ahí.
      </p>

      <div className="relative w-full max-w-2xl mx-auto bg-white border border-stone-200 rounded-2xl p-4 sm:p-6">
        <div className="relative w-full" style={{ aspectRatio: '3 / 2' }}>
          <img
            src={MAPA_URL}
            alt="Mapa de México"
            className="absolute inset-0 w-full h-full object-contain opacity-70"
            draggable={false}
          />

          {/* Marcadores de sucursales */}
          {sucursales.map((s) => (
            <button
              key={s.nombre}
              onClick={() => abrirDireccion(s.direccion)}
              title={`${s.nombre} — toca para ver la dirección`}
              className="absolute -translate-x-1/2 -translate-y-full group"
              style={{ top: `${s.top}%`, left: `${s.left}%` }}
            >
              <span className="text-xl drop-shadow-sm group-hover:scale-125 transition-transform inline-block">
                📍
              </span>
              <span className="hidden sm:block absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap bg-[#4A5D3A] text-white text-[10px] rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {s.nombre}
              </span>
            </button>
          ))}

          {/* Marcadores de zonas de siembra */}
          {zonasSiembra.map((z) => (
            <button
              key={z.nombre}
              onClick={() => setZonaActiva(zonaActiva === z.nombre ? null : z.nombre)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${z.top}%`, left: `${z.left}%` }}
            >
              <span className="text-lg drop-shadow-sm hover:scale-125 transition-transform inline-block">
                🌱
              </span>
              {zonaActiva === z.nombre && (
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 whitespace-nowrap bg-amber-600 text-white text-[10px] rounded px-2 py-1">
                  {z.nombre} · {z.cultivo}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs text-stone-600">
          <span className="flex items-center gap-1.5">
            <span>📍</span> Sucursales
          </span>
          <span className="flex items-center gap-1.5">
            <span>🌱</span> Zonas de siembra
          </span>
        </div>
      </div>
    </div>
  );
}
