import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Users, GraduationCap, Trash2, Plus, ShieldAlert, Edit2, X } from "lucide-react";
import { usuariosAPI, titulacionesAPI } from "../services/apiClient";
import Swal from "sweetalert2";

export function PanelAdmin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"usuarios" | "titulaciones">("usuarios");

    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [titulaciones, setTitulaciones] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para formularios de creación
    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [newUser, setNewUser] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        password: "",
        provincia: "",
        bio: "",
        intereses: ""
    });

    const [newTitulacion, setNewTitulacion] = useState({
        nombre: "",
        tipo: "Grado Universitario",
        notaCorte: "",
        idRama: 6,
    });

    // Estados para formularios de edición/actualización
    const [editingUsuario, setEditingUsuario] = useState<any | null>(null);
    const [editingTitulacion, setEditingTitulacion] = useState<any | null>(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (!usuarioGuardado) {
            navigate("/");
            return;
        }
        try {
            const user = JSON.parse(usuarioGuardado);
            if (user.rol !== "ADMIN") {
                Swal.fire({
                    title: "Acceso denegado",
                    text: "No tienes permisos de administrador para ver esta sección.",
                    icon: "error",
                    confirmButtonColor: "#007bff",
                });
                navigate("/");
            }
        } catch (e) {
            navigate("/");
        }
    }, [navigate]);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            if (activeTab === "usuarios") {
                const data = await usuariosAPI.getAll();
                setUsuarios(data);
            } else {
                const data = await titulacionesAPI.getAll();
                setTitulaciones(data);
            }
        } catch (err) {
            console.error("Error al cargar datos de administración:", err);
        } finally {
            boxLoading(false);
        }
    };

    const boxLoading = (val: boolean) => {
        setLoading(val);
    };

    useEffect(() => {
        cargarDatos();
    }, [activeTab]);

    // ==================== OPERACIONES DE USUARIOS ====================

    const handleCreateUsuario = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUser.nombre.trim() || !newUser.email.trim() || !newUser.password.trim()) {
            Swal.fire("Error", "Nombre, Email y Contraseña son obligatorios.", "error");
            return;
        }

        try {
            const creado = await usuariosAPI.create(newUser);
            setUsuarios([creado, ...usuarios]);
            setShowCreateUserModal(false);
            setNewUser({ nombre: "", apellidos: "", email: "", password: "", provincia: "", bio: "", intereses: "" });
            Swal.fire("¡Creado!", "El usuario ha sido registrado con éxito.", "success");
        } catch (err) {
            Swal.fire("Error", "No se pudo crear el usuario en el servidor.", "error");
        }
    };

    const handleUpdateUsuario = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUsuario.id) return;

        try {
            const actualizado = await usuariosAPI.update(editingUsuario.id, editingUsuario);
            setUsuarios(usuarios.map((u) => (u.id === editingUsuario.id ? actualizado : u)));
            setEditingUsuario(null);
            Swal.fire("¡Actualizado!", "Los datos del usuario han sido actualizados.", "success");
        } catch (err) {
            Swal.fire("Error", "No se pudieron guardar los cambios del usuario.", "error");
        }
    };

    const handleEliminarUsuario = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará al usuario permanentemente del sistema junto a todas sus publicaciones del foro.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await usuariosAPI.delete(id);
                setUsuarios(usuarios.filter((u) => u.id !== id));
                Swal.fire("Eliminado", "El usuario ha sido borrado correctamente.", "success");
            } catch (err) {
                Swal.fire("Error", "No se pudo eliminar al usuario.", "error");
            }
        }
    };

    // ==================== OPERACIONES DE TITULACIONES ====================

    const handleCreateTitulacion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitulacion.nombre.trim()) return;

        try {
            const payload = {
                nombre: newTitulacion.nombre,
                tipo: newTitulacion.tipo,
                notaCorte: newTitulacion.notaCorte ? parseFloat(newTitulacion.notaCorte) : null,
                rama: { idRama: newTitulacion.idRama }
            };

            const creada = await titulacionesAPI.create(payload);
            setTitulaciones([creada, ...titulaciones]);
            setNewTitulacion({ nombre: "", tipo: "Grado Universitario", notaCorte: "", idRama: 6 });
            Swal.fire("¡Creada!", "La titulación se ha añadido a la base de datos.", "success");
        } catch (err) {
            Swal.fire("Error", "No se pudo dar de alta la titulación.", "error");
        }
    };

    const handleUpdateTitulacion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTitulacion.idTitulacion) return;

        try {
            const payload = {
                idTitulacion: editingTitulacion.idTitulacion,
                nombre: editingTitulacion.nombre,
                tipo: editingTitulacion.tipo,
                notaCorte: editingTitulacion.notaCorte ? parseFloat(editingTitulacion.notaCorte) : null,
                rama: { idRama: editingTitulacion.idRama || editingTitulacion.rama?.idRama }
            };

            const actualizada = await titulacionesAPI.create(payload);
            setTitulaciones(titulaciones.map((t) => (t.idTitulacion === editingTitulacion.idTitulacion ? actualizada : t)));
            setEditingTitulacion(null);
            Swal.fire("¡Actualizada!", "La oferta académica ha sido modificada con éxito.", "success");
        } catch (err) {
            Swal.fire("Error", "No se pudo actualizar la titulación.", "error");
        }
    };

    const handleEliminarTitulacion = async (id: number) => {
        try {
            await titulacionesAPI.delete(id);
            setTitulaciones(titulaciones.filter((t) => t.idTitulacion !== id));
            Swal.fire("Eliminada", "Titulación dada de baja.", "success");
        } catch (err) {
            Swal.fire("Error", "No se pudo borrar.", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Siderbar / Barra superior */}
            <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 shrink-0">
                <div className="flex items-center gap-2 text-gray-900 mb-4 md:mb-6 pb-4 border-b border-gray-100">
                    <ShieldAlert className="w-6 h-6 text-[#007bff]" />
                    <h1 className="font-bold text-lg tracking-tight">Panel de Control</h1>
                </div>

                <nav className="flex flex-row md:flex-col gap-2">
                    <button
                        onClick={() => setActiveTab("usuarios")}
                        className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 text-sm font-semibold border-2 transition-all duration-150 ${activeTab === "usuarios"
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                    >
                        <Users className="w-4 h-4" />
                        <span>Usuarios</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("titulaciones")}
                        className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-3 px-4 py-3 text-sm font-semibold border-2 transition-all duration-150 ${activeTab === "titulaciones"
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            }`}
                    >
                        <GraduationCap className="w-4 h-4" />
                        <span>Titulaciones</span>
                    </button>
                </nav>
            </div>

            {/* Contenido Principal */}
            <div className="flex-1 p-4 sm:p-6 md:p-10 max-w-5xl min-w-0">
                {loading ? (
                    <div className="text-center py-20 text-gray-500 animate-pulse font-medium">
                        Sincronizando con el servidor de la base de datos...
                    </div>
                ) : activeTab === "usuarios" ? (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
                                <p className="text-sm text-gray-500">Administra las credenciales, registros y accesos a la plataforma.</p>
                            </div>
                            <button
                                onClick={() => setShowCreateUserModal(true)}
                                className="w-full sm:w-auto bg-[#007bff] text-white font-bold text-sm px-4 py-2.5 hover:bg-[#0056b3] transition-colors flex items-center justify-center gap-1.5 shrink-0"
                            >
                                <Plus className="w-4 h-4" /> Registrar Usuario
                            </button>
                        </div>

                        {/* VISTA MÓVIL: Tarjetas */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {usuarios.map((u) => (
                                <div key={u.id} className="bg-white border-2 border-gray-200 p-4 space-y-2">
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <span className="font-mono text-xs text-gray-400">#{u.id}</span>
                                        <div className="flex gap-1">
                                            <button onClick={() => setEditingUsuario(u)} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleEliminarUsuario(u.id)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">👤 {u.nombre} {u.apellidos}</p>
                                    <p className="text-xs text-gray-600">✉️ {u.email}</p>
                                    <p className="text-xs text-gray-500">📍 {u.provincia || "No indicada"}</p>
                                </div>
                            ))}
                        </div>

                        {/* VISTA ESCRITORIO: Tabla tradicional */}
                        <div className="hidden md:block bg-white border-2 border-gray-200 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b-2 border-gray-200 text-xs uppercase font-bold text-gray-600 tracking-wider">
                                        <th className="p-4">ID</th>
                                        <th className="p-4">Nombre Completo</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Provincia</th>
                                        <th className="p-4 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                                    {usuarios.map((u) => (
                                        <tr key={u.id} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="p-4 font-mono text-xs text-gray-400">#{u.id}</td>
                                            <td className="p-4 font-semibold text-gray-900">{u.nombre} {u.apellidos}</td>
                                            <td className="p-4">{u.email}</td>
                                            <td className="p-4">{u.provincia || <span className="text-gray-300 italic">No indicada</span>}</td>
                                            <td className="p-4 text-center flex justify-center gap-2">
                                                <button onClick={() => setEditingUsuario(u)} className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleEliminarUsuario(u.id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Gestión de Oferta Académica</h2>
                            <p className="text-sm text-gray-500">Añade nuevos grados o actualiza las notas de corte oficiales en tiempo real.</p>
                        </div>

                        {/* Formulario de Creación / Edición */}
                        {editingTitulacion ? (
                            <form onSubmit={handleUpdateTitulacion} className="bg-amber-50/40 border-2 border-amber-500 p-4 md:p-6 flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">Editar Nombre</label>
                                    <input
                                        type="text"
                                        value={editingTitulacion.nombre}
                                        onChange={(e) => setEditingTitulacion({ ...editingTitulacion, nombre: e.target.value })}
                                        className="w-full border-2 border-amber-300 p-2.5 text-sm focus:outline-none focus:border-amber-500 bg-white"
                                    />
                                </div>
                                <div className="w-full md:w-32">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">Nota</label>
                                    <input
                                        type="number"
                                        step="0.001"
                                        min="5"
                                        max="14"
                                        value={editingTitulacion.notaCorte || ""}
                                        onChange={(e) => setEditingTitulacion({ ...editingTitulacion, notaCorte: e.target.value })}
                                        className="w-full border-2 border-amber-300 p-2.5 text-sm focus:outline-none focus:border-amber-500 bg-white"
                                    />
                                </div>
                                <div className="flex gap-2 min-w-[120px]">
                                    <button type="submit" className="flex-1 bg-amber-600 text-white p-2.5 hover:bg-amber-700 transition-colors font-bold text-sm">
                                        Guardar
                                    </button>
                                    <button type="button" onClick={() => setEditingTitulacion(null)} className="bg-gray-200 text-gray-700 p-2.5 hover:bg-gray-300 transition-colors font-bold text-sm">
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleCreateTitulacion} className="bg-white border-2 border-gray-900 p-4 md:p-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-end">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Nombre de la carrera / Grado</label>
                                    <input
                                        type="text"
                                        value={newTitulacion.nombre}
                                        onChange={(e) => setNewTitulacion({ ...newTitulacion, nombre: e.target.value })}
                                        placeholder="Ej: Doble Grado en Matemáticas e Informática"
                                        className="w-full border-2 border-gray-200 p-2.5 text-sm focus:outline-none focus:border-[#007bff]"
                                    />
                                </div>

                                <div className="w-full lg:w-56">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Rama del conocimiento</label>
                                    <select
                                        value={newTitulacion.idRama}
                                        onChange={(e) => setNewTitulacion({ ...newTitulacion, idRama: parseInt(e.target.value) })}
                                        className="w-full border-2 border-gray-200 p-2.5 text-sm focus:outline-none focus:border-[#007bff] bg-white"
                                    >
                                        <option value={6}>Ingeniería y Arquitectura</option>
                                        <option value={9}>Artes y Humanidades</option>
                                        <option value={7}>Ciencias de la Salud</option>
                                        <option value={10}>Ciencias Puras</option>
                                    </select>
                                </div>

                                <div className="w-full lg:w-48">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Nota de Corte</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            step="0.001"
                                            min="5"
                                            max="14"
                                            value={newTitulacion.notaCorte}
                                            onChange={(e) => setNewTitulacion({ ...newTitulacion, notaCorte: e.target.value })}
                                            placeholder="12.345"
                                            className="flex-1 min-w-0 border-2 border-gray-200 p-2.5 text-sm focus:outline-none focus:border-[#007bff]"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-gray-900 text-white px-4 hover:bg-gray-800 transition-colors flex items-center justify-center font-bold text-sm gap-1 shrink-0"
                                        >
                                            <Plus className="w-4 h-4" /> Añadir
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {/* VISTA MÓVIL: Tarjetas de Titulaciones */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {titulaciones.map((t) => (
                                <div key={t.idTitulacion} className="bg-white border-2 border-gray-200 p-4 space-y-2">
                                    <div className="flex justify-between items-center border-b pb-2">
                                        <span className="font-mono text-xs text-gray-400">#{t.idTitulacion}</span>
                                        <div className="flex gap-1">
                                            <button onClick={() => setEditingTitulacion(t)} className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleEliminarTitulacion(t.idTitulacion)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">{t.nombre}</p>
                                    <div className="flex justify-between items-center pt-1 text-xs">
                                        <span className="bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded">{t.tipo}</span>
                                        <p className="text-gray-900 font-bold">⭐ {t.notaCorte !== null && t.notaCorte !== undefined ? t.notaCorte.toFixed(3) : "5.000"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* VISTA ESCRITORIO: Tabla tradicional */}
                        <div className="hidden md:block bg-white border-2 border-gray-200 overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b-2 border-gray-200 text-xs uppercase font-bold text-gray-600 tracking-wider">
                                        <th className="p-4">ID</th>
                                        <th className="p-4">Nombre de la Titulación</th>
                                        <th className="p-4">Tipo</th>
                                        <th className="p-4 text-center">Nota de Corte</th>
                                        <th className="p-4 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                                    {titulaciones.map((t) => (
                                        <tr key={t.idTitulacion} className="hover:bg-gray-50/70 transition-colors">
                                            <td className="p-4 font-mono text-xs text-gray-400">#{t.idTitulacion}</td>
                                            <td className="p-4 font-bold text-gray-900">{t.nombre}</td>
                                            <td className="p-4">
                                                <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded">
                                                    {t.tipo}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center font-mono font-bold text-gray-900">
                                                {t.notaCorte !== null && t.notaCorte !== undefined ? t.notaCorte.toFixed(3) : "5.000"}
                                            </td>
                                            <td className="p-4 text-center flex justify-center gap-2">
                                                <button onClick={() => setEditingTitulacion(t)} className="text-gray-400 hover:text-amber-600 p-2 transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleEliminarTitulacion(t.idTitulacion)} className="text-gray-400 hover:text-red-600 p-2 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* ==================== MODALES (MÓVIL) ==================== */}
            {showCreateUserModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-gray-900 max-w-md w-full p-6 space-y-4 max-h-[95vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="font-bold text-lg text-gray-900">Registrar Cuenta Nueva</h3>
                            <button onClick={() => setShowCreateUserModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleCreateUsuario} className="space-y-3 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input type="text" placeholder="Nombre" value={newUser.nombre} onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })} className="border p-2.5 w-full" />
                                <input type="text" placeholder="Apellidos" value={newUser.apellidos} onChange={(e) => setNewUser({ ...newUser, apellidos: e.target.value })} className="border p-2.5 w-full" />
                            </div>
                            <input type="email" placeholder="Email institucional" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="border p-2.5 w-full" />
                            <input type="password" placeholder="Contraseña de acceso" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="border p-2.5 w-full" />
                            <input type="text" placeholder="Provincia" value={newUser.provincia} onChange={(e) => setNewUser({ ...newUser, provincia: e.target.value })} className="border p-2.5 w-full" />
                            <button type="submit" className="w-full bg-[#007bff] text-white p-3 font-bold hover:bg-[#0056b3] transition-colors mt-2">Guardar Usuario</button>
                        </form>
                    </div>
                </div>
            )}

            {editingUsuario && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white border-2 border-amber-500 max-w-md w-full p-6 space-y-4 max-h-[95vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="font-bold text-lg text-gray-900">Modificar Datos de #{editingUsuario.id}</h3>
                            <button onClick={() => setEditingUsuario(null)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleUpdateUsuario} className="space-y-3 text-sm">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Nombre</label>
                                <input type="text" value={editingUsuario.nombre || ""} onChange={(e) => setEditingUsuario({ ...editingUsuario, nombre: e.target.value })} className="border p-2.5 w-full" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Apellidos</label>
                                <input type="text" value={editingUsuario.apellidos || ""} onChange={(e) => setEditingUsuario({ ...editingUsuario, apellidos: e.target.value })} className="border p-2.5 w-full" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Provincia</label>
                                <input type="text" value={editingUsuario.provincia || ""} onChange={(e) => setEditingUsuario({ ...editingUsuario, provincia: e.target.value })} className="border p-2.5 w-full" />
                            </div>
                            <button type="submit" className="w-full bg-amber-600 text-white p-3 font-bold hover:bg-amber-700 transition-colors mt-2">Actualizar Credenciales</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}