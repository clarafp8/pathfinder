package com.proyecto.proyecto.dto;

import java.time.LocalDate;

public class UsuarioPerfilDTO {
	private Integer id;
	private String nombre;
	private String apellidos;
	private String email;
	private String provincia;
	private LocalDate fechaNac;
	private Double notaMedia; // solo estudiantes
	private String especialidad; // solo orientadores
	
	public UsuarioPerfilDTO() {
		
	}

	public UsuarioPerfilDTO(Integer id, String nombre, String apellidos, String email, String provincia,
			LocalDate fechaNac, Double notaMedia, String especialidad) {
		this.id = id;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.email = email;
		this.provincia = provincia;
		this.fechaNac = fechaNac;
		this.notaMedia = notaMedia;
		this.especialidad = especialidad;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProvincia() {
		return provincia;
	}

	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}

	public LocalDate getFechaNac() {
		return fechaNac;
	}

	public void setFechaNac(LocalDate fechaNac) {
		this.fechaNac = fechaNac;
	}

	public Double getNotaMedia() {
		return notaMedia;
	}

	public void setNotaMedia(Double notaMedia) {
		this.notaMedia = notaMedia;
	}

	public String getEspecialidad() {
		return especialidad;
	}

	public void setEspecialidad(String especialidad) {
		this.especialidad = especialidad;
	}

}
