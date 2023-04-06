package mx.edu.utez.serviciosIntegradora.controller.stats.Dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import mx.edu.utez.serviciosIntegradora.model.stats.CertificationStats;

@Data
@NoArgsConstructor
public class CertificationStatsDto {
        private String name;
        private String version;
        private int totalCandidates;
        private double averageScore;
        private double passPercentage;
        private double failPercentage;

        public CertificationStats castToCertificationStats() {
            return new CertificationStats(
                    this.name,
                    this.version,
                    this.totalCandidates,
                    this.averageScore,
                    this.passPercentage,
                    this.failPercentage
            );
        }
}
