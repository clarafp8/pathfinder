const API_BASE_URL = "http://localhost:9093/api";

// Tipos de datos
export interface Usuario {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
  password?: string;
  fechaNac?: string;
  provincia?: string;
}

export interface Publicacion {
  idPublicacion?: number;
  contenido: string;
  usuarioId: number;
  padreIdPublicacion?: number;
  fechaCreacion?: string;
}

export interface Titulacion {
  idTitulacion?: number;
  nombre: string;
  notaCorte: number;
  ramaIdRama?: number;
  ramaNombre?: string;
}

// ============ USUARIOS ============
export const usuariosAPI = {
  // Obtener todos los usuarios
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

  // Obtener usuario por correo
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

  // Crear nuevo usuario
  create: async (usuario: Usuario): Promise<Usuario> => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error("Error al crear usuario");
      return await response.json();
    } catch (error) {
      console.error("Error en create usuario:", error);
      throw error;
    }
  },

  // Actualizar usuario
  update: async (id: number, usuario: Usuario): Promise<Usuario> => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
      if (!response.ok) throw new Error("Error al actualizar usuario");
      return await response.json();
    } catch (error) {
      console.error("Error en update usuario:", error);
      throw error;
    }
  },
};

// ============ PUBLICACIONES ============
export const publicacionesAPI = {
  // Obtener temas principales (sin padre)
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

  // Obtener respuestas a una publicación
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

  // Crear nueva publicación
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

  // Eliminar publicación
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
};

// ============ TITULACIONES ============
export const titulacionesAPI = {
  // Obtener todas las titulaciones
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

  // Obtener titulaciones recomendadas por nota
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

  // Obtener titulaciones por rama ID
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

  // Obtener titulaciones por nombre de rama
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
};
