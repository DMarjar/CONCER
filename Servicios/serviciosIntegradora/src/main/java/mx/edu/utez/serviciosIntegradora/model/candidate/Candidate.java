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


}
