package mx.edu.utez.serviciosIntegradora.controller.certifyingCompany;

import mx.edu.utez.serviciosIntegradora.controller.certifyingCompany.Dtos.CertifyingCompanyDtos;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.service.certifyingCompany.CertifyingCompanyService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/controlCertificaciones/certifyingCompany")
@CrossOrigin(origins = {"*"})
public class CertifyingCompanyController {
    @Autowired
    private CertifyingCompanyService service;

    // Get all
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/cerifyingCompany/
    public ResponseEntity<CustomResponse<List<CertifyingCompany>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }

    // Get one
    @GetMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certifyingCompany/{id}
    public ResponseEntity<CustomResponse<CertifyingCompany>> getOne(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/cerifyingCompany/
    public ResponseEntity<CustomResponse<CertifyingCompany>> insert(@RequestBody CertifyingCompanyDtos certifyingCompany, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "The certifyingCompany already exists"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.insert(certifyingCompany.castToCertifyingCompany()), HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/cerifyingCompany/{id}
    public ResponseEntity<CustomResponse<CertifyingCompany>> update(@PathVariable("id") Long id, @RequestBody CertifyingCompanyDtos certifyingCompany, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the certifyingCompany"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.update(id, certifyingCompany.castToCertifyingCompany()), HttpStatus.OK
        );
    }


    // Update status
    @PatchMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/cerifyingCompany/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@PathVariable("id") Long id, @RequestBody CertifyingCompanyDtos certifyingCompany, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the status of the certifyingCompany"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.changeStatus(id, certifyingCompany.castToCertifyingCompany()), HttpStatus.OK
        );
    }

    //Delete
    @DeleteMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certifyingCompany/{id}
    public ResponseEntity<CustomResponse<CertifyingCompany>> delete(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }

}