package mx.edu.utez.serviciosIntegradora.controller.stats;

import mx.edu.utez.serviciosIntegradora.model.stats.CertificationStats;
import mx.edu.utez.serviciosIntegradora.model.stats.GeneralStats;
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
    public ResponseEntity<CustomResponse<GeneralStats>> getGeneralStats() {
        return new ResponseEntity<>(this.service.getGeneralStats(), HttpStatus.OK);
    }

    // Get certifications stats
    @GetMapping("/certifications")
    // URL: http://localhost:8080/controlCertificaciones/stats/certifications
    public ResponseEntity<CustomResponse<List<CertificationStats>>> getCertificationStats() {
        return new ResponseEntity<>(this.service.getCertificationStats(), HttpStatus.OK);
    }

}
