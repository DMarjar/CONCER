package mx.edu.utez.serviciosIntegradora.controller.certification;

import mx.edu.utez.serviciosIntegradora.controller.certification.Dtos.CertificationDtos;
import mx.edu.utez.serviciosIntegradora.controller.certification.Dtos.ImageCertificationRequest;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.service.certification.CertificationService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
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
    public ResponseEntity<CustomResponse<List<Object[]>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }



    // Get one
    @GetMapping("/one")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Certification>> getOne(@RequestBody Certification certification){
        return new ResponseEntity<>(
                this.service.getOne(certification.getId()),
                HttpStatus.OK);
    }

    //get images
    @GetMapping("/images")
    // URL: http://localhost:8080/controlCertificaciones/certification/images
    public ResponseEntity<CustomResponse<List<Certification>>> getImages() throws IOException {
        return new ResponseEntity<>(
                this.service.getImages(),
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
    @PutMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Certification>> update(@Valid @RequestBody CertificationDtos certification) {
        return new ResponseEntity<>(
                this.service.update(certification.castToCertification()), HttpStatus.OK
        );
    }


    // Update status
    @PatchMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@Valid @RequestBody CertificationDtos certification) {

        return new ResponseEntity<>(
                this.service.changeStatus(certification.castToCertification()), HttpStatus.OK
        );
    }

    //update image
    @PutMapping("/image")
    // URL: http://localhost:8080/controlCertificaciones/certification/image
    public ResponseEntity<CustomResponse<Certification>> updateImage(@Valid @RequestBody ImageCertificationRequest certification) throws IOException {
        return new ResponseEntity<>(
                this.service.updateImage(certification), HttpStatus.OK
        );
    }


    //Delete
    @DeleteMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Certification>> delete(@Valid @RequestBody CertificationDtos certification){
        return new ResponseEntity<>(
                this.service.delete(certification.castToCertification()),
                HttpStatus.OK
        );
    }

}
