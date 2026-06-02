import { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, User } from "lucide-react";
import { publicacionesAPI, Publicacion } from "../services/apiClient";

const trendingTopics = [
  { topic: "#Selectividad2026", posts: "12.5K posts" },
  { topic: "#NotasDeCorte", posts: "8.3K posts" },
  { topic: "#VidaUniversitaria", posts: "5.7K posts" },
  { topic: "#TestVocacional", posts: "4.2K posts" },
  { topic: "#Erasmus", posts: "3.1K posts" },
];

export function Forum() {
  const [posts, setPosts] = useState<Publicacion[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [creatingPost, setCreatingPost] = useState(false);

  // Cargar publicaciones al montar el componente
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await publicacionesAPI.getMainTopics();
        setPosts(data);
        setError("");
      } catch (err) {
        console.error("Error al cargar publicaciones:", err);
        setError("No se pudieron cargar las publicaciones");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      setError("El contenido no puede estar vacío");
      return;
    }

    setCreatingPost(true);
    setError("");

    try {
      // Por ahora usamos un usuarioId fijo (1), en una app real vendría del auth
      const newPublication: Publicacion = {
        contenido: newPostContent,
        usuarioId: 1, // TODO: Obtener del usuario autenticado
      };

      const created = await publicacionesAPI.create(newPublication);
      setPosts([created, ...posts]);
      setNewPostContent("");
      setShowNewPost(false);
    } catch (err) {
      console.error("Error al crear publicación:", err);
      setError("Error al crear la publicación");
    } finally {
      setCreatingPost(false);
    }
  };

  const handleDeletePost = async (publicacionId: number | undefined) => {
    if (!publicacionId) return;
    
    try {
      await publicacionesAPI.delete(publicacionId);
      setPosts(posts.filter(p => p.idPublicacion !== publicacionId));
    } catch (err) {
      console.error("Error al eliminar publicación:", err);
      setError("Error al eliminar la publicación");
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Ahora";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return date.toLocaleDateString("es-ES");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 px-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="border-2 border-gray-200 p-6">
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              disabled={loading}
              className="w-full bg-[#007bff] text-white py-3 hover:bg-[#0056b3] disabled:bg-gray-400 transition-colors mb-4"
            >
              Crear Publicación
            </button>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {showNewPost && (
              <div className="border border-gray-200 p-4 mb-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => {
                    setNewPostContent(e.target.value);
                    setError("");
                  }}
                  placeholder="¿Qué quieres compartir?"
                  disabled={creatingPost}
                  className="w-full border border-gray-300 p-3 h-24 resize-none focus:outline-none focus:border-[#007bff] disabled:bg-gray-100"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleCreatePost}
                    disabled={creatingPost}
                    className="bg-[#007bff] text-white px-6 py-2 hover:bg-[#0056b3] disabled:bg-gray-400 transition-colors"
                  >
                    {creatingPost ? "Publicando..." : "Publicar"}
                  </button>
                  <button
                    onClick={() => setShowNewPost(false)}
                    disabled={creatingPost}
                    className="bg-gray-200 text-gray-800 px-6 py-2 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="border-2 border-gray-200 p-6 text-center">
              <p className="text-gray-600">Cargando publicaciones...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="border-2 border-gray-200 p-6 text-center">
              <p className="text-gray-600">No hay publicaciones aún. ¡Sé el primero en compartir!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.idPublicacion} className="border-2 border-gray-200 p-6 hover:border-gray-300 transition-colors">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#007bff] text-white flex items-center justify-center flex-shrink-0 rounded">
                    U
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">Usuario {post.usuarioId}</span>
                      <span className="text-gray-500">@usuario</span>
                      <span className="text-gray-500">· {formatDate(post.fechaCreacion)}</span>
                    </div>

                    <p className="text-gray-800 mb-4">{post.contenido}</p>

                    <div className="flex gap-8 text-gray-600">
                      <button className="flex items-center gap-2 hover:text-[#007bff] transition-colors">
                        <Heart className="w-5 h-5" />
                        <span>0</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-[#007bff] transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>0</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-[#007bff] transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span>0</span>
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.idPublicacion)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <div className="border-2 border-gray-200 p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Temas en Tendencia</h2>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="hover:bg-gray-50 p-3 cursor-pointer transition-colors">
                  <div className="text-[#007bff] font-semibold">{topic.topic}</div>
                  <div className="text-sm text-gray-500">{topic.posts}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Usuarios Recomendados</h2>
            <div className="space-y-4">
              {["Elena Torres", "Pablo Jiménez", "Carmen Vega"].map((name, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 flex items-center justify-center rounded">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{name}</div>
                    <div className="text-xs text-gray-500">@{name.toLowerCase().replace(" ", "_")}</div>
                  </div>
                  <button className="bg-[#007bff] text-white px-4 py-1 text-sm hover:bg-[#0056b3] transition-colors">
                    Seguir
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
