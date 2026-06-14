import { Titulacion as ApiTitulacion } from "./apiClient";

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
    distanciaMinima?: number;
}
/**
 * Calcula la distancia en línea recta usando Haversine
 */
export const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/**
 * Diccionario de enlaces oficiales de las universidades
 */
export const obtenerLinkUniversidad = (nombreCentro: string): string => {
    const nombre = nombreCentro.toLowerCase();
    if (nombre.includes("alicante")) return "https://www.ua.es";
    if (nombre.includes("complutense")) return "https://www.ucm.es";
    if (nombre.includes("autónoma de madrid") || nombre.includes("autonoma de madrid")) return "https://www.uam.es";
    if (nombre.includes("autónoma de barcelona") || nombre.includes("autonoma de barcelona")) return "https://www.uab.cat";
    if (nombre.includes("barcelona")) return "https://www.ub.edu";
    if (nombre.includes("valència") || nombre.includes("valencia")) return "https://www.uv.es";
    if (nombre.includes("politècnica de valència") || nombre.includes("politecnica de valencia")) return "https://www.upv.es";
    if (nombre.includes("sevilla")) return "https://www.us.es";
    if (nombre.includes("málaga") || nombre.includes("malaga")) return "https://www.uma.es";
    if (nombre.includes("murcia")) return "https://www.um.es";
    if (nombre.includes("zaragoza")) return "https://www.unizar.es";
    if (nombre.includes("santiago")) return "https://www.usc.gal";
    if (nombre.includes("coruña") || nombre.includes("coruna")) return "https://www.udc.es";
    if (nombre.includes("granada")) return "https://www.ugr.es";
    if (nombre.includes("salamanca")) return "https://www.usal.es";
    if (nombre.includes("cádiz") || nombre.includes("cadiz")) return "https://www.uca.es";
    if (nombre.includes("oviedo")) return "https://www.uniovi.es";
    if (nombre.includes("país vasco") || nombre.includes("pais vasco") || nombre.includes("euskal")) return "https://www.ehu.eus";

    return `https://www.google.com/search?q=${encodeURIComponent(nombreCentro)}`;
};