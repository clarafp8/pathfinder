const API_BASE_URL = "/api";

export interface Usuario {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
  password?: string;
  fechaNac?: string;
  provincia?: string;
  bio?: string;
  intereses?: string;
  fotoUrl?: string;
  rol?: string;
}

export interface Publicacion {
  idPublicacion?: number;
  contenido: string;
  usuario?: {
    id: number;
    nombre?: string;
    apellidos?: string;
    email?: string;
  };
  padreIdPublicacion?: number;
  fechaCreacion?: string;
  likes?: number;
}

export interface Rama {
  idRama: number;
  nombre: string;
}

export interface Centro {
  idCentro: number;
  nombre: string;
  provincia: string;
  latitud?: number | null;
  longitud?: number | null;
  codigoPostal?: string | null;
  esUniversity?: boolean | null;
}

export interface Titulacion {
  idTitulacion?: number;
  nombre: string;
  tipo?: string;
  notaCorte?: number | null;
  ramaIdRama?: number;
  ramaNombre?: string;
  rama?: Rama;
  centros?: Centro[];
}

export const usuariosAPI = {
  getAll: async (): Promise<Usuario[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/datos`);
      if (!response.ok) throw new Error("Error al obtener usuarios");
      return await response.json();
    } catch (error) {
      console.error("Error en getAll usuarios:", error);
      throw error;
    }
  },

  getByEmail: async (correo: string): Promise<Usuario | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/correo/${correo}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error("Error en getByEmail:", error);
      return null;
    }
  },

  create: async (usuario: Usuario): Promise<Usuario> => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        let detalleError = "";
        try {
          detalleError = await response.text();
        } catch {
          detalleError = "No se pudo leer la respuesta del servidor.";
        }
        throw new Error(`Error ${response.status} (${response.statusText}): ${detalleError}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error detallado en create usuario:", error);
      throw error;
    }
  },

  update: async (id: number, usuario: Usuario, archivoFoto?: File): Promise<Usuario> => {
    try {
      const data = new FormData();

      data.append("nombre", usuario.nombre);
      data.append("apellidos", usuario.apellidos);
      data.append("provincia", usuario.provincia || "");
      data.append("fechaNac", usuario.fechaNac || "");
      data.append("bio", usuario.bio || "");
      data.append("intereses", usuario.intereses || "");

      if (archivoFoto) {
        data.append("archivoFoto", archivoFoto);
      }

      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "PUT",
        body: data,
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");
      return await response.json();
    } catch (error) {
      console.error("Error en update usuario:", error);
      throw error;
    }
  },
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar usuario");
    } catch (error) {
      console.error("Error en delete usuario:", error);
      throw error;
    }
  },
};

export const publicacionesAPI = {
  getMainTopics: async (): Promise<Publicacion[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/publicaciones`);
      if (!response.ok) throw new Error("Error al obtener publicaciones");
      return await response.json();
    } catch (error) {
      console.error("Error en getMainTopics:", error);
      throw error;
    }
  },

  getReplies: async (publicacionId: number): Promise<Publicacion[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/publicaciones/${publicacionId}/respuestas`);
      if (!response.ok) throw new Error("Error al obtener respuestas");
      return await response.json();
    } catch (error) {
      console.error("Error en getReplies:", error);
      throw error;
    }
  },

  create: async (publicacion: Publicacion): Promise<Publicacion> => {
    try {
      const response = await fetch(`${API_BASE_URL}/publicaciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publicacion),
      });
      if (!response.ok) throw new Error("Error al crear publicación");
      return await response.json();
    } catch (error) {
      console.error("Error en create publicación:", error);
      throw error;
    }
  },

  delete: async (publicacionId: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/publicaciones/${publicacionId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar publicación");
    } catch (error) {
      console.error("Error en delete publicación:", error);
      throw error;
    }
  },

  like: async (publicacionId: number): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/publicaciones/${publicacionId}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) throw new Error("Error al procesar el like");
      return await response.json();
    } catch (error) {
      console.error("Error en like:", error);
      throw error;
    }
  },
};

export const titulacionesAPI = {
  getAll: async (): Promise<Titulacion[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/titulaciones`);
      if (!response.ok) throw new Error("Error al obtener titulaciones");
      return await response.json();
    } catch (error) {
      console.error("Error en getAll titulaciones:", error);
      throw error;
    }
  },

  getRecommended: async (nota: number): Promise<Titulacion[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/titulaciones/recomendadas?nota=${nota}`);
      if (!response.ok) throw new Error("Error al obtener titulaciones recomendadas");
      return await response.json();
    } catch (error) {
      console.error("Error en getRecommended:", error);
      throw error;
    }
  },

  getByRama: async (idRama: number): Promise<Titulacion[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/titulaciones/rama/${idRama}`);
      if (!response.ok) throw new Error("Error al obtener titulaciones por rama");
      return await response.json();
    } catch (error) {
      console.error("Error en getByRama:", error);
      throw error;
    }
  },

  getByRamaNombre: async (nombreRama: string): Promise<Titulacion[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/titulaciones/por-rama?nombre=${nombreRama}`);
      if (!response.ok) throw new Error("Error al obtener titulaciones");
      return await response.json();
    } catch (error) {
      console.error("Error en getByRamaNombre:", error);
      throw error;
    }
  },
  create: async (titulacion: any): Promise<Titulacion> => {
    try {
      const response = await fetch(`${API_BASE_URL}/titulaciones`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(titulacion),
      });
      if (!response.ok) throw new Error("Error al crear titulación");
      return await response.json();
    } catch (error) {
      console.error("Error en create titulación:", error);
      throw error;
    }
  },
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/titulaciones/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar titulación");
    } catch (error) {
      console.error("Error en delete titulación:", error);
      throw error;
    }
  },
};