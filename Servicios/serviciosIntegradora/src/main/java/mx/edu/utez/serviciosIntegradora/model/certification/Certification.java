package mx.edu.utez.serviciosIntegradora.model.certification;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.model.person.Person;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "certifications")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "certificationName", nullable = false, length = 90)
    private String name;

    @Column(name = "version", nullable = false, length = 90)
    private String version;

    @Column(nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status;


    //Relaciones

    /*Persona*/
    @ManyToOne
    @JoinColumn(name = "person_id")
    @JsonIgnore
    private Person person;

    /*compañia*/
    @ManyToOne
    @JoinColumn(name = "company_id")
    @JsonIgnore
    private CertifyingCompany company;

    /*candidato*/
    @OneToMany(mappedBy = "certification", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Candidate> candidate;


}
