import { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, User, ArrowLeft, Send } from "lucide-react";
import { publicacionesAPI } from "../services/apiClient";

const trendingTopics = [
  { topic: "#Selectividad2026", posts: "12.5K posts" },
  { topic: "#NotasDeCorte", posts: "8.3K posts" },
  { topic: "#VidaUniversitaria", posts: "5.7K posts" },
  { topic: "#TestVocacional", posts: "4.2K posts" },
  { topic: "#Erasmus", posts: "3.1K posts" },
];

export function Forum() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [creatingPost, setCreatingPost] = useState(false);

  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [newReplyContent, setNewReplyContent] = useState("");
  const [loadingReplies, setLoadingReplies] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await publicacionesAPI.getMainTopics();
      setPosts(data);
    } catch (err) {
      console.error("Error al cargar publicaciones:", err);
    }
  };

  const loadReplies = async (postId: number) => {
    setLoadingReplies(true);
    try {
      const data = await publicacionesAPI.getReplies(postId);
      setReplies(data);
    } catch (err) {
      console.error("Error al cargar respuestas:", err);
    } finally {
      setLoadingReplies(false);
    }
  };

  useEffect(() => {
    loadPosts().then(() => setLoading(false));
    const intervalo = setInterval(() => {
      loadPosts();
      if (selectedPost) {
        loadReplies(selectedPost.idPublicacion);
      }
    }, 10000);

    return () => clearInterval(intervalo);
  }, [selectedPost]);

  const handleViewThread = (post: any) => {
    setSelectedPost(post);
    loadReplies(post.idPublicacion);
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim()) {
      setError("El título no puede estar vacío");
      return;
    }
    if (!newPostContent.trim()) {
      setError("El contenido no puede estar vacío");
      return;
    }

    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      setError("Debes iniciar sesión para poder crear una publicación");
      return;
    }

    let idAutenticado: number;
    try {
      idAutenticado = JSON.parse(usuarioGuardado).id;
    } catch (e) {
      setError("Error de autenticación. Intenta iniciar sesión de nuevo.");
      return;
    }

    setCreatingPost(true);
    setError("");

    try {
      const newPublication = {
        titulo: newPostTitle,
        contenido: newPostContent,
        autor: { id: idAutenticado },
        padre: null
      };

      const created = await publicacionesAPI.create(newPublication);
      setPosts([created, ...posts]);
      setNewPostTitle("");
      setNewPostContent("");
      setShowNewPost(false);
    } catch (err) {
      console.error(err);
      setError("Error al crear la publicación en el servidor");
    } finally {
      setCreatingPost(false);
    }
  };

  const handleCreateReply = async () => {
    if (!newReplyContent.trim() || !selectedPost) return;

    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      setError("Debes iniciar sesión para responder");
      return;
    }

    let idAutenticado: number;
    try {
      idAutenticado = JSON.parse(usuarioGuardado).id;
    } catch (e) {
      return;
    }

    try {
      const replyPayload = {
        titulo: `Re: ${selectedPost.titulo || "Tema"}`,
        contenido: newReplyContent,
        autor: { id: idAutenticado },
        padre: { idPublicacion: selectedPost.idPublicacion } 
      };

      const createdReply = await publicacionesAPI.create(replyPayload);
      setReplies([...replies, createdReply]);
      setNewReplyContent("");
    } catch (err) {
      console.error("Error al responder:", err);
      setError("No se pudo enviar la respuesta");
    }
  };

  const handleLikePost = async (publicacionId: number | undefined) => {
    if (!publicacionId) return;
    try {
      const updatedPost = await publicacionesAPI.like(publicacionId);
      setPosts(posts.map(post => post.idPublicacion === publicacionId ? updatedPost : post));
      if (selectedPost?.idPublicacion === publicacionId) {
        setSelectedPost(updatedPost);
      }
    } catch (err) {
      console.error("No se pudo registrar el like:", err);
    }
  };

  const handleDeletePost = async (publicacionId: number | undefined, isReply = false) => {
    if (!publicacionId) return;
    try {
      await publicacionesAPI.delete(publicacionId);
      if (isReply) {
        setReplies(replies.filter(r => r.idPublicacion !== publicacionId));
      } else {
        setPosts(posts.filter(p => p.idPublicacion !== publicacionId));
        if (selectedPost?.idPublicacion === publicacionId) {
          setSelectedPost(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "Ahora";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    return date.toLocaleDateString("es-ES");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 px-6">
        
        <div className="lg:col-span-2 space-y-4">
          
          {selectedPost ? (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#007bff] transition-colors font-medium mb-2"
              >
                <ArrowLeft className="w-5 h-5" /> Volver al listado del foro
              </button>

              <div className="border-2 border-gray-900 p-6 bg-gray-50">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center flex-shrink-0 font-bold rounded">
                    {selectedPost.autor?.nombre?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{selectedPost.autor?.nombre} {selectedPost.autor?.apellidos}</span>
                      <span className="text-gray-500">· {formatDate(selectedPost.fechaCreacion)}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedPost.titulo}</h2>
                    <p className="text-gray-900 text-lg mb-4">{selectedPost.contenido}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                <h3 className="font-bold text-gray-900 text-lg">Respuestas ({replies.length})</h3>
                
                {loadingReplies ? (
                  <p className="text-sm text-gray-500">Cargando respuestas...</p>
                ) : replies.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No hay respuestas en este debate todavía. ¡Escribe la primera!</p>
                ) : (
                  replies.map((reply: any) => (
                    <div key={reply.idPublicacion} className="border-2 border-gray-200 p-4 bg-white">
                      <div className="flex gap-3">
                        <div className="w-9 h-9 bg-[#007bff] text-white flex items-center justify-center flex-shrink-0 text-sm font-semibold rounded">
                          {reply.autor?.nombre?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 text-sm">
                            <span className="font-semibold text-gray-900">{reply.autor?.nombre} {reply.autor?.apellidos}</span>
                            <span className="text-gray-400">· {formatDate(reply.fechaCreacion)}</span>
                          </div>
                          <p className="text-gray-800 text-sm">{reply.contenido}</p>
                          <div className="mt-2 flex justify-end gap-4 items-center">
                            <button 
                              onClick={() => handleLikePost(reply.idPublicacion)}
                              className="text-xs text-gray-500 hover:text-[#007bff] flex items-center gap-1"
                            >
                              <Heart className="w-3.5 h-3.5" /> <span>{reply.likes || 0}</span>
                            </button>
                            <button 
                              onClick={() => handleDeletePost(reply.idPublicacion, true)}
                              className="text-xs text-red-400 hover:text-red-600"
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

              <div className="border-2 border-gray-200 p-4 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    placeholder="Escribe una respuesta clara y respetuosa..."
                    className="flex-1 border-2 border-gray-200 p-3 focus:outline-none focus:border-gray-900 text-sm"
                  />
                  <button
                    onClick={handleCreateReply}
                    className="bg-gray-950 text-white px-4 hover:bg-gray-800 transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="border-2 border-gray-200 p-6">
                <button
                  onClick={() => setShowNewPost(!showNewPost)}
                  disabled={loading}
                  className="w-full bg-[#007bff] text-white py-3 font-semibold hover:bg-[#0056b3] transition-colors mb-4"
                >
                  Crear Publicación
                </button>

                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

                {showNewPost && (
                  <div className="border border-gray-200 p-4 mb-4 space-y-3">
                    <input
                      type="text"
                      value={newPostTitle}
                      onChange={(e) => { setNewPostTitle(e.target.value); setError(""); }}
                      placeholder="Título del nuevo tema o debate..."
                      disabled={creatingPost}
                      className="w-full border border-gray-300 p-3 focus:outline-none focus:border-[#007bff] text-sm font-semibold"
                    />
                    <textarea
                      value={newPostContent}
                      onChange={(e) => { setNewPostContent(e.target.value); setError(""); }}
                      placeholder="¿Qué quieres debatir o consultar con la comunidad?"
                      disabled={creatingPost}
                      className="w-full border border-gray-300 p-3 h-24 resize-none focus:outline-none focus:border-[#007bff] text-sm"
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleCreatePost}
                        disabled={creatingPost}
                        className="bg-[#007bff] text-white px-6 py-2 font-medium hover:bg-[#0056b3]"
                      >
                        {creatingPost ? "Publicando..." : "Publicar tema"}
                      </button>
                      <button onClick={() => { setShowNewPost(false); setNewPostTitle(""); setNewPostContent(""); }} className="bg-gray-200 text-gray-800 px-6 py-2">
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="border-2 border-gray-200 p-6 text-center text-gray-500">Cargando el foro...</div>
              ) : posts.length === 0 ? (
                <div className="border-2 border-gray-200 p-6 text-center text-gray-500">No hay hilos abiertos actualmente.</div>
              ) : (
                posts.map((post: any) => (
                  <div key={post.idPublicacion} className="border-2 border-gray-200 p-6 hover:border-gray-400 transition-all bg-white">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#007bff] text-white flex items-center justify-center flex-shrink-0 font-bold rounded">
                        {post.autor?.nombre?.charAt(0).toUpperCase() || "U"}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{post.autor?.nombre} {post.autor?.apellidos}</span>
                          <span className="text-gray-400 text-sm">@{post.autor?.email?.split("@")[0]}</span>
                          <span className="text-gray-400 text-sm">· {formatDate(post.fechaCreacion)}</span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1">{post.titulo}</h3>
                        <p className="text-gray-800 mb-4">{post.contenido}</p>

                        <div className="flex gap-8 text-gray-500">
                          <button 
                            onClick={() => handleLikePost(post.idPublicacion)}
                            className="flex items-center gap-2 hover:text-[#007bff]"
                          >
                            <Heart className="w-5 h-5" /> <span>{post.likes || 0}</span>
                          </button>
                          <button 
                            onClick={() => handleViewThread(post)}
                            className="flex items-center gap-2 text-[#007bff] font-semibold hover:underline"
                          >
                            <MessageCircle className="w-5 h-5" /> 
                            <span>Discutir / Responder</span>
                          </button>
                          <button className="flex items-center gap-2 hover:text-gray-700">
                            <Share2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.idPublicacion)}
                            className="text-red-400 hover:text-red-600 text-sm ml-auto"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="border-2 border-gray-200 p-6 sticky top-6 bg-white">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Temas en Tendencia</h2>
            <div className="space-y-4">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="hover:bg-gray-50 p-2 cursor-pointer transition-colors">
                  <div className="text-[#007bff] font-semibold">{topic.topic}</div>
                  <div className="text-sm text-gray-500">{topic.posts}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-gray-200 p-6 bg-white">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Orientadores Recomendados</h2>
            <div className="space-y-4">
              {["Elena Torres", "Pablo Jiménez", "Carmen Vega"].map((name, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">{name}</div>
                    <div className="text-xs text-gray-500">@{name.toLowerCase().replace(" ", "_")}</div>
                  </div>
                  <button className="bg-gray-900 text-white px-3 py-1 text-xs font-semibold hover:bg-gray-800">
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