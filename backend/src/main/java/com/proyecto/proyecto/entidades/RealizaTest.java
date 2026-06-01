package com.proyecto.proyecto.entidades;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Realiza_Test")
@Data
public class RealizaTest {
    @EmbeddedId
    private RealizaTestId id;

    @ManyToOne
    @MapsId("idUsuario")
    @JoinColumn(name = "id_usuario")
    private Estudiante estudiante;

    @ManyToOne
    @MapsId("idCuestionario")
    @JoinColumn(name = "id_cuestionario")
    private Cuestionario cuestionario;

    private Double puntuacion;

	public RealizaTestId getId() {
		return id;
	}

	public void setId(RealizaTestId id) {
		this.id = id;
	}

	public Estudiante getEstudiante() {
		return estudiante;
	}

	public void setEstudiante(Estudiante estudiante) {
		this.estudiante = estudiante;
	}

	public Cuestionario getCuestionario() {
		return cuestionario;
	}

	public void setCuestionario(Cuestionario cuestionario) {
		this.cuestionario = cuestionario;
	}

	public Double getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(Double puntuacion) {
		this.puntuacion = puntuacion;
	}
    
    
  
}
