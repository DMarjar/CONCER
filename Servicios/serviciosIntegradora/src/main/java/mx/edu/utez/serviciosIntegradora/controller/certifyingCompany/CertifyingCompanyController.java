package mx.edu.utez.serviciosIntegradora.controller.certifyingCompany;

import mx.edu.utez.serviciosIntegradora.controller.certifyingCompany.Dtos.CertifyingCompanyDtos;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.service.certifyingCompany.CertifyingCompanyService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
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

    //get Images
    @GetMapping("/images")
    // URL: http://localhost:8080/controlCertificaciones/certifyingCompany/images
    public ResponseEntity<CustomResponse<List<String>>> getImages() throws IOException {
        return new ResponseEntity<>(
                this.service.getImgs(),
                HttpStatus.OK);
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/cerifyingCompany/
    public ResponseEntity<CustomResponse<CertifyingCompany>> insert(@RequestBody CertifyingCompanyDtos certifyingCompany) {
        certifyingCompany.setStatus(true);
        return new ResponseEntity<>(
                this.service.insert(certifyingCompany.castToCertifyingCompany()), HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/cerifyingCompany/{id}
    public ResponseEntity<CustomResponse<CertifyingCompany>> update(@Valid @RequestBody CertifyingCompanyDtos certifyingCompany) {
        certifyingCompany.setStatus(true);
        return new ResponseEntity<>(
                this.service.update(certifyingCompany.castToCertifyingCompany()), HttpStatus.OK
        );
    }


    // Update status
    @PatchMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/cerifyingCompany/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@Valid @RequestBody CertifyingCompanyDtos certifyingCompany) {
        return new ResponseEntity<>(
                this.service.changeStatus(certifyingCompany.castToCertifyingCompany()), HttpStatus.OK
        );
    }

    //Delete
    @DeleteMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certifyingCompany/{id}
    public ResponseEntity<CustomResponse<CertifyingCompany>> delete(@Valid @RequestBody CertifyingCompanyDtos certifyingCompany){
        return new ResponseEntity<>(
                this.service.delete(certifyingCompany.castToCertifyingCompany()),
                HttpStatus.OK
        );
    }

}