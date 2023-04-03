package mx.edu.utez.serviciosIntegradora.controller.stats;

import mx.edu.utez.serviciosIntegradora.model.stats.Stats;
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

    // Get stats
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/stats/
    public ResponseEntity<CustomResponse<Stats>> getStats() {
        return new ResponseEntity<>(this.service.getAll(), HttpStatus.OK);
    }

}
