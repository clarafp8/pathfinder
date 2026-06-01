package com.proyecto.proyecto.repositorios;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Valoracion;

@Repository
public interface ValoracionRepository extends JpaRepository<Valoracion, Integer> {
    // Obtener el feedback de un orientador específico
    List<Valoracion> findByOrientadorId(Integer idOrientador);
    
    // Buscar si un estudiante ya valoró a un orientador (para evitar duplicados)
    Optional<Valoracion> findByEstudianteIdAndOrientadorId(Integer idEstudiante, Integer idOrientador);
}
