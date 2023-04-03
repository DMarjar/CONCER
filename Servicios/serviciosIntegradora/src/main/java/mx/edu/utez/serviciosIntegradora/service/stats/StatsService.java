package mx.edu.utez.serviciosIntegradora.service.stats;

import mx.edu.utez.serviciosIntegradora.model.candidate.CandidateRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;
import mx.edu.utez.serviciosIntegradora.model.certification.CertificationRepository;
import mx.edu.utez.serviciosIntegradora.model.stats.Stats;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        stats.setCandidates(this.candidateRepository.findAll());
        return new CustomResponse<>(stats, false, 200, "OK");
    }
}
