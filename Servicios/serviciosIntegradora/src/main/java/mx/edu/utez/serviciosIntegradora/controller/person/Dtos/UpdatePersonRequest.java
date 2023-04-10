package mx.edu.utez.serviciosIntegradora.controller.person.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.person.Gender;
import mx.edu.utez.serviciosIntegradora.model.person.TypePerson;
import mx.edu.utez.serviciosIntegradora.model.user.User;

@Data
@NoArgsConstructor
public class UpdatePersonRequest {
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private Gender gender;
    private Boolean status = true;
    private TypePerson typePerson;
    private User user;
    private String pictureBase64;
}
