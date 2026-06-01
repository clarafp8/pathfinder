package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Publicacion;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {
	List<Publicacion> findByPadreIsNull(); 
	List<Publicacion> findByPadreIsNullOrderByFechaCreacionDesc();
    
    // Obtener todas las respuestas a una publicación
    List<Publicacion> findByPadreIdPublicacion(Integer idPadre);
    
    // Buscar publicaciones de un usuario concreto
    List<Publicacion> findByAutorId(Integer idUsuario);
}