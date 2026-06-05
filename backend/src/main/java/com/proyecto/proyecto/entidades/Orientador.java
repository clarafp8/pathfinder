package com.proyecto.proyecto.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "Orientador")
@PrimaryKeyJoinColumn(name = "id")
public class Orientador extends Usuario {
    
    private String especialidad;
    
    @Column(columnDefinition = "TEXT")
    private String informacionPersonal;
    
    @Column(columnDefinition = "TEXT")
    private String disponibilidad;

	public String getEspecialidad() {
		return especialidad;
	}

	public void setEspecialidad(String especialidad) {
		this.especialidad = especialidad;
	}

	public String getInformacionPersonal() {
		return informacionPersonal;
	}

	public void setInformacionPersonal(String informacionPersonal) {
		this.informacionPersonal = informacionPersonal;
	}

	public String getDisponibilidad() {
		return disponibilidad;
	}

	public void setDisponibilidad(String disponibilidad) {
		this.disponibilidad = disponibilidad;
	}

	
}

