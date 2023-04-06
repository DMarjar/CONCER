package mx.edu.utez.serviciosIntegradora.service.stats;

import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.CandidateRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;
import mx.edu.utez.serviciosIntegradora.model.certification.CertificationRepository;
import mx.edu.utez.serviciosIntegradora.model.stats.CertificationStats;
import mx.edu.utez.serviciosIntegradora.model.stats.GeneralStats;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class StatsService {

    //INYECCIONES-----------------------------------------------------------------------------------------------
    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    //METODOS---------------------------------------------------------------------------------------------------

    // Get general stats
    @Transactional(readOnly = true)
    public CustomResponse<GeneralStats> getGeneralStats() {
        GeneralStats generalStats = new GeneralStats();
        generalStats.setTotalCertifications((int) this.certificationRepository.count());
        generalStats.setTotalCandidates((int) this.candidateRepository.count());
        generalStats.setTotalPendingCandidates(this.candidateRepository.countAllByEstado(Estado.PENDIENTE));
        generalStats.setTotalFinishedCandidates(this.candidateRepository.countAllByEstado(Estado.ENTREGADO));
        generalStats.setAverageScore(this.getAverageScore(this.candidateRepository.findAll()));
        generalStats.setPendingPercentage(this.getPendingPercentage(this.candidateRepository.findAll()));
        generalStats.setFinishedPercentage(this.getFinishedPercentage(this.candidateRepository.findAll()));
        generalStats.setCandidates(this.candidateRepository.findAll());
        return new CustomResponse<>(generalStats, false, 200, "OK");
    }

    // Get certifications stats
    // TODO: Optimizar el metodo para evitar la conversion de Object[] a CertificationStats
    @Transactional(readOnly = true)
    public CustomResponse<List<CertificationStats>> getCertificationStats() {
        List<Object[]> queryResult = this.certificationRepository.findCertificationStats();
        List<CertificationStats> certificationStatsList = new ArrayList<>();
        for (Object[] row : queryResult) {
            System.out.println(row[0] + " " + row[1] + " " + row[2] + " " + row[3] + " " + row[4] + " " + row[5]);
            CertificationStats certificationStats = new CertificationStats();
            certificationStats.setName((String) row[0]);
            certificationStats.setVersion((String) row[1]);
            certificationStats.setTotalCandidates(((BigInteger) row[2]).intValue());
            certificationStats.setAverageScore(((BigDecimal) row[3]).doubleValue());
            certificationStats.setPassPercentage(((BigDecimal) row[4]).doubleValue());
            certificationStats.setFailPercentage(((BigDecimal) row[5]).doubleValue());
            certificationStatsList.add(certificationStats);
        }
        return new CustomResponse<>(certificationStatsList, false, 200, "OK");
    }


    // Metodos auxiliares
    public double getAverageScore(List<Candidate> candidateList) {
        double averageScore = 0;
        for (Candidate candidate : candidateList) {
            averageScore += candidate.getPuntaje();
        }
        return averageScore / candidateList.size();
    }

    public double getPendingPercentage(List<Candidate> candidateList) {
        double pendingPercentage = 0;
        for (Candidate candidate : candidateList) {
            if (candidate.getEstado().equals(Estado.PENDIENTE)) {
                pendingPercentage++;
            }
        }
        return pendingPercentage / candidateList.size() * 100;
    }

    public double getFinishedPercentage(List<Candidate> candidateList) {
        double finishedPercentage = 0;
        for (Candidate candidate : candidateList) {
            if (candidate.getEstado().equals(Estado.ENTREGADO)) {
                finishedPercentage++;
            }
        }
        return finishedPercentage / candidateList.size() * 100;
    }
}
