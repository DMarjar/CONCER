package mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos;

import lombok.*;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Person;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CandidateDtos {
    private long id;

    private LocalDate fechaFin;
    @NotNull
    @NotBlank
    private Estado estado;
    private Boolean status=true;

    private double puntaje;
    @NotNull
    @NotBlank
    private Certification certification;

    private String pictureUrl;
    private String pictureBase64;

    private String clave;

    private char Grupo;
    @NotNull
    @NotBlank
    private Person person;
    @NotNull
    @NotBlank
    private Academy academy;

    public Candidate castToCandidate() {
        return new Candidate(
                this.id,
                this.fechaFin,
                this.estado,
                this.status,
                this.puntaje,
                this.pictureUrl,
                this.clave,
                this.Grupo,
                this.certification,
                this.person,
                this.academy
        );
    }
    //aaa
}
