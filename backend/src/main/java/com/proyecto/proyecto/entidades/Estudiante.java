package com.proyecto.proyecto.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "Estudiante")
@PrimaryKeyJoinColumn(name = "id")

public class Estudiante extends Usuario {
    
    @ManyToOne
    @JoinColumn(name = "id_estudio")
    private Estudio estudio;

    private Double notaMedia;

	public Estudio getEstudio() {
		return estudio;
	}


	public Double getNotaMedia() {
		return notaMedia;
	}

	public void setNotaMedia(Double notaMedia) {
		this.notaMedia = notaMedia;
	}

	public void setEstudio(String string) {
		
		
	}

	
}

