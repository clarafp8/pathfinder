import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Usuario } from "../services/apiClient";
import PerfilUsuario from "../components/PerfilUsuario";

export function Profile() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recupera el usuario guardado por el Login en el almacenamiento local
    const sesionGuardada = localStorage.getItem("usuario");
    
    if (sesionGuardada) {
      try {
        const usuarioParseado = JSON.parse(sesionGuardada) as Usuario;
        setUsuario(usuarioParseado);
      } catch (error) {
        console.error("Error al procesar los datos de sesión del usuario:", error);
      }
    }
    setLoading(false);
  }, []);

  // Sincroniza los cambios en el localStorage cuando el usuario guarde sus modificaciones con éxito
  const handleUpdateSuccess = (usuarioActualizado: Usuario) => {
    setUsuario(usuarioActualizado);
    localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 animate-pulse text-sm font-medium">
          Cargando datos del perfil...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="border-2 border-gray-200 p-8">
          
          {/* Cabecera de la sección */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Mi Perfil</h1>
            <button 
              onClick={() => navigate("/")} 
              className="text-sm text-gray-600 hover:underline"
            >
              Volver
            </button>
          </div>

          {/* Renderizado condicional automático según el estado de la sesión */}
          {usuario ? (
            <PerfilUsuario 
              usuario={usuario} 
              onNavigate={(p) => navigate(p)} 
              onUpdateSuccess={handleUpdateSuccess} 
            />
          ) : (
            <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300">
              <p className="text-gray-500 text-sm italic mb-4">
                No se ha detectado ninguna sesión activa.
              </p>
              <button 
                onClick={() => navigate("/login")} 
                className="bg-[#007bff] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#0056b3] transition-colors"
              >
                Iniciar Sesión
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;