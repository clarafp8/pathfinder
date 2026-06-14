import { Outlet, Link, useNavigate } from "react-router";
import { User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import Login from "./Login"; // Asegúrate de que la ruta a tu componente Login sea correcta
import logo from '../../../logo_Black.png';

export function Layout() {
  const navigate = useNavigate();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  
  // Estado reactivo que controla si hay un usuario logueado en la app
  const [usuarioActivo, setUsuarioActivo] = useState<any>(null);

  // Al cargar la web, miramos si ya inició sesión antes
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      try {
        setUsuarioActivo(JSON.parse(usuarioGuardado));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Función que se ejecutará mágicamente cuando el hijo (Login) tenga éxito
  const handleLoginSuccess = (usuario: any) => {
    setUsuarioActivo(usuario);
    setShowLoginDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuarioActivo(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src={logo}
              alt="Logo PathFinder"
              className="w-8 h-8 object-contain"
            />
            <span className="font-semibold text-xl">PathFinder</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link to="/cuestionario" className="text-gray-700 hover:text-[#007bff] transition-colors">
              Cuestionario
            </Link>
            <Link to="/calculadora" className="text-gray-700 hover:text-[#007bff] transition-colors">
              Calculadora de nota
            </Link>
            <Link to="/foro" className="text-gray-700 hover:text-[#007bff] transition-colors">
              Foro
            </Link>
            <Link to="/descubrir" className="text-gray-700 hover:text-[#007bff] transition-colors">
              Descubrir
            </Link>

            <div className="relative">
              {usuarioActivo ? (
                // Si el usuario está logueado, mostramos su nombre y botón de salir
                <div className="flex items-center gap-4">
                  <Link to="/perfil" className="text-gray-700 font-medium hover:text-[#007bff] flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Hola, {usuarioActivo.nombre}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                // Si no está logueado, mostramos el botón de inicio de sesión de siempre
                <>
                  <button
                    onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#007bff] transition-colors"
                  >
                    <User className="w-5 h-5" />
                    Inicio de sesión
                  </button>

                  {showLoginDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg p-4 z-50">
                      <Login 
                        onClose={() => setShowLoginDropdown(false)} 
                        onLoginSuccess={handleLoginSuccess} 
                      />
                      <p className="text-sm text-center text-gray-600 mt-3 border-t pt-2">
                        ¿Todavía no tienes cuenta?{" "}
                        <Link
                          to="/registro"
                          className="text-[#007bff] hover:underline"
                          onClick={() => setShowLoginDropdown(false)}
                        >
                          Regístrate aquí
                        </Link>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENIDO INTERMEDIO DE CADA PANTALLA */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER GLOBAL ACTUALIZADO: ULTRA DELGADO Y MINIMALISTA */}
      <footer className="bg-gray-900 text-gray-400 py-4 px-6 border-t border-gray-800 shrink-0 text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <div>
              <span className="font-bold text-white tracking-wider">PATHFINDER</span> © {new Date().getFullYear()} — Todos los derechos reservados.
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-gray-500 italic hidden sm:inline">
              Encuentra tu camino profesional.
            </div>
            {/* Opcional: Icono sutil de GitHub por si queréis enlazar vuestro repositorio */}
            <a 
              href="https://github.com/clarafp8/pathfinder" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-white transition-colors"
              title="Ver código del proyecto"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}