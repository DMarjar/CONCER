package mx.edu.utez.serviciosIntegradora.controller.stats;

import mx.edu.utez.serviciosIntegradora.model.stats.*;
import mx.edu.utez.serviciosIntegradora.service.stats.StatsService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/controlCertificaciones/stats")
@CrossOrigin(origins = {"*"})
public class StatsController {

    @Autowired
    private StatsService service;

    // Get general stats
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/stats/
    public ResponseEntity<CustomResponse<List<GeneralStats>>> getGeneralStats() {
        return new ResponseEntity<>(this.service.getGeneralStats(), HttpStatus.OK);
    }

    // Get candidate stats
    @GetMapping("/candidate")
    // URL: http://localhost:8080/controlCertificaciones/stats/candidate
    public ResponseEntity<CustomResponse<List<CandidateStats>>> getCandidateStats() {
        return new ResponseEntity<>(this.service.getCandidateStats(), HttpStatus.OK);
    }

    // Get certifications stats
    @GetMapping("/certification")
    // URL: http://localhost:8080/controlCertificaciones/stats/certification
    public ResponseEntity<CustomResponse<List<CertificationStats>>> getCertificationStats() {
        return new ResponseEntity<>(this.service.getCertificationStats(), HttpStatus.OK);
    }

    // Get academy stats
    @GetMapping("/academy")
    // URL: http://localhost:8080/controlCertificaciones/stats/academy
    public ResponseEntity<CustomResponse<List<AcademyStats>>> getAcademyStats() {
        return new ResponseEntity<>(this.service.getAcademyStats(), HttpStatus.OK);
    }

    // Get gestor stats
    @GetMapping("/gestor")
    // URL: http://localhost:8080/controlCertificaciones/stats/gestor
    public ResponseEntity<CustomResponse<List<GestorStats>>> getGestorStats() {
        return new ResponseEntity<>(this.service.getGestorStats(), HttpStatus.OK);
    }

}
