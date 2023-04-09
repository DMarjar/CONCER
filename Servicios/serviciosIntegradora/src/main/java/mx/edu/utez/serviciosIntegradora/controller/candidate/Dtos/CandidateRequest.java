package mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class CandidateRequest {
    private Long id;
    private Estado estado;
    private boolean status;
    private Long idAcademy;
    private Long idCertification;
    private Long idPerson;
    private LocalDate fechaFin;
    private double puntaje;
    private char grupo;
    private String clave;

    public Candidate castToCandidate() {
        return new Candidate(
                this.id,
                this.estado,
                this.status,
                this.idAcademy,
                this.idCertification,
                this.idPerson,
                this.fechaFin,
                this.puntaje,
                this.grupo,
                this.clave
        );
    }
}
