package com.proyecto.proyecto.dto;

public class UsuarioActualizacionDTO {
	private String nombre;
    private String apellidos;
    private String provincia;
    private String bio;
    private String intereses;
	public UsuarioActualizacionDTO(String nombre, String apellidos, String provincia, String bio, String intereses) {
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.provincia = provincia;
		this.bio = bio;
		this.intereses = intereses;
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
	public String getProvincia() {
		return provincia;
	}
	public void setProvincia(String provincia) {
		this.provincia = provincia;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public String getIntereses() {
		return intereses;
	}
	public void setIntereses(String intereses) {
		this.intereses = intereses;
	}   
    
}
