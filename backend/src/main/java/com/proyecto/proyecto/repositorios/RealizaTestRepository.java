package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.proyecto.proyecto.entidades.RealizaTest;
import com.proyecto.proyecto.entidades.RealizaTestId;


@Repository
public interface RealizaTestRepository extends JpaRepository<RealizaTest, RealizaTestId> {
    // Historial de tests de un estudiante específico
    List<RealizaTest> findByEstudianteId(Integer idUsuario);
    
    // Buscar resultados de un estudiante para un cuestionario concreto
    List<RealizaTest> findByEstudianteIdAndCuestionarioIdCuestionario(Integer idUsuario, Integer idCuestionario);
}