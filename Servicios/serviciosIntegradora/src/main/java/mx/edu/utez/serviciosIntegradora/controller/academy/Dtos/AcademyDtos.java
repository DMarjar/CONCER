package mx.edu.utez.serviciosIntegradora.controller.academy.Dtos;

import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class AcademyDtos {
    private long id;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String name;

    private String fullName;
    private Boolean status = true;

    public Academy castToAcademy() {
        return new Academy(
                this.id,
                this.name,
                this.fullName,
                this.status,
                null
        );
    }
}
