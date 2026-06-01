package com.proyecto.proyecto.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Estudio;

@Repository
public interface EstudioRepository extends JpaRepository<Estudio, Integer> {
    // Buscar por nombre exacto de estudio (ej. "Bachillerato")
    Optional<Estudio> findByEstudio(String estudio);
}