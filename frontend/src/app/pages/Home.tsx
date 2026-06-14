import { Link } from "react-router";
import { ShieldCheck, Database, MapPin } from "lucide-react";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="relative h-screen flex items-center justify-center shrink-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1663162550938-60f70fab5d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdW5pdmVyc2l0eSUyMGNhbXB1cyUyMGZ1dHVyZSUyMGFjYWRlbWljJTIwc3VjY2Vzc3xlbnwxfHx8fDE3Nzk3OTAxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl mb-4 font-bold">Tu guía personalizada para el futuro académico</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre tu vocación, calcula tu nota y conecta con otros estudiantes.
          </p>
          <Link
            to="/cuestionario"
            className="inline-block bg-[#007bff] text-white px-12 py-4 text-xl font-semibold hover:scale-105 hover:underline transition-all shadow-md"
          >
            COMENZAR TEST
          </Link>
        </div>
      </div>

      <div className="py-20 px-6 bg-white flex-1">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-4 text-gray-900">¿Por qué confiar en nosotros?</h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto text-sm">
            Diseñamos herramientas reales para resolver las dudas más importantes de tu transición universitaria.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-2 border-gray-100 p-8 hover:border-[#007bff] transition-all duration-300 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <Database className="w-12 h-12 text-[#007bff] mb-5" />
                <h3 className="text-xl font-bold mb-3 text-gray-800">Información Centralizada</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Olvídate de revisar decenas de boletines oficiales y portales universitarios. Reunimos todas las notas de corte, ramas de conocimiento y grados actualizados en un único espacio integrado.
                </p>
              </div>
            </div>

            <div className="border-2 border-gray-100 p-8 hover:border-[#007bff] transition-all duration-300 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <MapPin className="w-12 h-12 text-[#007bff] mb-5" />
                <h3 className="text-xl font-bold mb-3 text-gray-800">Cercanía y Geolocalización</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Calculamos de forma métrica y matemática la distancia real en kilómetros desde tu ubicación hasta cada campus facultativo, ayudándote a evaluar los factores de transporte y residencia.
                </p>
              </div>
            </div>

            <div className="border-2 border-gray-100 p-8 hover:border-[#007bff] transition-all duration-300 bg-white shadow-sm flex flex-col justify-between">
              <div>
                <ShieldCheck className="w-12 h-12 text-[#007bff] mb-5" />
                <h3 className="text-xl font-bold mb-3 text-gray-800">Orientación Sin Sesgos</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Nuestros algoritmos de evaluación vocacional analizan tus intereses reales sin priorizar instituciones privadas ni patrocinios. Una guía transparente enfocada en tu éxito académico futuro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}