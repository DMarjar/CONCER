package mx.edu.utez.serviciosIntegradora.model.academy;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Academy")
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
    private List<Candidate> candidates;

    public Academy(Long id, String name, Boolean status, List<Candidate> candidates) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.candidates = candidates;
    }

}
