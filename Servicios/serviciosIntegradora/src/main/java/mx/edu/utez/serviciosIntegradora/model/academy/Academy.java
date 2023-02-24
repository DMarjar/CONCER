package mx.edu.utez.serviciosIntegradora.model.academy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Academy")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Academy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "academyName", nullable = false, length = 50)
    private String name;

    @Column(nullable = false, columnDefinition = "TINYINT DEFAULT 1")
    private Boolean status = true;

    //Relaciones
    @OneToMany(mappedBy = "academy", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Candidate> candidates;

}
