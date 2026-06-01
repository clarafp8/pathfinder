package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Rama;

@Repository
public interface RamaRepository extends JpaRepository<Rama, Integer> {
    // Ramas asociadas a un cuestionario
    List<Rama> findByCuestionarioIdCuestionario(Integer idCuestionario);
}