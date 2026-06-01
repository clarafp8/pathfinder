import { useState } from "react";
import { Heart, MessageCircle, Share2, User } from "lucide-react";

const initialPosts = [
  {
    id: 1,
    user: "María García",
    username: "@maria_gcr",
    avatar: "MG",
    time: "2h",
    content: "¡Acabo de aprobar Selectividad con un 12.5! Rumbo a Medicina en la UCM 🎓💙",
    likes: 45,
    replies: 8,
    shares: 3,
  },
  {
    id: 2,
    user: "Carlos Ruiz",
    username: "@carlos_r",
    avatar: "CR",
    time: "4h",
    content: "¿Alguien tiene experiencia con el grado de Ingeniería Informática? Estoy entre la UAM y la UPM. Consejos please!",
    likes: 23,
    replies: 15,
    shares: 2,
  },
  {
    id: 3,
    user: "Ana López",
    username: "@ana_lpz",
    avatar: "AL",
    time: "6h",
    content: "Primer día en la universidad y ya me he perdido 3 veces 😅 Pero el ambiente es increíble!",
    likes: 67,
    replies: 12,
    shares: 5,
  },
  {
    id: 4,
    user: "David Martín",
    username: "@david_m",
    avatar: "DM",
    time: "8h",
    content: "Tips para el test vocacional: sed honestos con vosotros mismos. Yo elegí una carrera por presión familiar y tuve que cambiar. Ahora en Psicología y feliz 🙌",
    likes: 89,
    replies: 24,
    shares: 18,
  },
  {
    id: 5,
    user: "Laura Sánchez",
    username: "@laura_s",
    avatar: "LS",
    time: "10h",
    content: "¿Nota de corte de Arquitectura en la ETSAM? He sacado un 11.2 y estoy nerviosa 😬",
    likes: 31,
    replies: 19,
    shares: 1,
  },
];

const trendingTopics = [
  { topic: "#Selectividad2026", posts: "12.5K posts" },
  { topic: "#NotasDeCorte", posts: "8.3K posts" },
  { topic: "#VidaUniversitaria", posts: "5.7K posts" },
  { topic: "#TestVocacional", posts: "4.2K posts" },
  { topic: "#Erasmus", posts: "3.1K posts" },
];

export function Forum() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost = {
      id: posts.length + 1,
      user: "Usuario Actual",
      username: "@usuario",
      avatar: "UC",
      time: "Ahora",
      content: newPostContent,
      likes: 0,
      replies: 0,
      shares: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setShowNewPost(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-6 px-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="border-2 border-gray-200 p-6">
            <button
              onClick={() => setShowNewPost(!showNewPost)}
              className="w-full bg-[#007bff] text-white py-3 hover:bg-[#0056b3] transition-colors mb-4"
            >
              Crear Publicación
            </button>

            {showNewPost && (
              <div className="border border-gray-200 p-4 mb-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="¿Qué quieres compartir?"
                  className="w-full border border-gray-300 p-3 h-24 resize-none focus:outline-none focus:border-[#007bff]"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleCreatePost}
                    className="bg-[#007bff] text-white px-6 py-2 hover:bg-[#0056b3] transition-colors"
                  >
                    Publicar
                  </button>
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="bg-gray-200 text-gray-800 px-6 py-2 hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>

          {posts.map((post) => (
            <div key={post.id} className="border-2 border-gray-200 p-6 hover:border-gray-300 transition-colors">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#007bff] text-white flex items-center justify-center flex-shrink-0">
                  {post.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{post.user}</span>
                    <span className="text-gray-500">{post.username}</span>
                    <span className="text-gray-500">· {post.time}</span>
                  </div>

                  <p className="text-gray-800 mb-4">{post.content}</p>

                  <div className="flex gap-8 text-gray-600">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 hover:text-[#007bff] transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-[#007bff] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.replies}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-[#007bff] transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
                  <div className="w-10 h-10 bg-gray-300 flex items-center justify-center">
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
