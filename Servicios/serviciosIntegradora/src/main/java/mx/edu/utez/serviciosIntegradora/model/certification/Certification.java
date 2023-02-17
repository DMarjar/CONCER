package mx.edu.utez.serviciosIntegradora.model.certification;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.model.person.Person;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "certifications")
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
    private List<Candidate> candidate;

    public Certification(Long id, String name, String version, Boolean status, Person person, CertifyingCompany company, List<Candidate> candidate) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.status = status;
        this.person = person;
        this.company = company;
        this.candidate = candidate;
    }


}
