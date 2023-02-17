package mx.edu.utez.serviciosIntegradora.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.person.Person;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;
    @Column(name = "password", nullable = false, length = 50)
    private String password;

    @Enumerated(EnumType.ORDINAL)
    private Role role;

    @Column( nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status;


    //Relaciones
    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Person person;

    public User(Long id, String username, String password, Role role, Boolean status, Person person) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.status = status;
        this.person = person;
    }

}

