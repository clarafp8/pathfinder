package com.proyecto.proyecto.controlador;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.proyecto.entidades.Publicacion;
import com.proyecto.proyecto.repositorios.PublicacionRepository;

@RestController
@RequestMapping("/api/publicaciones")
@CrossOrigin(origins = "*") 
public class PublicacionControlador {
	@Autowired
    private PublicacionRepository publicacionRepository;

    @GetMapping
    public List<Publicacion> getTemasPrincipales() {
        return publicacionRepository.findByPadreIsNull();
    }

    @GetMapping("/{id}/respuestas")
    public List<Publicacion> getRespuestas(@PathVariable Integer id) {
        return publicacionRepository.findByPadreIdPublicacion(id);
    }

    @PostMapping
    public ResponseEntity<Publicacion> crearPublicacion(@RequestBody Publicacion nuevaPublicacion) {
        try {
            nuevaPublicacion.setFechaCreacion(LocalDateTime.now());
            Publicacion guardada = publicacionRepository.save(nuevaPublicacion);
            return ResponseEntity.ok(guardada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPublicacion(@PathVariable Integer id) {
        if (publicacionRepository.existsById(id)) {
            publicacionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/like")
    public ResponseEntity<?> darLike(@PathVariable Integer id) {
        return publicacionRepository.findById(id)
            .map(publicacion -> {
                int likesActuales = publicacion.getLikes() != null ? publicacion.getLikes() : 0;
                publicacion.setLikes(likesActuales + 1);
                
                Publicacion actualizada = publicacionRepository.save(publicacion);
                return ResponseEntity.ok(actualizada);
            })
            .orElse(ResponseEntity.notFound().build());
    }

}
