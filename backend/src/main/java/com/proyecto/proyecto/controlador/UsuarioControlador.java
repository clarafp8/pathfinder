package com.proyecto.proyecto.controlador;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.proyecto.proyecto.entidades.Usuario;
import com.proyecto.proyecto.repositorios.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) // Vite + React

public class UsuarioControlador {

    private final UsuarioRepository usuarioRepository;
    private static final String CARPETA_IMAGENES = "/home/administrador/backend/imagenes/";

    public UsuarioControlador(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // Get all users: GET /api/usuarios/datos
    @GetMapping("/datos")
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    // Get single user by email: GET /api/usuarios/correo/example@mail.com
    @GetMapping("/correo/{correo}")
    public ResponseEntity<Usuario> getUsuarioPorCorreo(@PathVariable String correo) {
        return usuarioRepository.findByEmail(correo)
                .map(usuario -> ResponseEntity.ok(usuario))
                .orElse(ResponseEntity.notFound().build());
    }

    // Register a new user
    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario nuevoUsuario) {
        try {
            Usuario usuarioGuardado = usuarioRepository.save(nuevoUsuario);
            return ResponseEntity.ok(usuarioGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al crear el usuario: " + e.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Usuario> actualizar(
            @PathVariable Integer id,
            @RequestParam("nombre") String nombre,
            @RequestParam("apellidos") String apellidos,
            @RequestParam(value = "provincia", required = false) String provincia,
            @RequestParam(value = "fechaNac", required = false) String fechaNacStr,
            @RequestParam(value = "bio", required = false) String bio,
            @RequestParam(value = "intereses", required = false) String intereses,
            @RequestParam(value = "archivoFoto", required = false) MultipartFile archivoFoto) {

        try {
            return usuarioRepository.findById(id).map(u -> {
                // Asignamos los campos de texto directos que llegan desde el formulario
                u.setNombre(nombre);
                u.setApellidos(apellidos);
                u.setProvincia(provincia);
                u.setBio(bio);
                u.setIntereses(intereses);

				if (fechaNacStr != null && !fechaNacStr.trim().isEmpty()) {
                    try {
                        java.time.LocalDate fecha = java.time.LocalDate.parse(fechaNacStr);
                        u.setFechaNac(fecha);
                    } catch (java.time.format.DateTimeParseException e) {
                        System.err.println("Invalid date format: " + fechaNacStr);
                    }
                } else {
                    u.setFechaNac(null); // Si viene vacío, lo dejamos como null en la BD
                }

                // Si se sube una foto desde el ordenador
                if (archivoFoto != null && !archivoFoto.isEmpty()) {
                    try {
                        Files.createDirectories(Paths.get(CARPETA_IMAGENES));

                        String nombreArchivo = "foto_usuario_" + id + "_" + archivoFoto.getOriginalFilename();
                        Path rutaDestino = Paths.get(CARPETA_IMAGENES).resolve(nombreArchivo);

                        Files.copy(archivoFoto.getInputStream(), rutaDestino, StandardCopyOption.REPLACE_EXISTING);

                        String urlFoto = "/api/usuarios/imagenes/" + nombreArchivo;
                        u.setFotoUrl(urlFoto);
                    } catch (Exception e) {
                        System.err.println("Error saving local file: " + e.getMessage());
                    }
                }

                Usuario usuarioActualizado = usuarioRepository.save(u);
                return ResponseEntity.ok(usuarioActualizado);
            }).orElse(ResponseEntity.notFound().build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 🎯 Servir las imágenes guardadas al navegador
    @GetMapping("/imagenes/{nombreArchivo:.+}")
    public ResponseEntity<Resource> verFoto(@PathVariable String nombreArchivo) {
        try {
            Path rutaArchivo = Paths.get(CARPETA_IMAGENES).resolve(nombreArchivo);
            Resource recurso = new UrlResource(rutaArchivo.toUri());

            if (recurso.exists() || recurso.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG) 
                        .body(recurso);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}