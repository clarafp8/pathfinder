import React, { useState } from "react";
import { usuariosAPI, Usuario } from "../services/apiClient";

interface Props {
  usuario: Usuario;
  onNavigate?: (path: string) => void;
  onUpdateSuccess?: (u: Usuario) => void;
}

export default function PerfilUsuario({ usuario, onNavigate, onUpdateSuccess }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Usuario>({ ...usuario });

  const calcularEdad = (fechaNacimiento?: string) => {
    if (!fechaNacimiento) return "No especificada";
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) edad--;
    return edad > 0 ? `${edad} años` : "Menos de 1 año";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value } as Usuario));
  };

  const handleSave = async () => {
    if (!usuario.id) return alert("Usuario sin id");
    try {
      const updated = await usuariosAPI.update(usuario.id, formData);
      alert("¡Perfil actualizado!");
      setIsEditing(false);
      if (onUpdateSuccess) onUpdateSuccess(updated);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el perfil");
    }
  };

  return (
    <div className="p-4 border rounded">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Mi Perfil</h2>
        <div className="flex gap-2">
          <button onClick={() => onNavigate && onNavigate("/")} className="text-sm text-gray-600">Volver</button>
          {!isEditing && <button onClick={() => setIsEditing(true)} className="bg-[#007bff] text-white px-3 py-1">Editar</button>}
        </div>
      </div>

      {!isEditing ? (
        <div>
          <p className="font-semibold">{formData.nombre} {formData.apellidos}</p>
          <p>{formData.email}</p>
          <p>Provincia: {formData.provincia || 'No especificada'}</p>
          <p>Fecha de Nacimiento: {formData.fechaNac || 'No especificada'}</p>
          <p>Edad: {calcularEdad(formData.fechaNac)}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-sm">Nombre</label>
            <input name="nombre" value={formData.nombre || ''} onChange={handleChange} className="w-full border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">Apellidos</label>
            <input name="apellidos" value={formData.apellidos || ''} onChange={handleChange} className="w-full border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">Provincia</label>
            <input name="provincia" value={formData.provincia || ''} onChange={handleChange} className="w-full border px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">Fecha de Nacimiento</label>
            <input name="fechaNac" type="date" value={formData.fechaNac || ''} onChange={handleChange} className="w-full border px-2 py-1" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-[#007bff] text-white px-4 py-2">Guardar</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-200 px-4 py-2">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
