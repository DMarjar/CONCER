package mx.edu.utez.serviciosIntegradora.model.person;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "people")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firstName", nullable = false, length = 50)
    private String firstName;

    @Column(name = "lastName", nullable = false, length = 50)
    private String lastName;

    @Column(name = "phoneNumber", nullable = false, length = 10)
    private String phoneNumber;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Enumerated(EnumType.ORDINAL)
    private Gender gender;

    @Column( nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status;

    @Enumerated(EnumType.ORDINAL)
    private TypePerson typePerson;

    //Relaciones

    /*persona*/
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    /*certificacion*/
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Certification> certifications;

    /*candidato*/
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Candidate> candidates;

    public Person(Long id, String firstName, String lastName, String phoneNumber, String email, Gender gender, Boolean status, TypePerson typePerson, User user, List<Certification> certifications, List<Candidate> candidates) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.gender = gender;
        this.status = status;
        this.typePerson = typePerson;
        this.user = user;
        this.certifications = certifications;
        this.candidates = candidates;
    }

}
