package mx.edu.utez.serviciosIntegradora.model.stats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateStats {
    private String mostPopularCertification;
    private int mostPopularCertificationCount;
    private double mostPopularCertificationAverageScore;
    private String leastPopularCertification;
    private int leastPopularCertificationCount;
    private double leastPopularCertificationAverageScore;
    private String bestScoreCertification;
    private double bestScoreCertificationScore;
    private String worstScoreCertification;
    private double worstScoreCertificationScore;
}
