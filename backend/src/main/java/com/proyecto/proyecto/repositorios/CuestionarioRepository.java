package com.proyecto.proyecto.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Cuestionario;

@Repository
public interface CuestionarioRepository extends JpaRepository<Cuestionario, Integer> {
}
