package mx.edu.utez.serviciosIntegradora.controller.certifyingCompany.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class CertifyingCompanyDtos {
    private Long id;
    @NotNull
    @NotBlank
    @Length(min = 1, max = 150)
    private String name;
    private Boolean status=true;
    private String email;
    private String phone;

    private String pictureBase64;

    public CertifyingCompany castToCertifyingCompany() {
        return new CertifyingCompany(
                this.id,
                this.name,
                this.status,
                this.email,
                this.phone,
                this.pictureBase64
        );
    }
}
