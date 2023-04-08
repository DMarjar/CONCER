
package mx.edu.utez.serviciosIntegradora.model.candidate;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Person;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "candidates")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    @Column(nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status;

    @Column(columnDefinition = "integer default 0")
    private double puntaje;

    @Column
    private String pictureUrl;

    @Column
    private String clave;

    @Column
    private char Grupo;

    @Transient
    private String pictureBase64;

    //Relaciones

    /*Certification*/
    @ManyToOne
    @JoinColumn(name = "certification_id")
    @JsonIgnore
    private Certification certification;

    /*persona*/
    @ManyToOne
    @JoinColumn(name = "person_id")
    @JsonIgnore
    private Person person;

    /*Academy*/
    @ManyToOne
    @JoinColumn(name = "academy_id")
    @JsonIgnore
    private Academy academy;


    public Candidate(long id, LocalDate fechaInicio, LocalDate fechaFin, Estado estado, Boolean status, double puntaje, String pictureUrl, String clave, char grupo, Certification certification, Person person, Academy academy) {
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
        this.status = status;
        this.puntaje = puntaje;
        this.pictureUrl = pictureUrl;
        this.clave = clave;
        this.Grupo = grupo;
        this.certification = certification;
        this.person = person;
        this.academy = academy;
    }
}

