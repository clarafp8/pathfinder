package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Centro;

@Repository
public interface CentroRepository extends JpaRepository<Centro, Integer> {
    // Buscar centros en una provincia
    List<Centro> findByProvinciaIgnoreCase(String provincia);
    
    // Filtrar por Universidades o FP
    List<Centro> findByEsUniversity(Boolean esUniversity);
}
