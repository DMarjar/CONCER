package mx.edu.utez.serviciosIntegradora.controller.certification.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CertificationRequest {
    private Long id;
    private String name;
    private String version;
    private String pictureBase64;
    private Long idPerson;
    private Long idCompany;
}
