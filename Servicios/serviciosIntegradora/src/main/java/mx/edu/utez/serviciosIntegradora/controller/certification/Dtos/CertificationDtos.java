package mx.edu.utez.serviciosIntegradora.controller.certification.Dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
public class CertificationDtos {
    private Long id;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String name;
    @NotNull
    @NotBlank
    private String version;

    private Boolean status;


    private String pictureUrl;

    private String pictureBase64;

    private Person person;

    private CertifyingCompany company;

    private List<Candidate> candidate;

    public Certification castToCertification() {
        return new Certification(
                this.id,
                this.name,
                this.version,
                this.status,
                this.pictureUrl,
                this.pictureBase64,
                this.person,
                this.company,
                this.candidate
        );
    }
}
