package mx.edu.utez.serviciosIntegradora.controller.certification;

import mx.edu.utez.serviciosIntegradora.controller.certification.Dtos.CertificationDtos;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.service.certification.CertificationService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/controlCertificaciones/certification")
@CrossOrigin(origins = {"*"})
public class CertificationController {
    @Autowired
    private CertificationService service;

    // Get all
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certification/
    public ResponseEntity<CustomResponse<List<Certification>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }

    // Get one
    @GetMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Certification>> getOne(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certification/
    public ResponseEntity<CustomResponse<Certification>> insert(@RequestBody CertificationDtos certification, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "The certification already exists"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.insert(certification.castToCertification()), HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Certification>> update(@PathVariable("id") Long id, @RequestBody CertificationDtos certification, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the certification"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.update(id, certification.castToCertification()), HttpStatus.OK
        );
    }


    // Update status
    @PatchMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@PathVariable("id") Long id, @RequestBody CertificationDtos certification, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the status of the certification"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.changeStatus(id, certification.castToCertification()), HttpStatus.OK
        );
    }

    //Delete
    @DeleteMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Certification>> delete(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }

}
