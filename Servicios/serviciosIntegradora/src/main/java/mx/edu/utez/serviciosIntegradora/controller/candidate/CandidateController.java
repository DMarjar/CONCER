package mx.edu.utez.serviciosIntegradora.controller.candidate;

import mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos.CandidateDtos;
import mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos.ImageCandidateRequest;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.service.candidate.CandidateService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/controlCertificaciones/candidate")
@CrossOrigin(origins = {"*"})
public class CandidateController {
    @Autowired
    private CandidateService service;

    // Get all
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/
    public ResponseEntity<CustomResponse<List<Candidate>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }

    // Get one
    @GetMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Candidate>> getOne(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    //get Information candidaturas
    @PostMapping("/informationEntregadas")
    public  ResponseEntity<CustomResponse<List<Object[]>>> getInformationEntregadas(@RequestBody Person person){

        return new ResponseEntity<>(
                this.service.getInformationENTREGADAS(person), HttpStatus.OK
        );
    }

    //get Information candidaturas
    @PostMapping("/informationPendientes")
    public  ResponseEntity<CustomResponse<List<Object[]>>> getInformationPendientes(@RequestBody Person person){
        return new ResponseEntity<>(
                this.service.getInformationPENDIENTES(person), HttpStatus.OK
        );
    }

    //get information Candidato
    @PostMapping("/candidature")
    public ResponseEntity<CustomResponse<List<Object[]>>> getInformationCandidature(@RequestBody Person person){

        return new ResponseEntity<>(

                this.service.getCandidatureInformation(person), HttpStatus.OK
        );
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/
    public ResponseEntity<CustomResponse<Candidate>> insert(@Valid @RequestBody CandidateDtos candidate) {
        return new ResponseEntity<>(
                this.service.insert(candidate.castToCandidate()), HttpStatus.CREATED
        );
    }

    //update Estado and load image
    @PostMapping("/estado")
    public ResponseEntity<CustomResponse<Candidate>> updateEstado(@RequestBody ImageCandidateRequest candidate){
        System.out.println(candidate.getId());
        return new ResponseEntity<>(
                this.service.updateWithImage(candidate), HttpStatus.OK
        );
    }


    // Update
    @PutMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Candidate>> update(@Valid  @RequestBody CandidateDtos candidate) {
        return new ResponseEntity<>(
                this.service.update(candidate.castToCandidate()), HttpStatus.OK
        );
    }


    // Update status
    @PatchMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@Valid @RequestBody CandidateDtos candidate) {
        return new ResponseEntity<>(
                this.service.changeStatus(candidate.castToCandidate()), HttpStatus.OK
        );
    }


    //Delete
    @DeleteMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Candidate>> delete(@Valid @RequestBody CandidateDtos candidate){
        return new ResponseEntity<>(
                this.service.delete(candidate.castToCandidate()),
                HttpStatus.OK
        );
    }

}