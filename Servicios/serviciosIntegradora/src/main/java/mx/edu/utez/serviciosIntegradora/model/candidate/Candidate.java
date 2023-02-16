package mx.edu.utez.serviciosIntegradora.model.candidate;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Person;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "candidates")
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date", nullable = false)
    private String date;

    @Enumerated(EnumType.ORDINAL)
    private Estado estado;

    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 1")
    private Boolean status;

    //Relaciones

    /*Certification*/
    @ManyToOne
    @JoinColumn(name = "certification_id")
    @JsonIgnore
    private Certification certification;

    /*persona*/
    @ManyToOne
    @JoinColumn(name = "person_id")
    private Person person;

    /*Academy*/
    @ManyToOne
    @JoinColumn(name = "academy_id")
    private Academy academy;

}
