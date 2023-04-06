package mx.edu.utez.serviciosIntegradora.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.person.Person;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, length = 50)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column( nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status;


    //Relaciones
    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private Person person;


    public Collection<Role> getRoles() {
        List<Role> roles = new ArrayList<>();
        roles.add(role);
        return roles;
    }


}

