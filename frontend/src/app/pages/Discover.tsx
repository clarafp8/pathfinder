import { useState } from "react";
import { Play } from "lucide-react";

const categories = ["Todos", "Grados", "Universidades", "Consejos", "Experiencias"];

const discoverContent = [
  {
    id: 1,
    type: "image",
    category: "Grados",
    title: "Mi experiencia en Medicina",
    image: "https://images.unsplash.com/photo-1758270703813-2ecf235a6462?w=400",
    views: "12.5K",
  },
  {
    id: 2,
    type: "video",
    category: "Universidades",
    title: "Campus de la UCM",
    image: "https://images.unsplash.com/photo-1663162550938-60f70fab5d31?w=400",
    views: "8.3K",
  },
  {
    id: 3,
    type: "image",
    category: "Consejos",
    title: "Cómo preparar Selectividad",
    image: "https://images.unsplash.com/photo-1536925155833-43e9c2b2f499?w=400",
    views: "15.7K",
  },
  {
    id: 4,
    type: "video",
    category: "Experiencias",
    title: "Un día en Ingeniería",
    image: "https://images.unsplash.com/photo-1758270705087-76e81a5117bd?w=400",
    views: "9.2K",
  },
  {
    id: 5,
    type: "image",
    category: "Grados",
    title: "Psicología: lo que debes saber",
    image: "https://images.unsplash.com/photo-1758270705172-07b53627dfcb?w=400",
    views: "11.4K",
  },
  {
    id: 6,
    type: "video",
    category: "Universidades",
    title: "Tour por la UAM",
    image: "https://images.unsplash.com/photo-1536925155833-43e9c2b2f499?w=400",
    views: "7.8K",
  },
  {
    id: 7,
    type: "image",
    category: "Consejos",
    title: "5 tips para elegir carrera",
    image: "https://images.unsplash.com/photo-1663162550938-60f70fab5d31?w=400",
    views: "18.9K",
  },
  {
    id: 8,
    type: "video",
    category: "Experiencias",
    title: "Mi primer año en ADE",
    image: "https://images.unsplash.com/photo-1758270703813-2ecf235a6462?w=400",
    views: "6.5K",
  },
  {
    id: 9,
    type: "image",
    category: "Grados",
    title: "Arquitectura: ¿Qué esperar?",
    image: "https://images.unsplash.com/photo-1758270705087-76e81a5117bd?w=400",
    views: "10.2K",
  },
  {
    id: 10,
    type: "video",
    category: "Universidades",
    title: "Residencias universitarias UCM",
    image: "https://images.unsplash.com/photo-1758270705172-07b53627dfcb?w=400",
    views: "5.9K",
  },
  {
    id: 11,
    type: "image",
    category: "Consejos",
    title: "Cómo estudiar eficientemente",
    image: "https://images.unsplash.com/photo-1536925155833-43e9c2b2f499?w=400",
    views: "14.3K",
  },
  {
    id: 12,
    type: "video",
    category: "Experiencias",
    title: "Erasmus en Italia",
    image: "https://images.unsplash.com/photo-1663162550938-60f70fab5d31?w=400",
    views: "13.7K",
  },
];

export function Discover() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredContent = selectedCategory === "Todos"
    ? discoverContent
    : discoverContent.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white py-6 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl mb-6">Descubrir</h1>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-[#007bff] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square cursor-pointer group overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                {item.type === "video" && (
                  <Play className="w-12 h-12 text-white" />
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="text-white">
                  <div className="text-xs mb-1 opacity-80">{item.category}</div>
                  <div className="font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-xs opacity-80">{item.views} vistas</div>
                </div>
              </div>

              {item.type === "video" && (
                <div className="absolute top-2 right-2">
                  <div className="bg-black/60 text-white px-2 py-1 text-xs flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Video
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No se encontraron resultados para esta categoría
          </div>
        )}
      </div>
    </div>
  );
}
