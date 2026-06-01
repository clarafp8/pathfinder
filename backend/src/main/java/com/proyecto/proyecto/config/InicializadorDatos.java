package com.proyecto.proyecto.config;

import java.time.LocalDate;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.proyecto.proyecto.entidades.Estudiante;
import com.proyecto.proyecto.entidades.Estudio;
import com.proyecto.proyecto.entidades.Orientador;
import com.proyecto.proyecto.repositorios.EstudianteRepository;
import com.proyecto.proyecto.repositorios.EstudioRepository;
import com.proyecto.proyecto.repositorios.OrientadorRepository;

import net.datafaker.Faker;

@Component
public class InicializadorDatos implements CommandLineRunner {

    @Autowired private EstudianteRepository estudianteRepo;
    @Autowired private OrientadorRepository orientadorRepo;
    @Autowired private EstudioRepository estudioRepo;

    @Override
    public void run(String... args) throws Exception {
        Faker faker = new Faker(new Locale("es")); // Configuramos en español

        if (estudianteRepo.count() == 0) {
            System.out.println(">> Generando estudiantes ficticios con Faker...");
            
            // Obtenemos un estudio de la base de datos para asignarlo

            for (int i = 0; i < 10; i++) {
                Estudiante e = new Estudiante();
                e.setNombre(faker.name().firstName());
                e.setApellidos(faker.name().lastName() + " " + faker.name().lastName());
                e.setEmail(faker.internet().emailAddress());
                e.setFechaNac(LocalDate.of(1990, 1, 1));
                e.setProvincia(faker.address().state());
                e.setPassword("password123"); // En un caso real, iría cifrada
                e.setNotaMedia(faker.number().randomDouble(2, 5, 10));
                e.setEstudio("Bachillerato");
                
                estudianteRepo.save(e);
            }
        }

        if (orientadorRepo.count() == 0) {
            System.out.println(">> Generando orientadores ficticios...");
            
            String[] especialidades = {"Psicología", "Carreras Técnicas", "Artes", "FP"};

            for (int i = 0; i < 5; i++) {
                Orientador o = new Orientador();
                o.setNombre(faker.name().firstName());
                o.setApellidos(faker.name().lastName());
                o.setEmail(faker.internet().emailAddress());
                o.setProvincia(faker.address().state());
                o.setFechaNac(LocalDate.of(1990, 1, 1));
                o.setEspecialidad(especialidades[faker.random().nextInt(especialidades.length)]);
                o.setInformacionPersonal(faker.lorem().paragraph());
                o.setPassword("admin123");
                
                orientadorRepo.save(o);
            }
        }
    }
}