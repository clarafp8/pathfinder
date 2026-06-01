package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Orientador;

@Repository
public interface OrientadorRepository extends JpaRepository<Orientador, Integer> {
    // Buscar orientadores que contengan una especialidad
    List<Orientador> findByEspecialidadContainingIgnoreCase(String especialidad);
}