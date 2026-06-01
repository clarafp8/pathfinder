import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl text-gray-600 mb-6">Página no encontrada</h2>
        <p className="text-gray-500 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#007bff] text-white px-8 py-3 hover:bg-[#0056b3] transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
