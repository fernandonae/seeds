export default function Nosotros() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <span className="text-4xl">🌾</span>
        <h1 className="font-serif text-4xl text-[#4A5D3A] mt-3">Sobre nosotros</h1>
        <p className="text-stone-600 mt-3 max-w-2xl mx-auto">
          Desde hace más de una década acompañamos a productores y jardineros con
          semillas de maíz, sorgo y hortalizas de alta calidad, pensadas para
          rendir en cada temporada de siembra.
        </p>
      </div>

      {/* Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <span className="text-2xl">🎯</span>
          <h2 className="font-serif text-xl text-[#4A5D3A] mt-2 mb-3">Misión</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Proveer semillas certificadas de maíz, sorgo y hortalizas con la más
            alta calidad genética y sanitaria, apoyando a nuestros clientes a
            obtener cosechas más productivas, rentables y sostenibles.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <span className="text-2xl">🔭</span>
          <h2 className="font-serif text-xl text-[#4A5D3A] mt-2 mb-3">Visión</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Ser la empresa de semillas de referencia en la región, reconocida por
            la innovación en nuestras variedades, el trato cercano con el
            productor y nuestro compromiso con la agricultura sostenible.
          </p>
        </div>
      </div>

      {/* Valores */}
      <div className="mb-12">
        <h2 className="font-serif text-2xl text-[#4A5D3A] text-center mb-6">
          Nuestros valores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="text-center">
            <span className="text-3xl">🌱</span>
            <h3 className="font-medium text-stone-900 mt-2">Calidad</h3>
            <p className="text-sm text-stone-500 mt-1">
              Semillas seleccionadas y probadas antes de llegar a tus manos.
            </p>
          </div>
          <div className="text-center">
            <span className="text-3xl">🤝</span>
            <h3 className="font-medium text-stone-900 mt-2">Cercanía</h3>
            <p className="text-sm text-stone-500 mt-1">
              Acompañamos al productor desde la siembra hasta la cosecha.
            </p>
          </div>
          <div className="text-center">
            <span className="text-3xl">🌎</span>
            <h3 className="font-medium text-stone-900 mt-2">Sostenibilidad</h3>
            <p className="text-sm text-stone-500 mt-1">
              Prácticas responsables que cuidan la tierra a largo plazo.
            </p>
          </div>
        </div>
      </div>

      {/* Qué sembramos */}
      <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center">
        <h2 className="font-serif text-2xl text-[#4A5D3A] mb-4">¿Qué sembramos?</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-stone-600">
          <span className="bg-[#F5F6EF] border border-stone-200 rounded-full px-4 py-1.5">
            🌽 Maíz
          </span>
          <span className="bg-[#F5F6EF] border border-stone-200 rounded-full px-4 py-1.5">
            🌾 Sorgo
          </span>
          <span className="bg-[#F5F6EF] border border-stone-200 rounded-full px-4 py-1.5">
            🥬 Hortalizas
          </span>
        </div>
      </div>
    </main>
  );
}