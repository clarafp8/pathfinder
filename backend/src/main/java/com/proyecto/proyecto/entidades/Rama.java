package com.proyecto.proyecto.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Rama")
public class Rama {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRama;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_cuestionario")
	@JsonIgnoreProperties("ramas")
    private Cuestionario cuestionario;

	public Integer getIdRama() {
		return idRama;
	}

	public void setIdRama(Integer idRama) {
		this.idRama = idRama;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Cuestionario getCuestionario() {
		return cuestionario;
	}

	public void setCuestionario(Cuestionario cuestionario) {
		this.cuestionario = cuestionario;
	}
    
    
}
