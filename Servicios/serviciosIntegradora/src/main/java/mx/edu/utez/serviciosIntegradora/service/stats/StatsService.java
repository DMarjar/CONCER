package mx.edu.utez.serviciosIntegradora.service.stats;

import mx.edu.utez.serviciosIntegradora.model.academy.AcademyRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.CandidateRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;
import mx.edu.utez.serviciosIntegradora.model.certification.CertificationRepository;
import mx.edu.utez.serviciosIntegradora.model.person.PersonRepository;
import mx.edu.utez.serviciosIntegradora.model.stats.*;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Transactional
public class StatsService {

    //INYECCIONES--------------------------------------------------------------------------------------------------
    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private CandidateRepository candidateRepository;


    //METODOS------------------------------------------------------------------------------------------------------

    @Autowired
    private AcademyRepository academyRepository;

    @Autowired
    private PersonRepository personRepository;

    //METODOS---------------------------------------------------------------------------------------------------


    // Get general stats
    // TODO: Optimizar el metodo para evitar usar el objeto GeneralStats
    @Transactional(readOnly = true)
    public CustomResponse<List<GeneralStats>> getGeneralStats() {
        try {
            List<GeneralStats> listGeneral = new ArrayList<>();
            GeneralStats generalStats = new GeneralStats();
            generalStats.setTotalCertifications((int) this.certificationRepository.count());
            generalStats.setTotalCandidates((int) this.candidateRepository.count());
            generalStats.setTotalPendingCandidates(this.candidateRepository.countAllByEstado(Estado.PENDIENTE));
            generalStats.setTotalFinishedCandidates(this.candidateRepository.countAllByEstado(Estado.ENTREGADO));
            generalStats.setAverageScore(this.getAverageScore(this.candidateRepository.findAll()));
            generalStats.setPendingPercentage(this.getPendingPercentage(this.candidateRepository.findAll()));
            generalStats.setFinishedPercentage(this.getFinishedPercentage(this.candidateRepository.findAll()));
            generalStats.setCandidates(this.candidateRepository.findAll());
            listGeneral.add(generalStats);
            return new CustomResponse<>(listGeneral, false, 200, "OK");
        } catch (Exception e) {
            return new CustomResponse<>(null, true, 500, "Error al obtener las estadisticas generales: " + e.getMessage());
        }
    }

    // Get candidate stats
    @Transactional(readOnly = true)
    public CustomResponse<List<CandidateStats>> getCandidateStats() {
        try {
            Object[] queryResult = this.candidateRepository.findCandidateStats();
            List<CandidateStats> candidateStatsList = new ArrayList<>();
            CandidateStats candidateStats = new CandidateStats();
            candidateStats.setMostPopularCertification((String) ((Object[]) queryResult[0])[0]);
            candidateStats.setMostPopularCertificationCount(((BigInteger) ((Object[]) queryResult[0])[1]).intValue());
            candidateStats.setMostPopularCertificationAverageScore(((BigDecimal) ((Object[]) queryResult[0])[2]).doubleValue());
            candidateStats.setLeastPopularCertification((String) ((Object[]) queryResult[0])[3]);
            candidateStats.setLeastPopularCertificationCount(((BigInteger) ((Object[]) queryResult[0])[4]).intValue());
            candidateStats.setLeastPopularCertificationAverageScore(((BigDecimal) ((Object[]) queryResult[0])[5]).doubleValue());
            candidateStats.setBestScoreCertification((String) ((Object[]) queryResult[0])[6]);
            candidateStats.setBestScoreCertificationScore(((BigDecimal) ((Object[]) queryResult[0])[7]).doubleValue());
            candidateStats.setWorstScoreCertification((String) ((Object[]) queryResult[0])[8]);
            candidateStats.setWorstScoreCertificationScore(((BigDecimal) ((Object[]) queryResult[0])[9]).doubleValue());

            candidateStatsList.add(candidateStats);
            return new CustomResponse<>(candidateStatsList, false, 200, "OK");
        } catch (Exception e) {
            return new CustomResponse<>(null, true, 500, "Error al obtener las estadisticas de los candidatos: " + e.getMessage());
        }
    }

    // Get certifications stats
    // TODO: Optimizar el metodo para evitar la conversion de Object[] a CertificationStats
    @Transactional(readOnly = true)
    public CustomResponse<List<CertificationStats>> getCertificationStats() {
        try {
            List<Object[]> queryResult = this.certificationRepository.findCertificationStats();
            List<CertificationStats> certificationStatsList = new ArrayList<>();
            for (Object[] row : queryResult) {
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
        } catch (Exception e) {
            return new CustomResponse<>(null, true, 500, "Error al obtener las estadisticas de las certificaciones");
        }
    }

    // Get academy stats
    // TODO: Optimizar el metodo para evitar la conversion de Object[] a AcademyStats
    @Transactional(readOnly = true)
    public CustomResponse<List<AcademyStats>> getAcademyStats() {
        try {
            List<Object[]> queryResult = this.academyRepository.findAcademyStats();
            List<AcademyStats> academyStatsList = new ArrayList<>();
            for (Object[] row : queryResult) {
                AcademyStats academyStats = new AcademyStats();
                academyStats.setName((String) row[0]);
                academyStats.setTotalCandidates(((BigInteger) row[1]).intValue());
                academyStats.setAverageScore(((BigDecimal) row[2]).doubleValue());
                academyStats.setPassPercentage(((BigDecimal) row[3]).doubleValue());
                academyStats.setFailPercentage(((BigDecimal) row[4]).doubleValue());
                academyStatsList.add(academyStats);
            }
            return new CustomResponse<>(academyStatsList, false, 200, "OK");
        } catch (Exception e) {
            return new CustomResponse<>(null, true, 500, "Error al obtener las estadisticas de las academias: " + e.getMessage());
        }

    }

    // Get gestor stats
    // TODO: Optimizar el metodo para evitar la conversion de Object[] a GestorStats
    @Transactional(readOnly = true)
    public CustomResponse<List<GestorStats>> getGestorStats() {
        try {
            List<Object[]> queryResult = this.personRepository.findGestorStats();
            List<GestorStats> gestorStatsList = new ArrayList<>();
            for (Object[] row : queryResult) {
                GestorStats gestorStats = new GestorStats();
                gestorStats.setFullName((String) row[0]);
                gestorStats.setCertificationName((String) row[1]);
                gestorStats.setVersion((String) row[2]);
                gestorStats.setTotalCandidates(((BigInteger) row[3]).intValue());
                gestorStats.setAverageScore(((BigDecimal) row[4]).doubleValue());
                gestorStats.setPassPercentage(((BigDecimal) row[5]).doubleValue());
                gestorStats.setFailPercentage(((BigDecimal) row[6]).doubleValue());
                gestorStatsList.add(gestorStats);
            }
            return new CustomResponse<>(gestorStatsList, false, 200, "OK");
        } catch (Exception e) {
            return new CustomResponse<>(null, true, 500, "Error al obtener las estadisticas de los gestores: " + e.getMessage());
        }
    }


    // Metodos auxiliares
    // TODO: Evitar el uso de estos metodos mediante una consulta SQL compleja
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
