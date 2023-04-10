package mx.edu.utez.serviciosIntegradora.controller.person.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Gender;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.model.person.TypePerson;
import mx.edu.utez.serviciosIntegradora.model.user.User;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
public class PersonDtos {

    private Long id;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String firstName;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String lastName;
    @NotNull
    @NotBlank
    private String phoneNumber;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String email;
    @NotNull
    private Gender gender;
    private Boolean status = true;
    private TypePerson typePerson;
    private User user;





    public Person castToPerson() {
        return new Person(
                this.id,
                this.firstName,
                this.lastName,
                this.phoneNumber,
                this.email,
                this.gender,
                this.status,
                this.typePerson,
                this.user
        );
    }
}
