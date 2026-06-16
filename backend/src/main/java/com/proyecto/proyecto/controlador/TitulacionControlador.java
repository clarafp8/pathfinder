package com.proyecto.proyecto.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.proyecto.entidades.Titulacion;
import com.proyecto.proyecto.repositorios.TitulacionRepository;

@RestController
@RequestMapping("/api/titulaciones")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) // Vite + React
public class TitulacionControlador {

    @Autowired
    private TitulacionRepository titulacionRepository;

    @GetMapping
    public List<Titulacion> getAll() {
        return titulacionRepository.findAll();
    }

    @GetMapping("/recomendadas")
    public List<Titulacion> getRecomendadas(@RequestParam Double nota) {
        return titulacionRepository.findByNotaCorteLessThanEqualOrderByNotaCorteDesc(nota);
    }

    @GetMapping("/rama/{idRama}")
    public List<Titulacion> getByRama(@PathVariable Integer idRama) {
        return titulacionRepository.findByRamaIdRama(idRama);
    }

    @GetMapping("/por-rama")
    public List<Titulacion> getPorRama(@RequestParam String nombre) {
        return titulacionRepository.findByRamaNombre(nombre);
    }

    @PostMapping
    public ResponseEntity<?> guardarTitulacion(@RequestBody Titulacion titulacion) {
        try {
            // .save() inserta si el objeto no lleva ID, o actualiza si ya existe en MySQL
            Titulacion guardada = titulacionRepository.save(titulacion);
            return ResponseEntity.ok(guardada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al procesar la titulación: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarTitulacion(@PathVariable Integer id) {
        try {
            return titulacionRepository.findById(id).map(t -> {
                titulacionRepository.delete(t);
                return ResponseEntity.ok().body("Titulación eliminada correctamente.");
            }).orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al eliminar la titulación: " + e.getMessage());
        }
    }

}
