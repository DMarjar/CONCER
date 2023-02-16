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

    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 1")
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

}
