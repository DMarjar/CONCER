package mx.edu.utez.serviciosIntegradora.controller.stats.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.stats.Stats;

import java.util.List;

@Data
@NoArgsConstructor
public class StatsDto {
    private int totalCertifications;
    private int totalCandidates;
    private int totalPendingCandidates;
    private int totalFinishedCandidates;
    private double pendingPercentage;
    private double finishedPercentage;
    private double averageScore;
    private List<Candidate> candidates;

    public Stats castToStats() {
        return new Stats(
                this.totalCertifications,
                this.totalCandidates,
                this.totalPendingCandidates,
                this.totalFinishedCandidates,
                this.pendingPercentage,
                this.finishedPercentage,
                this.averageScore,
                this.candidates
        );
    }
}
