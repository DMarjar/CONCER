package mx.edu.utez.serviciosIntegradora.controller.certification.Dtos;

import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class CertificationDtos {
    private long id;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String name;
    @NotNull
    @NotBlank
    private String version;
    private Boolean status=true;
    private Person person;
    private String picture;
    private CertifyingCompany certifyingCompany;

    public Certification castToCertification() {
        return new Certification(
                this.id,
                this.name,
                this.version,
                this.status,
                this.person,
                this.certifyingCompany,
                null
        );
    }
}
