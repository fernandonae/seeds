import { useState } from 'react';
import MapaCobertura from '../components/MapaCobertura';

// Reemplaza estos links por los reales de tu empresa
const redes = [
  {
    nombre: 'WhatsApp',
    emoji: '💬',
    url: 'https://wa.me/525512345678',
    descripcion: 'Respuesta rápida, directo a tu celular',
    color: 'bg-[#25D366]',
  },
  {
    nombre: 'Instagram',
    emoji: '📸',
    url: 'https://instagram.com/semillas',
    descripcion: 'Fotos del cultivo y novedades',
    color: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
  },
  {
    nombre: 'Facebook',
    emoji: '👍',
    url: 'https://facebook.com/semillas',
    descripcion: 'Promociones y comunidad',
    color: 'bg-[#1877F2]',
  },
  {
    nombre: 'TikTok',
    emoji: '🎵',
    url: 'https://tiktok.com/@semillas',
    descripcion: 'Tips de siembra en video',
    color: 'bg-stone-900',
  },
];

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setForm({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <span className="text-4xl">👋</span>
        <h1 className="font-serif text-4xl text-[#4A5D3A] mt-3">Hablemos</h1>
        <p className="text-stone-600 mt-3 max-w-xl mx-auto">
          Síguenos y escríbenos por donde prefieras, estamos ahí todos los días.
        </p>
      </div>

      {/* Redes sociales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {redes.map((red) => (
          <a
            key={red.nombre}
            href={red.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${red.color} rounded-2xl p-5 text-white flex flex-col items-center text-center gap-1 hover:scale-105 active:scale-95 transition-transform shadow-sm`}
          >
            <span className="text-3xl">{red.emoji}</span>
            <span className="font-medium text-sm mt-1">{red.nombre}</span>
            <span className="text-[11px] opacity-90 hidden sm:block">{red.descripcion}</span>
          </a>
        ))}
      </div>

      {/* Info rápida */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-3">
          <span className="text-xl">📍</span>
          <p className="text-sm text-stone-600">Av. Insurgentes Sur 123, CDMX</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-3">
          <span className="text-xl">🕒</span>
          <p className="text-sm text-stone-600">Lun–Vie, 9 a.m. – 6 p.m.</p>
        </div>
        <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-center gap-3">
          <span className="text-xl">📧</span>
          <p className="text-sm text-stone-600">contacto@semillas.com</p>
        </div>
      </div>

      {/* Mapa de cobertura */}
      <MapaCobertura />

      {/* Formulario opcional, colapsado por defecto */}
      <div className="text-center">
        {!mostrarForm && !enviado && (
          <button
            onClick={() => setMostrarForm(true)}
            className="text-sm text-stone-500 hover:text-[#4A5D3A] underline"
          >
            ¿Prefieres escribirnos por correo? Usa el formulario
          </button>
        )}

        {mostrarForm && (
          <div className="bg-white border border-stone-200 rounded-2xl p-6 mt-4 text-left max-w-md mx-auto">
            {enviado ? (
              <div className="flex flex-col items-center text-center py-6">
                <span className="text-3xl">✅</span>
                <p className="text-stone-700 font-medium mt-3">¡Mensaje enviado!</p>
                <p className="text-sm text-stone-500 mt-1">Te responderemos lo antes posible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-stone-500 block mb-1.5">
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm bg-[#FBFBF7] focus:outline-none focus:ring-2 focus:ring-[#4A5D3A]/30 focus:border-[#4A5D3A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-stone-500 block mb-1.5">
                    Correo
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm bg-[#FBFBF7] focus:outline-none focus:ring-2 focus:ring-[#4A5D3A]/30 focus:border-[#4A5D3A]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-stone-500 block mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm bg-[#FBFBF7] focus:outline-none focus:ring-2 focus:ring-[#4A5D3A]/30 focus:border-[#4A5D3A] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#4A5D3A] text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-[#3d4d30] active:scale-[0.98] transition-all"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
