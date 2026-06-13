import React, { useState, useEffect } from "react";
import { usuariosAPI, Usuario } from "../services/apiClient";

interface Props {
  usuario: Usuario;
  onNavigate?: (path: string) => void;
  onUpdateSuccess?: (u: Usuario) => void;
}

export default function PerfilUsuario({ usuario, onNavigate, onUpdateSuccess }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Usuario>({ ...usuario });
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);

  useEffect(() => {
    setFormData({ ...usuario });
  }, [usuario]);

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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as Usuario));
  };

  const handleSave = async () => {
    if (!usuario.id) return alert("Usuario sin ID válido");
    try {
      const updated = await usuariosAPI.update(usuario.id, formData, archivoSeleccionado || undefined);
      alert("¡Perfil actualizado con éxito!");
      setIsEditing(false);
      setArchivoSeleccionado(null);
      if (onUpdateSuccess) onUpdateSuccess(updated);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el perfil");
    }
  };

  return (
    <div className="border border-gray-200 bg-white shadow-sm mt-4">
      
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-[#007bff] text-white text-2xl font-black shadow-sm shrink-0">
            {formData.fotoUrl ? (
              <img 
                src={`https://pathfinder.switzerlandnorth.cloudapp.azure.com${formData.fotoUrl}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span>{formData.nombre ? formData.nombre[0].toUpperCase() : "U"}</span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {formData.nombre || "Usuario"} {formData.apellidos || ""}
            </h2>
            <p className="text-sm text-gray-500">{formData.email}</p>
          </div>
        </div>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:border-[#007bff] hover:text-[#007bff] transition-all"
          >
            ✎ Editar Perfil
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="p-6 space-y-6">
          
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#007bff] mb-4 pb-1 border-b border-gray-100">
              Datos Personales
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 border border-gray-100">
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Provincia</label>
                <p className="text-sm font-medium text-gray-800">{formData.provincia || "No especificada"}</p>
              </div>
              <div className="bg-gray-50 p-3 border border-gray-100">
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Fecha de Nacimiento</label>
                <p className="text-sm font-medium text-gray-800">{formData.fechaNac || "No especificada"}</p>
              </div>
              <div className="bg-gray-50 p-3 border border-gray-100">
                <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Edad </label>
                <p className="text-sm font-medium text-gray-800">{calcularEdad(formData.fechaNac)}</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#007bff] mb-3 pb-1 border-b border-gray-100">
              Biografía
            </h3>
            <div className="bg-gray-50 p-4 border border-gray-100 text-sm text-gray-700 leading-relaxed min-h-[60px]">
              {formData.bio || <span className="text-gray-400 italic">No has añadido una biografía todavía.</span>}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#007bff] mb-3 pb-1 border-b border-gray-100">
              Intereses Académicos
            </h3>
            <div className="bg-gray-50 p-4 border border-gray-100 text-sm text-gray-700 min-h-[40px]">
              {formData.intereses || <span className="text-gray-400 italic">No has especificado tus intereses académicos.</span>}
            </div>
          </section>

        </div>
      ) : (
        
        <form className="p-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#007bff]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Provincia</label>
              <input
                type="text"
                name="provincia"
                value={formData.provincia || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#007bff]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNac"
                value={formData.fechaNac || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Foto de Perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setArchivoSeleccionado(e.target.files[0]);
                }
              }}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:uppercase file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Biografía</label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio || ''}
              onChange={handleChange}
              placeholder="Cuéntanos un poco sobre ti..."
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#007bff] resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Intereses</label>
            <textarea
              name="intereses"
              rows={2}
              value={formData.intereses || ''}
              onChange={handleChange}
              placeholder="Ej. Ingeniería Informática, Inteligencia Artificial..."
              className="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-[#007bff] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setFormData({ ...usuario });
                setArchivoSeleccionado(null);
                setIsEditing(false);
              }}
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-[#007bff] text-white hover:bg-[#0056b3] transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      )}
    </div>
  );
}