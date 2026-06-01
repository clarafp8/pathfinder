package com.proyecto.proyecto.entidades;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Cuestionario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cuestionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCuestionario;

    // Aunque en tu SQL no había más campos, en JPA solemos añadir 
    // al menos un nombre o descripción para saber qué test es.
    private String nombre; 

    // Relación inversa: Un cuestionario tiene muchas ramas (opcional)
    @OneToMany(mappedBy = "cuestionario", cascade = CascadeType.ALL)
    private List<Rama> ramas;

	public Integer getIdCuestionario() {
		return idCuestionario;
	}

	public void setIdCuestionario(Integer idCuestionario) {
		this.idCuestionario = idCuestionario;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Rama> getRamas() {
		return ramas;
	}

	public void setRamas(List<Rama> ramas) {
		this.ramas = ramas;
	}
    
    
}