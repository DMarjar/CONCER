package mx.edu.utez.serviciosIntegradora.model.stats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GestorStats {
    private String fullName;
    private String certificationName;
    private String version;
    private int totalCandidates;
    private double averageScore;
    private double passPercentage;
    private double failPercentage;
}
