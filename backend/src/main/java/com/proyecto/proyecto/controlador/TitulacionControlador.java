package com.proyecto.proyecto.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.proyecto.entidades.Titulacion;
import com.proyecto.proyecto.repositorios.TitulacionRepository;

@RestController
@RequestMapping("/api/titulaciones")
@CrossOrigin(origins = "http://localhost:3000")
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

}
