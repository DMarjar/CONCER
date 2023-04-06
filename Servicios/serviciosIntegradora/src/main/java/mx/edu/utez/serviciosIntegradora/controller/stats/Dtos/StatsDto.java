package mx.edu.utez.serviciosIntegradora.controller.stats.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.stats.GeneralStats;

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

    public GeneralStats castToStats() {
        return new GeneralStats(
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
