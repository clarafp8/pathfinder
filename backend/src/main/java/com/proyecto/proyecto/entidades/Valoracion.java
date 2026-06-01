package com.proyecto.proyecto.entidades;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Valoracion")
@Data
public class Valoracion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idValoracion;

    @ManyToOne
    @JoinColumn(name = "id_estudiante", nullable = false)
    private Estudiante estudiante;

    @ManyToOne
    @JoinColumn(name = "id_orientador", nullable = false)
    private Orientador orientador;

    private Integer puntuacion;

    @Column(columnDefinition = "TEXT")
    private String comentario;

    private LocalDateTime fechaValoracion = LocalDateTime.now();

	public Integer getIdValoracion() {
		return idValoracion;
	}

	public void setIdValoracion(Integer idValoracion) {
		this.idValoracion = idValoracion;
	}

	public Estudiante getEstudiante() {
		return estudiante;
	}

	public void setEstudiante(Estudiante estudiante) {
		this.estudiante = estudiante;
	}

	public Orientador getOrientador() {
		return orientador;
	}

	public void setOrientador(Orientador orientador) {
		this.orientador = orientador;
	}

	public Integer getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(Integer puntuacion) {
		this.puntuacion = puntuacion;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public LocalDateTime getFechaValoracion() {
		return fechaValoracion;
	}

	public void setFechaValoracion(LocalDateTime fechaValoracion) {
		this.fechaValoracion = fechaValoracion;
	}
    
    
}