import { Link } from "react-router";
import { BookOpen, Calculator, Search, MessageSquare, Lightbulb } from "lucide-react";

export function Home() {
  return (
    <div>
      <div
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1663162550938-60f70fab5d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdW5pdmVyc2l0eSUyMGNhbXB1cyUyMGZ1dHVyZSUyMGFjYWRlbWljJTIwc3VjY2Vzc3xlbnwxfHx8fDE3Nzk3OTAxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl mb-4">Tu guía personalizada para el futuro académico</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre tu vocación, calcula tu nota y conecta con otros estudiantes.
          </p>
          <Link
            to="/cuestionario"
            className="inline-block bg-[#007bff] text-white px-12 py-4 text-xl hover:scale-105 hover:underline transition-all"
          >
            COMENZAR TEST
          </Link>
        </div>
      </div>

      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">¿Por qué elegir nuestra web?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link to="/cuestionario" className="border-2 border-gray-200 p-8 hover:border-[#007bff] transition-colors">
              <BookOpen className="w-12 h-12 text-[#007bff] mb-4" />
              <h3 className="text-xl mb-3">Test Vocacional</h3>
              <p className="text-gray-600">
                Descubre qué carrera se adapta mejor a tus intereses y habilidades mediante nuestro test personalizado.
              </p>
            </Link>

            <Link to="/calculadora" className="border-2 border-gray-200 p-8 hover:border-[#007bff] transition-colors">
              <Calculator className="w-12 h-12 text-[#007bff] mb-4" />
              <h3 className="text-xl mb-3">Calcular nota de acceso</h3>
              <p className="text-gray-600">
                Calcula tu nota de la PAU y descubre si cumples los requisitos para tu carrera universitaria ideal.
              </p>
            </Link>

            <Link to="/descubrir" className="border-2 border-gray-200 p-8 hover:border-[#007bff] transition-colors">
              <Search className="w-12 h-12 text-[#007bff] mb-4" />
              <h3 className="text-xl mb-3">Explorar titulaciones</h3>
              <p className="text-gray-600">
                Explora diferentes grados universitarios, universidades y experiencias de estudiantes actuales.
              </p>
            </Link>

            <Link to="/foro" className="border-2 border-gray-200 p-8 hover:border-[#007bff] transition-colors">
              <MessageSquare className="w-12 h-12 text-[#007bff] mb-4" />
              <h3 className="text-xl mb-3">Compartir experiencias</h3>
              <p className="text-gray-600">
                Conecta con otros estudiantes, comparte dudas y descubre experiencias reales de la vida universitaria.
              </p>
            </Link>

            <div className="border-2 border-gray-200 p-8 hover:border-[#007bff] transition-colors">
              <Lightbulb className="w-12 h-12 text-[#007bff] mb-4" />
              <h3 className="text-xl mb-3">Obtener Orientación</h3>
              <p className="text-gray-600">
                Recibe consejos personalizados sobre tu futuro académico basados en tus intereses y objetivos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
