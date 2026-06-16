import { Outlet, Link, useNavigate } from "react-router";
import { User, LogOut, ShieldAlert } from "lucide-react";
import { useState, useEffect } from "react";
import Login from "./Login";
import logoMinimalista from '../../../logo_Black.png';

export function Layout() {
  const navigate = useNavigate();
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Estado que controla si hay un usuario logueado en la app
  const [usuarioActivo, setUsuarioActivo] = useState<any>(null);

  // Al cargar la web, miramos si ya hubo inicio de sesión previa
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

  // Función login exitoso
  const handleLoginSuccess = (usuario: any) => {
    setUsuarioActivo(usuario);
    setShowLoginDropdown(false);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuarioActivo(null);
    setShowMobileMenu(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* MENÚ DE NAVEGACIÓN */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src={logoMinimalista}
              alt="Logo PathFinder"
              className="w-8 h-8 object-contain"
            />
            {/* El texto se mantiene al lado en todas las pantallas */}
            <span className="font-semibold text-xl text-gray-900 tracking-tight">PathFinder</span>
          </Link>

          <div className="flex items-center gap-6">
            {/* Botón menú hamburguesa (Solo visible en móviles) */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded hover:bg-gray-100"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Enlaces de navegación de Escritorio */}
            <div className="hidden md:flex items-center gap-8">
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

              {/* ENLACE ADMIN */}
              {usuarioActivo && usuarioActivo.rol === "ADMIN" && (
                <Link to="/admin" className="text-red-600 font-bold hover:text-red-700 transition-colors flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" />
                  Panel Admin
                </Link>
              )}
            </div>

            <div className="relative hidden md:block">
              {usuarioActivo ? (
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

        {/* 📱 VISTA MÓVIL: Menú Desplegable Hamburguesa */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 mt-2">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">

              {/* Enlaces comunes */}
              <Link to="/cuestionario" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 py-2">Cuestionario</Link>
              <Link to="/calculadora" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 py-2">Calculadora de nota</Link>
              <Link to="/foro" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 py-2">Foro</Link>
              <Link to="/descubrir" onClick={() => setShowMobileMenu(false)} className="block text-gray-700 py-2">Descubrir</Link>

              {/* 👑 ENLACE EXCLUSIVO DE ADMIN (MÓVIL) */}
              {usuarioActivo && usuarioActivo.rol === "ADMIN" && (
                <Link 
                  to="/admin" 
                  onClick={() => setShowMobileMenu(false)} 
                  className="block text-red-600 font-bold py-2 border-t border-b border-gray-100 flex items-center gap-2"
                >
                  <ShieldAlert className="w-5 h-5" />
                  Panel de Administración
                </Link>
              )}

              {/* 🔄 GESTIÓN DINÁMICA EXCLUSIVA PARA MÓVILES */}
              {usuarioActivo ? (
                /* Caso A: El usuario ha iniciado sesión */
                <div className="pt-3 mt-1 border-t border-gray-200 flex flex-col gap-3">
                  <Link
                    to="/perfil"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-gray-900 font-semibold py-1 flex items-center gap-2 text-base"
                  >
                    <User className="w-5 h-5 text-[#007bff]" />
                    Hola, {usuarioActivo.nombre}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium py-1 flex items-center gap-2 text-left w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                /* Caso B: El usuario no está logueado */
                <div className="pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                    className="w-full text-left text-gray-700 py-2 font-medium"
                  >
                    Iniciar sesión
                  </button>

                  {showLoginDropdown && (
                    <div className="mt-2 p-3 bg-white border rounded shadow-sm">
                      <Login
                        onClose={() => { setShowLoginDropdown(false); setShowMobileMenu(false); }}
                        onLoginSuccess={handleLoginSuccess}
                      />
                      <p className="text-sm text-center text-gray-600 mt-3">
                        ¿No tienes cuenta?{" "}
                        <Link to="/registro" className="text-[#007bff]" onClick={() => { setShowLoginDropdown(false); setShowMobileMenu(false); }}>Regístrate</Link>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* CONTENIDO INTERMEDIO */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER GLOBAL */}
      <footer className="bg-gray-900 text-gray-400 py-4 px-6 border-t border-gray-800 shrink-0 text-xs mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <div>
              <span className="font-bold text-white tracking-wider">PATHFINDER</span> © {new Date().getFullYear()} — Todos los derechos reservados.
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-gray-500 italic hidden sm:inline">Encuentra tu camino profesional.</div>
            <a href="https://github.com/clarafp8/pathfinder" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}