import { useEffect, useState } from "react";
import { Heart, MessageCircle, Share2, User, ArrowLeft, Send, Sparkles, Trash2 } from "lucide-react"; 
import { Link } from "react-router";
import { publicacionesAPI } from "../services/apiClient";
import Swal from "sweetalert2"; 

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

  const [wikiData, setWikiData] = useState<any>(null);
  const [loadingWiki, setLoadingWiki] = useState(true);

  // Extrar los datos completos del usuario actual logueado en la app
  const usuarioGuardado = localStorage.getItem("usuario");
  let currentUserId: number | null = null;
  let currentUserRol: string | null = null; // Rol para saber si es ADMIN o USER

  if (usuarioGuardado) {
    try {
      const userObj = JSON.parse(usuarioGuardado);
      currentUserId = userObj.id;
      currentUserRol = userObj.rol;
    } catch (e) {
      console.error(e);
    }
  }

  const loadPosts = async () => {
    try {
      const data = await publicacionesAPI.getMainTopics();

      const sortedPosts = [...data].sort((a, b) => {
        const dateB = new Date(b.fechaCreacion || Date.now()).getTime();
        const dateA = new Date(a.fechaCreacion || Date.now()).getTime();
        return dateB - dateA;
      });

      setPosts(sortedPosts);
    } catch (err) {
      console.error("Error al cargar publicaciones:", err);
    }
  };

  const loadReplies = async (postId: number) => {
    forLoadReplies(postId);
  };

  const forLoadReplies = async (postId: number) => {
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
    const fetchWikipediaData = async () => {
      try {
        setLoadingWiki(true);
        const hoy = new Date();
        const mes = String(hoy.getMonth() + 1).padStart(2, "0");
        const dia = String(hoy.getDate()).padStart(2, "0");

        const response = await fetch(
          `https://es.wikipedia.org/api/rest_v1/feed/onthisday/selected/${mes}/${dia}`
        );
        if (!response.ok) throw new Error();

        const data = await response.json();
        if (data.selected && data.selected.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(data.selected.length, 5));
          setWikiData(data.selected[randomIndex]);
        }
      } catch (err) {
        console.error("Error cargando Wikipedia:", err);
      } finally {
        setLoadingWiki(false);
      }
    };

    fetchWikipediaData();
  }, []);

  useEffect(() => {
    loadPosts().then(() => setLoading(false));
    const intervalo = setInterval(() => {
      loadPosts();
      if (selectedPost) {
        forLoadReplies(selectedPost.idPublicacion);
      }
    }, 10000);

    return () => clearInterval(intervalo);
  }, [selectedPost]);

  const handleViewThread = (post: any) => {
    setSelectedPost(post);
    forLoadReplies(post.idPublicacion);
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
    if (!currentUserId) {
      setError("Debes iniciar sesión para poder crear una publicación");
      return;
    }

    setCreatingPost(true);
    setError("");

    try {
      const newPublication = {
        titulo: newPostTitle,
        contenido: newPostContent,
        autor: { id: currentUserId },
        padre: null
      };

      const created = await publicacionesAPI.create(newPublication);
      setPosts([created, ...posts]);
      setNewPostTitle("");
      setNewPostContent("");
      setShowNewPost(false);
    } catch (err) {
      console.error(err);
      setError("Error al crear la publicación. ");
    } finally {
      setCreatingPost(false);
    }
  };

  const handleCreateReply = async () => {
    if (!newReplyContent.trim() || !selectedPost) return;
    if (!currentUserId) {
      setError("Debes iniciar sesión para responder");
      return;
    }

    try {
      const replyPayload = {
        titulo: `Re: ${selectedPost.titulo || "Tema"}`,
        contenido: newReplyContent,
        autor: { id: currentUserId },
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

  //FUNCIÓN DE ADMINISTRACIÓN DEL FORO POR PARTE DEL ADMIN
  const handleDeletePost = async (publicacionId: number | undefined, isReply = false) => {
    if (!publicacionId) return;

    const textoConfirmacion = currentUserRol === "ADMIN"
      ? "Como administrador, tienes permisos de moderación para eliminar esta publicación."
      : "Esta acción eliminará de forma permanente la publicación del foro.";

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: textoConfirmacion,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

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
      Swal.fire("¡Eliminado!", "La publicación ha sido borrada.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar la publicación del servidor.", "error");
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
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 px-4 sm:px-6">

        {/* COLUMNA PRINCIPAL DEL FORO */}
        <div className="lg:col-span-2 space-y-4 min-w-0">
          {selectedPost ? (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-[#007bff] transition-colors font-medium mb-2"
              >
                <ArrowLeft className="w-5 h-5" /> Volver al listado del foro
              </button>

              <div className="border-2 border-gray-900 p-4 sm:p-6 bg-gray-50 overflow-hidden">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 text-white flex items-center justify-center flex-shrink-0 font-bold rounded text-sm sm:text-base">
                    {selectedPost.autor?.nombre?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
                        <span className="font-semibold text-gray-900 break-all">{selectedPost.autor?.nombre} {selectedPost.autor?.apellidos}</span>
                        <span className="text-gray-500">· {formatDate(selectedPost.fechaCreacion)}</span>
                        {/* Etiqueta distintiva si el autor de este post es admin */}
                        {selectedPost.autor?.rol === "ADMIN" && <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.2 font-black uppercase rounded">Admin</span>}
                      </div>

                      {/* Botón de borrar si eres el que publica O si eres ADMIN */}
                      {currentUserId && (selectedPost.autor?.id === currentUserId || currentUserRol === "ADMIN") && (
                        <button
                          onClick={() => handleDeletePost(selectedPost.idPublicacion)}
                          className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 self-start sm:self-auto bg-red-50 px-2 py-1 border border-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          {currentUserRol === "ADMIN" && selectedPost.autor?.id !== currentUserId ? "Moderar debate" : "Eliminar debate"}
                        </button>
                      )}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 break-words">{selectedPost.titulo}</h2>
                    <p className="text-gray-900 text-sm sm:text-lg mb-4 break-words whitespace-pre-line">{selectedPost.contenido}</p>
                  </div>
                </div>
              </div>

              {/* Listado de Respuestas */}
              <div className="space-y-4 pl-3 sm:pl-6 border-l-2 border-gray-200 min-w-0">
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">Respuestas ({replies.length})</h3>
                {loadingReplies ? (
                  <p className="text-sm text-gray-500">Cargando respuestas...</p>
                ) : replies.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No hay respuestas en esta publicación todavía. ¡Escribe la primera!</p>
                ) : (
                  replies.map((reply: any) => (
                    <div key={reply.idPublicacion} className="border-2 border-gray-200 p-3 sm:p-4 bg-white overflow-hidden">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#007bff] text-white flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-semibold rounded">
                          {reply.autor?.nombre?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-gray-900 break-all">{reply.autor?.nombre} {reply.autor?.apellidos}</span>
                              {reply.autor?.rol === "ADMIN" && <span className="bg-red-100 text-red-700 text-[9px] px-1 py-0.2 font-bold uppercase rounded">Admin</span>}
                            </div>
                            <span className="text-gray-400">· {formatDate(reply.fechaCreacion)}</span>
                          </div>
                          <p className="text-gray-800 text-xs sm:text-sm break-words whitespace-pre-line">{reply.contenido}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <button
                              onClick={() => handleLikePost(reply.idPublicacion)}
                              className="text-xs text-gray-500 hover:text-[#007bff] flex items-center gap-1.5"
                            >
                              <Heart className="w-3.5 h-3.5" /> <span>{reply.likes || 0}</span>
                            </button>

                            {/* El admin puede borrar cualquier comentario del foro */}
                            {currentUserId && (reply.autor?.id === currentUserId || currentUserRol === "ADMIN") && (
                              <button
                                onClick={() => handleDeletePost(reply.idPublicacion, true)}
                                className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-0.5 hover:underline"
                              >
                                <Trash2 className="w-3 h-3" /> Borrar
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Input para responder */}
              <div className="border-2 border-gray-200 p-3 bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    placeholder="Escribe una respuesta clara y respetuosa..."
                    className="flex-1 border-2 border-gray-200 p-2 sm:p-3 focus:outline-none focus:border-gray-900 text-xs sm:text-sm"
                  />
                  <button
                    onClick={handleCreateReply}
                    className="bg-gray-950 text-white px-3 sm:px-4 hover:bg-gray-800 transition-colors flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* VISTA GENERAL: LISTADO DE POSTS */}
              <div className="border-2 border-gray-200 p-4 sm:p-6">
                <button
                  onClick={() => setShowNewPost(!showNewPost)}
                  disabled={loading}
                  className="w-full bg-[#007bff] text-white py-3 font-semibold hover:bg-[#0056b3] transition-colors mb-4 text-sm sm:text-base"
                >
                  Crear Publicación
                </button>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-red-200 whitespace-normal break-words">
                    <span className="break-words">{error}</span>
                    {error.includes("iniciar sesión") && (
                      <Link to="/registro" className="text-[#007bff] font-bold hover:underline shrink-0">
                        Regístrate aquí ↗
                      </Link>
                    )}
                  </div>
                )}

                {showNewPost && (
                  <div className="border border-gray-200 p-4 mb-4 space-y-3">
                    <input
                      type="text"
                      value={newPostTitle}
                      onChange={(e) => { setNewPostTitle(e.target.value); setError(""); }}
                      placeholder="Título del nuevo tema o debate..."
                      disabled={creatingPost}
                      className="w-full border border-gray-300 p-3 focus:outline-none focus:border-[#007bff] text-xs sm:text-sm  font-semibold"
                    />
                    <textarea
                      value={newPostContent}
                      onChange={(e) => { setNewPostContent(e.target.value); setError(""); }}
                      placeholder="¿Qué quieres debatir o consultar con la comunidad?"
                      disabled={creatingPost}
                      className="w-full border border-gray-300 p-3 h-24 resize-none focus:outline-none focus:border-[#007bff] text-xs sm:text-sm "
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleCreatePost}
                        disabled={creatingPost}
                        className="bg-[#007bff] text-white px-4 sm:px-6 py-2 font-medium hover:bg-[#0056b3] text-xs sm:text-sm"
                      >
                        {creatingPost ? "Publicando..." : "Publicar tema"}
                      </button>
                      <button onClick={() => { setShowNewPost(false); setNewPostTitle(""); setNewPostContent(""); }} className="bg-gray-200 text-gray-800 px-4 sm:px-6 py-2 text-xs sm:text-sm">
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {loading ? (
                <div className="border-2 border-gray-200 p-6 text-center text-gray-500 text-sm">Cargando el foro...</div>
              ) : posts.length === 0 ? (
                <div className="border-2 border-gray-200 p-6 text-center text-gray-500 text-sm">No hay hilos abiertos actualmente.</div>
              ) : (
                posts.map((post: any) => (
                  <div key={post.idPublicacion} className="border-2 border-gray-200 p-4 sm:p-6 hover:border-gray-400 transition-all bg-white overflow-hidden">
                    <div className="flex gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#007bff] text-white flex items-center justify-center flex-shrink-0 font-bold rounded text-sm sm:text-base">
                        {post.autor?.nombre?.charAt(0).toUpperCase() || "U"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1 text-xs sm:text-sm">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                            <span className="font-semibold text-gray-900 break-all">{post.autor?.nombre} {post.autor?.apellidos}</span>
                            <span className="text-gray-400 break-all">@{post.autor?.email?.split("@")[0]}</span>
                            <span className="text-gray-400">· {formatDate(post.fechaCreacion)}</span>
                            {post.autor?.rol === "ADMIN" && <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.2 font-black uppercase rounded">Admin</span>}
                          </div>

                          {/* Botón perimetral directo de borrado para el admin en el listado general */}
                          {currentUserId && (post.autor?.id === currentUserId || currentUserRol === "ADMIN") && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Evita que al pulsar se abra el hilo por error
                                handleDeletePost(post.idPublicacion);
                              }}
                              className="text-red-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors"
                              title="Eliminar debate"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 break-words">{post.titulo}</h3>
                        <p className="text-gray-800 text-xs sm:text-sm mb-4 break-words line-clamp-3 whitespace-pre-line">{post.contenido}</p>

                        <div className="flex flex-wrap gap-4 sm:gap-8 text-gray-500 items-center text-xs sm:text-sm">
                          <button
                            onClick={() => handleLikePost(post.idPublicacion)}
                            className="flex items-center gap-1.5 hover:text-[#007bff]"
                          >
                            <Heart className="w-4 h-4 sm:w-5 h-5" /> <span>{post.likes || 0}</span>
                          </button>
                          <button
                            onClick={() => handleViewThread(post)}
                            className="flex items-center gap-1.5 text-[#007bff] font-semibold hover:underline"
                          >
                            <MessageCircle className="w-4 h-4 sm:w-5 h-5" />
                            <span>Responder ({post.numRespuestas || 0})</span>
                          </button>
                          <button className="flex items-center gap-1.5 hover:text-gray-700">
                            <Share2 className="w-4 h-4 sm:w-5 h-5" />
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

        {/* COLUMNA LATERAL WIKIPEDIA */}
        <div className="space-y-6 min-w-0">
          <div className="border-2 border-gray-200 p-4 sm:p-6 sticky top-6 bg-white overflow-hidden">
            <div className="flex items-center gap-2 text-gray-900 mb-3">
              <Sparkles className="w-5 h-5 text-[#007bff]" />
              <h2 className="text-lg sm:text-xl font-bold">Un día como hoy...</h2>
            </div>

            <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider font-semibold">
              Tu dato aleatorio del día
            </p>

            {loadingWiki ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-100 w-1/4"></div>
                <div className="h-20 bg-gray-100 w-full"></div>
              </div>
            ) : wikiData ? (
              <div className="space-y-4">
                <div className="inline-block bg-blue-50 text-[#007bff] text-xs font-bold px-2.5 py-1 rounded">
                  Año {wikiData.year}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium break-words">
                  {wikiData.text}
                </p>

                {wikiData.pages && wikiData.pages[0] && (
                  <div className="border-t pt-4 mt-2">
                    <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">Artículo recomendado</p>
                    <a
                      href={wikiData.pages[0].content_urls.desktop.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 border border-gray-100 hover:border-[#007bff] hover:bg-gray-50 transition-colors group min-w-0"
                    >
                      <div className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#007bff] transition-colors line-clamp-1 break-words">
                        {wikiData.pages[0].titles.normalized}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-normal break-words">
                        {wikiData.pages[0].extract || "Haz clic para leer el artículo completo en Wikipedia."}
                      </p>
                      <span className="inline-block text-[11px] text-[#007bff] font-semibold mt-2 group-hover:underline">
                        Saber más en Wikipedia ↗
                      </span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic">No se ha podido cargar el evento histórico de hoy.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}