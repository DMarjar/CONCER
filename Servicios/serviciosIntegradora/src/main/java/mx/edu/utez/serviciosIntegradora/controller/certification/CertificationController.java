package mx.edu.utez.serviciosIntegradora.controller.certification;

import mx.edu.utez.serviciosIntegradora.controller.certification.Dtos.CertificationDtos;
import mx.edu.utez.serviciosIntegradora.controller.certification.Dtos.CertificationRequest;
import mx.edu.utez.serviciosIntegradora.controller.certification.Dtos.ImageCertificationRequest;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.academy.AcademyRepository;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompanyRepository;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.model.person.PersonRepository;
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
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private CertifyingCompanyRepository companyRepository;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Get all
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certification/
    public ResponseEntity<CustomResponse<List<Object[]>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }

    //get all withou images
    @GetMapping("/withoutImages")
    // URL: http://localhost:8080/controlCertificaciones/certification/withoutImages
    public ResponseEntity<CustomResponse<List<Certification>>> getAllWithoutImages() {
        return new ResponseEntity<>(
                this.service.getAllWithoutImages(),
                HttpStatus.OK);
    }

    // Get one
    @PostMapping("/one/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<List<Object[]>>> getOne(@PathVariable Long id){
        System.out.println("idddddddddddddddddddd : " + id);
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    //get by person
    @PostMapping("/person/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certification/person
    public ResponseEntity<CustomResponse<List<Certification>>> getByPerson(@PathVariable Long id) {
        return new ResponseEntity<>(
                this.service.getByPerson(id),
                HttpStatus.OK);
    }

    //get images
    @GetMapping("/images")
    // URL: http://localhost:8080/controlCertificaciones/certification/images
    public ResponseEntity<CustomResponse<List<String>>> getImages() throws IOException {
        return new ResponseEntity<>(
                this.service.getImages(),
                HttpStatus.OK);
    }

    //get by company
    @GetMapping("/company/{id}")
    // URL: http://localhost:8080/controlCertificaciones/certification/company/{id}
    public ResponseEntity<CustomResponse<List<Certification>>> getByCompany(@PathVariable Long id) {
        return new ResponseEntity<>(
                this.service.getByCompany(id),
                HttpStatus.OK);
    }


    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certification/
    public ResponseEntity<CustomResponse<Certification>> insert(@RequestBody CertificationRequest certification) {
        Certification newCertification = new Certification();
        newCertification.setName(certification.getName());
        newCertification.setVersion(certification.getVersion());
        newCertification.setPictureBase64(certification.getPictureBase64());
        newCertification.setPerson(personRepository.findById(certification.getIdPerson()).get());
        newCertification.setCompany(companyRepository.findById(certification.getIdCompany()).get());
        newCertification.setStatus(true);


        return new ResponseEntity<>(
                this.service.insert(newCertification), HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/certification/{id}
    public ResponseEntity<CustomResponse<Certification>> update(@RequestBody CertificationRequest certification) {
        Certification updateCertification = new Certification();
        updateCertification.setId(certification.getId());
        updateCertification.setName(certification.getName());
        updateCertification.setVersion(certification.getVersion());
        updateCertification.setPictureBase64(certification.getPictureBase64());
        updateCertification.setPerson(personRepository.findById(certification.getIdPerson()).get());
        updateCertification.setCompany(companyRepository.findById(certification.getIdCompany()).get());
        updateCertification.setStatus(true);

        return new ResponseEntity<>(
                this.service.update(updateCertification), HttpStatus.OK
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
