import React, { useState } from "react";
import { useNavigate } from "react-router";
import { usuariosAPI, Usuario } from "../services/apiClient";

interface Props {
  onClose?: () => void;
  onLoginSuccess: (u: Usuario) => void;
}

export default function Login({ onClose, onLoginSuccess }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email y contraseña son requeridos");
      return;
    }

    setLoading(true);
    try {
      const correo = encodeURIComponent(email.trim());
      const usuario = await usuariosAPI.getByEmail(correo);
      if (!usuario) {
        setError("El usuario no existe");
        return;
      }

      if ((usuario.password || "").trim() !== password.trim()) {
        setError("Contraseña incorrecta");
        return;
      }

      try {
        localStorage.setItem("usuario", JSON.stringify(usuario));
      } catch (err) {
        console.warn(err);
      }

      onLoginSuccess(usuario);
      if (onClose) onClose();
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="mb-2 p-2 bg-red-100 text-red-700">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#007bff]"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#007bff] text-white py-2 hover:bg-[#0056b3] disabled:opacity-60"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </div>
      </form>
    </div>
  );
}