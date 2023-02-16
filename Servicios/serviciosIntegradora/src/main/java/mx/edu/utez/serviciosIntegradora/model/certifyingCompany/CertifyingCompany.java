package mx.edu.utez.serviciosIntegradora.model.certifyingCompany;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "certifyingCompanies")
public class CertifyingCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "companyName", nullable = false, length = 90)
    private String name;

    @Column(name = "status", nullable = false, columnDefinition = "tinyint default 1")
    private Boolean status;

    //Relaciones
    /*compañia - certificacion*/
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Certification> certification;
}
