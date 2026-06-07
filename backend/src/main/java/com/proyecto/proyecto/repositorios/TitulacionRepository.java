package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Titulacion;

@Repository
public interface TitulacionRepository extends JpaRepository<Titulacion, Integer> {
    
    @Query(value = "SELECT * FROM titulacion WHERE id_rama = :idRama", nativeQuery = true)
    List<Titulacion> findByRamaIdRama(@Param("idRama") Integer idRama);

    @Query("SELECT DISTINCT t FROM Titulacion t LEFT JOIN FETCH t.rama LEFT JOIN FETCH t.centros")
    List<Titulacion> findAllWithRamaAndCentros();

    List<Titulacion> findByRamaNombre(String nombreRama);

    List<Titulacion> findByNombreContainingIgnoreCase(String nombre);

    List<Titulacion> findByNotaCorteLessThanEqualOrderByNotaCorteDesc(Double nota);
}