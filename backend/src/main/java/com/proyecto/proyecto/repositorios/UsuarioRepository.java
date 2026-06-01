package com.proyecto.proyecto.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proyecto.proyecto.entidades.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Para el Login
    Optional<Usuario> findByEmail(String email);
    
    // Comprobar si un email ya existe antes de registrar
    boolean existsByEmail(String email);
}