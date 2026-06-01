package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Estudiante;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Integer> {
    // Buscar estudiantes por su nivel de estudios
    List<Estudiante> findByEstudioIdEstudio(Integer idEstudio);
}
