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

    @Column(nullable = false, columnDefinition = "TINYINT DEFAULT 1")
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

    public Candidate(Long id, String date, Estado estado, Boolean status, Certification certification, Person person, Academy academy) {
        this.id = id;
        this.date = date;
        this.estado = estado;
        this.status = status;
        this.certification = certification;
        this.person = person;
        this.academy = academy;
    }


}
