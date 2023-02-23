package mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos;

import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Person;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class CandidateDtos {
    private long id;
    @NotNull
    @NotBlank
    private String date;
    @NotNull
    @NotBlank
    private Estado estado;
    private Boolean status=true;
    @NotNull
    @NotBlank
    private Certification certification;
    @NotNull
    @NotBlank
    private Person person;
    @NotNull
    @NotBlank
    private Academy academy;

    public Candidate castToCandidate() {
        return new Candidate(
                this.id,
                this.date,
                this.estado,
                this.status,
                this.certification,
                this.person,
                this.academy
        );
    }
}
