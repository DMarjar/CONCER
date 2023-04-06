package mx.edu.utez.serviciosIntegradora.service.stats;

import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.CandidateRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;
import mx.edu.utez.serviciosIntegradora.model.certification.CertificationRepository;
import mx.edu.utez.serviciosIntegradora.model.stats.Stats;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    //getStats
    @Transactional(readOnly = true)
    public CustomResponse<Stats> getAll() {
        Stats stats = new Stats();
        stats.setTotalCertifications(this.certificationRepository.countAllBy());
        stats.setTotalCandidates(this.candidateRepository.countAllBy());
        stats.setTotalPendingCandidates(this.candidateRepository.countAllByEstado(Estado.PENDIENTE));
        stats.setTotalFinishedCandidates(this.candidateRepository.countAllByEstado(Estado.ENTREGADO));
        stats.setAverageScore(this.getAverageScore(this.candidateRepository.findAll()));
        stats.setPendingPercentage(this.getPendingPercentage(this.candidateRepository.findAll()));
        stats.setFinishedPercentage(this.getFinishedPercentage(this.candidateRepository.findAll()));
        stats.setCandidates(this.candidateRepository.findAll());
        return new CustomResponse<>(stats, false, 200, "OK");
    }

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
