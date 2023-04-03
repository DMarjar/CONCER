package mx.edu.utez.serviciosIntegradora.model.stats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Stats {
    private int totalCertifications;
    private int totalCandidates;
    private int totalPendingCandidates;
    private int totalFinishedCandidates;
    private double pendingPercentage;
    private double finishedPercentage;
    private double averageScore;
    private List<Candidate> candidates;
}
