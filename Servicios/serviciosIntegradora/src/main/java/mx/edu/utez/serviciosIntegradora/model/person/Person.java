package mx.edu.utez.serviciosIntegradora.model.person;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.user.User;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "people")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column( nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status;

    @Enumerated(EnumType.STRING)
    private TypePerson typePerson;

    //Relaciones

    /*persona*/
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    /*certificacion*/
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Certification> certifications;

    /*candidato*/
    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Candidate> candidates;

}
