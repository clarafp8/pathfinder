package com.proyecto.proyecto.controlador;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.proyecto.entidades.Usuario;
import com.proyecto.proyecto.repositorios.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) // Vite + React
public class UsuarioControlador {

	private final UsuarioRepository usuarioRepository;

	public UsuarioControlador(UsuarioRepository usuarioRepository) {
		this.usuarioRepository = usuarioRepository;
	}

	// Traer todos los usuarios GET http://localhost:8080/api/usuarios/datos
	@GetMapping("/datos")
	public List<Usuario> listar() {
		return usuarioRepository.findAll();
	}

	// GET http://localhost:8080/api/usuarios/correo/ejemplo@mail.com
	@GetMapping("/correo/{correo}")
	public ResponseEntity<Usuario> getUsuarioPorCorreo(@PathVariable String correo) {
		return usuarioRepository.findByEmail(correo).map(usuario -> ResponseEntity.ok(usuario)) 
				.orElse(ResponseEntity.notFound().build()); 
	}

	@PutMapping("/{id}")
	public Usuario actualizar(@PathVariable Integer id, @RequestBody Usuario datos) {
		return usuarioRepository.findById(id).map(u -> {
			u.setNombre(datos.getNombre());
			u.setApellidos(datos.getApellidos());
			u.setProvincia(datos.getProvincia());
			u.setFechaNac(datos.getFechaNac());
			return usuarioRepository.save(u);
		}).orElse(null);
	}

	@PostMapping
	public ResponseEntity<?> crearUsuario(@RequestBody Usuario nuevoUsuario) {
		try {

			Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);

			return ResponseEntity.ok(usuarioGuardado);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error al crear el usuario: " + e.getMessage());
		}
	}
}
