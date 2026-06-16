import React, { useState } from "react";
import { usuariosAPI, Usuario } from "../services/apiClient";
import { provinciasList } from "../services/provincias";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

interface Props {
  onSuccess?: (u: Usuario) => void;
}

export default function Registro({ onSuccess }: Props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    password: "",
    confirmPassword: "",
    provincia: "",
    fechaNac: "",
    terminos: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Email inválido";
    if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (!formData.terminos) newErrors.terminos = "Debes aceptar los términos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const nuevo = {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        password: formData.password,
        provincia: formData.provincia,
        fechaNac: formData.fechaNac,
      };

      const creado = await usuariosAPI.create(nuevo as Usuario);

      try {
        localStorage.setItem("usuario", JSON.stringify(creado));
      } catch (err) {
        console.warn(err);
      }

      Swal.fire({
        title: "¡Registro Completado!",
        text: "Tu cuenta en PathFinder ha sido creada con éxito. Se ha iniciado sesión automáticamente.",
        icon: "success",
        confirmButtonColor: "#007bff",
        confirmButtonText: "Ver mis resultados",
      }).then(() => {
        if (onSuccess) onSuccess(creado as Usuario);
        navigate(-1);
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error al registrar",
        text: "El correo electrónico introducido ya se encuentra en uso o el servidor de Azure no responde.",
        icon: "error",
        confirmButtonColor: "#007bff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border px-2 py-1 focus:outline-none focus:border-[#007bff]" />
        {errors.nombre && <div className="text-red-600 text-sm">{errors.nombre}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Apellidos</label>
        <input name="apellidos" value={formData.apellidos} onChange={handleChange} className="w-full border px-2 py-1 focus:outline-none focus:border-[#007bff]" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full border px-2 py-1 focus:outline-none focus:border-[#007bff]" />
        {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Provincia</label>
        <input
          name="provincia"
          list="provincias-api-list"
          value={formData.provincia}
          onChange={handleChange}
          className="w-full border px-2 py-1 focus:outline-none focus:border-[#007bff]"
          placeholder="Provincia..."
        />
        <datalist id="provincias-api-list">
          {provinciasList.map((prov) => (
            <option key={prov.id} value={prov.nm} />
          ))}
        </datalist>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
        <input name="fechaNac" type="date" value={formData.fechaNac} onChange={handleChange} className="w-full border px-2 py-1 focus:outline-none focus:border-[#007bff]" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} className="w-full border px-2 py-1 focus:outline-none focus:border-[#007bff]" />
        {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full border px-2 py-1 focus:outline-none focus:border-[#007bff]" />
        {errors.confirmPassword && <div className="text-red-600 text-sm">{errors.confirmPassword}</div>}
      </div>

      <label className="flex items-center gap-2 pt-2">
        <input name="terminos" type="checkbox" checked={formData.terminos} onChange={handleChange} />
        <span className="text-sm text-gray-600">Acepto los términos y condiciones</span>
      </label>
      {errors.terminos && <div className="text-red-600 text-sm">{errors.terminos}</div>}

      <div className="pt-2">
        <button type="submit" disabled={loading} className="w-full bg-[#007bff] text-white py-2 font-medium hover:bg-[#0056b3] transition-colors disabled:bg-gray-400">
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </div>

      <p className="text-sm text-center text-gray-600 pt-3 border-t border-gray-100">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-[#007bff] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer"
        >
          Inicia sesión
        </button>
      </p>
    </form>
  );
}