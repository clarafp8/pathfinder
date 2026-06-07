import { useEffect, useState } from "react";
import { titulacionesAPI, Titulacion } from "../services/apiClient";

export function Discover() {
  const [titulaciones, setTitulaciones] = useState<Titulacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroRama, setFiltroRama] = useState("");
  const [filtroProvincia, setFiltroProvincia] = useState("");
  
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    const cargarTitulaciones = async () => {
      try {
        setLoading(true);
        const data = await titulacionesAPI.getAll();
        setTitulaciones(Array.isArray(data) ? data : []);
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

  const activarGeolocalizacion = () => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoadingLocation(false);
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
        setLoadingLocation(false);
        setError("Permiso de ubicación denegado o no disponible.");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const filtradasYOrdenadas = titulaciones
    .filter((t) => {
      const cumpleNombre = !filtroNombre || t.nombre?.toLowerCase().includes(filtroNombre.toLowerCase());
      const cumpleTipo = filtroTipo === "" || t.tipo === filtroTipo;
      const cumpleRama = filtroRama === "" || t.rama?.nombre === filtroRama;
      
      const cumpleProvincia = filtroProvincia === "" || (t.centros && t.centros.some(centro => 
        centro.provincia?.toLowerCase().includes(filtroProvincia.toLowerCase())
      ));
      
      return cumpleNombre && cumpleTipo && cumpleRama && cumpleProvincia;
    })
    .map((t) => {
      if (userCoords && t.centros && t.centros.length > 0) {
        const distancias = t.centros
          .filter(c => c.latitud !== null && c.longitud !== null && c.latitud !== undefined && c.longitud !== undefined)
          .map(c => calcularDistancia(userCoords.lat, userCoords.lng, c.latitud!, c.longitud!));
        
        if (distancias.length > 0) {
          return { ...t, distanciaMinima: Math.min(...distancias) };
        }
      }
      return t;
    })
    .sort((a: any, b: any) => {
      if (userCoords && a.distanciaMinima !== undefined && b.distanciaMinima !== undefined) {
        return a.distanciaMinima - b.distanciaMinima;
      }
      return 0;
    });

  const opcionesTipo = Array.from(new Set(titulaciones.map((t) => t.tipo).filter(Boolean)));
  const opcionesRama = Array.from(new Set(titulaciones.map((t) => t.rama?.nombre).filter(Boolean)));
  const opcionesProvincia = Array.from(new Set(
    titulaciones.flatMap((t) => t.centros?.map(c => c.provincia) || []).filter(Boolean)
  ));

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl mb-6 font-bold">Explorar Titulaciones</h1>
        
        <div className="bg-gray-50 border border-gray-200 p-6 mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Buscar por nombre</label>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 text-sm focus:outline-none focus:border-[#007bff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Filtrar por Tipo</label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 text-sm focus:outline-none focus:border-[#007bff]"
              >
                <option value="">Todos los tipos</option>
                {opcionesTipo.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Filtrar por Rama</label>
              <select
                value={filtroRama}
                onChange={(e) => setFiltroRama(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 text-sm focus:outline-none focus:border-[#007bff]"
              >
                <option value="">Todas las ramas</option>
                {opcionesRama.map((rama) => (
                  <option key={rama} value={rama}>{rama}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Filtrar por Provincia</label>
              <select
                value={filtroProvincia}
                onChange={(e) => setFiltroProvincia(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 text-sm focus:outline-none focus:border-[#007bff]"
              >
                <option value="">Todas las provincias</option>
                {opcionesProvincia.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              {userCoords 
                ? "🟢 Geolocalización activa. Ordenando titulaciones por cercanía al campus más próximo." 
                : "Puedes activar la ubicación para calcular de forma métrica la distancia a las universidades."}
            </div>
            <button
              type="button"
              onClick={activarGeolocalizacion}
              disabled={loadingLocation || !!userCoords}
              className={`text-xs px-4 py-2 font-semibold border transition-all ${
                userCoords 
                  ? "bg-green-50 border-green-300 text-green-700 cursor-default"
                  : "bg-white border-gray-300 text-gray-700 hover:border-[#007bff] hover:text-[#007bff]"
              }`}
            >
              {loadingLocation ? "Obteniendo coordenadas..." : userCoords ? "Ubicación Permitida" : "📍 Usar geolocalización"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-100 h-48 border border-gray-200 p-6"></div>
            ))}
          </div>
        ) : filtradasYOrdenadas.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded">
            <p className="text-gray-500 text-sm italic">No se han encontrado resultados con los filtros actuales.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtradasYOrdenadas.map((titulacion: any) => (
              <div
                key={titulacion.idTitulacion}
                className="bg-white border-2 border-gray-100 p-6 hover:border-[#007bff] transition-all duration-300 flex flex-col justify-between shadow-sm relative"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{titulacion.nombre}</h3>
                    {titulacion.distanciaMinima !== undefined && (
                      <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 font-bold rounded-full shrink-0">
                        a {titulacion.distanciaMinima.toFixed(1)} km
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {titulacion.tipo && (
                      <span className="bg-blue-50 text-[#007bff] text-[10px] px-2 py-0.5 font-semibold rounded">
                        {titulacion.tipo}
                      </span>
                    )}
                    {titulacion.rama?.nombre && (
                      <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 font-semibold rounded">
                        {titulacion.rama.nombre}
                      </span>
                    )}
                  </div>
                  
                  {titulacion.centros && titulacion.centros.length > 0 && (
                    <div className="text-xs text-gray-400 italic mb-4 space-y-0.5">
                      {titulacion.centros.slice(0, 2).map((c: any) => (
                        <p key={c.idCentro}>📍 {c.nombre} ({c.provincia || "Sin provincia"})</p>
                      ))}
                      {titulacion.centros.length > 2 && <p className="text-[10px]">y {titulacion.centros.length - 2} centros más...</p>}
                    </div>
                  )}
                </div>

                <div className="mt-2 border-t pt-3 flex justify-between items-center text-xs text-gray-500">
                  <span>Nota de corte:</span>
                  <strong className="text-xl font-black text-[#007bff]">
                    {titulacion.notaCorte || "No requiere"}
                  </strong>
                </div>

                <button className="w-full mt-4 bg-[#007bff] text-white py-2 text-xs font-semibold hover:bg-[#0056b3] transition-colors shadow-sm">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}