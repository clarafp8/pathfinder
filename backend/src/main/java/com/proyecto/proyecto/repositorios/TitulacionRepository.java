package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Titulacion;

@Repository
public interface TitulacionRepository extends JpaRepository<Titulacion, Integer> {
	
    // Buscar titulaciones por rama
    List<Titulacion> findByRamaIdRama(Integer idRama);
    List<Titulacion> findByRamaNombre(String nombreRama);

    
    // Buscar titulaciones por nombre (ej. "Ingeniería Informática")
    List<Titulacion> findByNombreContainingIgnoreCase(String nombre);
    

    List<Titulacion> findByNotaCorteLessThanEqualOrderByNotaCorteDesc(Double nota);
}
