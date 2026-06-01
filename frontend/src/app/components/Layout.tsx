import { Outlet, Link } from "react-router";
import { GraduationCap, User } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
    setShowLoginDropdown(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <GraduationCap className="w-8 h-8 text-[#007bff]" />
            <span className="font-semibold text-xl">OrientaFuturo</span>
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
              <button
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                className="flex items-center gap-2 text-gray-700 hover:text-[#007bff] transition-colors"
              >
                <User className="w-5 h-5" />
                Inicio de sesión
              </button>

              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg p-4 z-50">
                  <form onSubmit={handleLogin} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                    />
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#007bff] text-white py-2 hover:bg-[#0056b3] transition-colors"
                    >
                      Iniciar sesión
                    </button>
                    <p className="text-sm text-center text-gray-600">
                      ¿Todavía no tienes cuenta?{" "}
                      <Link
                        to="/registro"
                        className="text-[#007bff] hover:underline"
                        onClick={() => setShowLoginDropdown(false)}
                      >
                        Regístrate aquí
                      </Link>
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2026 OrientaFuturo. Todos los derechos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-[#007bff] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#007bff] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-[#007bff] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-[#007bff] transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="text-gray-600 hover:text-[#007bff] transition-colors">
                Términos de uso
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
