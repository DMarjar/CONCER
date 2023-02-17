package mx.edu.utez.serviciosIntegradora.controller.user.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.model.user.Role;
import mx.edu.utez.serviciosIntegradora.model.user.User;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class UserDtos {
    private Long id;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String username;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String password;
    private Role role;
    private Boolean status;
    private Person person;

    public User castToUser() {
        return new User(
                this.id,
                this.username,
                this.password,
                this.role,
                this.status,
                this.person
        );
    }
}
