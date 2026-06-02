import { useEffect, useState } from "react";
import { titulacionesAPI, Titulacion } from "../services/apiClient";

export function Discover() {
  const [titulaciones, setTitulaciones] = useState<Titulacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargarTitulaciones = async () => {
      try {
        setLoading(true);
        const data = await titulacionesAPI.getAll();
        setTitulaciones(data);
        setError("");
      } catch (err) {
        console.error("Error al cargar titulaciones:", err);
        setError("No se pudieron cargar las titulaciones");
      } finally {
        setLoading(false);
      }
    };

    cargarTitulaciones();
  }, []);

  const filtradas = filtro
    ? titulaciones.filter(t =>
        t.nombre?.toLowerCase().includes(filtro.toLowerCase())
      )
    : titulaciones;

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl mb-6 font-bold">Explorar Titulaciones</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar titulación..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600">Cargando titulaciones...</p>
          </div>
        ) : filtradas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">
              {filtro ? "No se encontraron titulaciones con ese nombre" : "No hay titulaciones disponibles"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtradas.map((titulacion) => (
              <div
                key={titulacion.idTitulacion}
                className="border-2 border-gray-200 p-6 hover:border-[#007bff] transition-colors cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-3">{titulacion.nombre}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Nota de corte:</span>
                    <span className="text-2xl font-bold text-[#007bff]">{titulacion.notaCorte}</span>
                  </div>
                  {titulacion.ramaNombre && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rama:</span>
                      <span className="text-sm font-medium">{titulacion.ramaNombre}</span>
                    </div>
                  )}
                </div>
                <button className="w-full mt-4 bg-[#007bff] text-white py-2 hover:bg-[#0056b3] transition-colors">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Consejos para elegir titulación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border-2 border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-2">Considera tus intereses</h3>
              <p className="text-gray-600">Elige una carrera que te apasione, no solo una que tenga alta demanda.</p>
            </div>
            <div className="border-2 border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-2">Analiza las salidas profesionales</h3>
              <p className="text-gray-600">Investiga qué oportunidades laborales ofrece cada titulación.</p>
            </div>
            <div className="border-2 border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-2">Consulta con profesionales</h3>
              <p className="text-gray-600">Habla con personas que trabajan en el campo que te interesa.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
