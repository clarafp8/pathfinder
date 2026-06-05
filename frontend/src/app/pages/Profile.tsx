import { useState } from "react";
import { useNavigate } from "react-router";
import { usuariosAPI, Usuario } from "../services/apiClient";
import PerfilUsuario from "../components/PerfilUsuario";

export function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editing, setEditing] = useState(false);

  const handleLoad = async () => {
    if (!email) return alert("Introduce un correo para cargar el perfil");
    setLoading(true);
    try {
      const u = await usuariosAPI.getByEmail(encodeURIComponent(email));
      if (!u) return alert("Usuario no encontrado");
      setUsuario(u);
    } catch (err) {
      console.error(err);
      alert("Error al cargar usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!usuario) return;
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value } as Usuario);
  };

  const handleSave = async () => {
    if (!usuario?.id) return alert("Usuario sin id");
    setLoading(true);
    try {
      const updated = await usuariosAPI.update(usuario.id, usuario);
      setUsuario(updated);
      setEditing(false);
      alert("Perfil actualizado");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="border-2 border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Mi Perfil</h1>
            <button onClick={() => navigate("/")} className="text-sm text-gray-600 hover:underline">Volver</button>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-700 mb-2">Correo electrónico</label>
            <div className="flex gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@correo.com"
                className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
              />
              <button onClick={handleLoad} disabled={loading} className="bg-[#007bff] text-white px-4 py-2">Cargar</button>
            </div>
          </div>

          {usuario && (
            <PerfilUsuario usuario={usuario} onNavigate={(p) => navigate(p)} onUpdateSuccess={(u) => setUsuario(u)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
