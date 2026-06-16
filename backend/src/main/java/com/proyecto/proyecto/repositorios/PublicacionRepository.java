package com.proyecto.proyecto.repositorios;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto.proyecto.entidades.Publicacion;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {
    List<Publicacion> findByPadreIsNull(); 
    List<Publicacion> findByPadreIsNullOrderByFechaCreacionDesc();
    
    List<Publicacion> findByPadreIdPublicacion(Integer idPadre);
    
    List<Publicacion> findByAutorId(Integer idUsuario);

    @Modifying
    @Transactional
    void deleteByAutorId(Integer idUsuario);
}