package mx.edu.utez.serviciosIntegradora.model.stats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CertificationStats {
    private String name;
    private String version;
    private int totalCandidates;
    private double averageScore;
    private double passPercentage;
    private double failPercentage;

}
