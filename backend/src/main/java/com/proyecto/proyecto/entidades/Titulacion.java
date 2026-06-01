package com.proyecto.proyecto.entidades;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Table(name = "Titulacion")
@Data
public class Titulacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idTitulacion;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "id_rama")
    private Rama rama;

    @ManyToMany
    @JoinTable(
        name = "Titulacion_Centro",
        joinColumns = @JoinColumn(name = "id_titulacion"),
        inverseJoinColumns = @JoinColumn(name = "id_centro")
    )
    private List<Centro> centros;
    private Double notaCorte;
    public Double getNotaCorte() {
        return notaCorte;
    }

    public void setNotaCorte(Double notaCorte) {
        this.notaCorte = notaCorte;
    }
	public Integer getIdTitulacion() {
		return idTitulacion;
	}

	public void setIdTitulacion(Integer idTitulacion) {
		this.idTitulacion = idTitulacion;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Rama getRama() {
		return rama;
	}

	public void setRama(Rama rama) {
		this.rama = rama;
	}

	public List<Centro> getCentros() {
		return centros;
	}

	public void setCentros(List<Centro> centros) {
		this.centros = centros;
	}
    
    
}
