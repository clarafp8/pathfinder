package com.proyecto.proyecto.entidades;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class RealizaTestId implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Integer idUsuario;
    private Integer idCuestionario;
    
    @Column(name = "fecha_realizacion_test")
    private LocalDateTime fechaRealizacionTest;

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public Integer getIdCuestionario() {
		return idCuestionario;
	}

	public void setIdCuestionario(Integer idCuestionario) {
		this.idCuestionario = idCuestionario;
	}

	public LocalDateTime getFechaRealizacionTest() {
		return fechaRealizacionTest;
	}

	public void setFechaRealizacionTest(LocalDateTime fechaRealizacionTest) {
		this.fechaRealizacionTest = fechaRealizacionTest;
	}
    
    
}
