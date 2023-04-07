package mx.edu.utez.serviciosIntegradora.model.certifyingCompany;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column( nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status;

    @Column
    private String email;

    @Column
    private String phone;

    //Relaciones
    /*compañia - certificacion*/
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Certification> certification;

    public CertifyingCompany(Long id, String name, Boolean status, String email, String phone) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.email = email;
        this.phone = phone;
    }


}
