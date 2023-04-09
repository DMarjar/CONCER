package mx.edu.utez.serviciosIntegradora.model.stats;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GestorStats {
    private String fullName;
    private int totalCandidates;
    private int totalCertifications;
    private double averageScore;
    private double passPercentage;
    private double failPercentage;
}
