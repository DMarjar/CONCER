package mx.edu.utez.serviciosIntegradora.controller.candidate;

import mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos.CandidateDtos;
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

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/
    public ResponseEntity<CustomResponse<Candidate>> insert(@RequestBody CandidateDtos candidate, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "The candidate already exists"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.insert(candidate.castToCandidate()), HttpStatus.CREATED
        );
    }

    // Get one
    @GetMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Candidate>> getOne(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    // Update
    @PutMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Candidate>> update(@PathVariable("id") Long id, @RequestBody CandidateDtos candidate, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the candidate"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.update(id, candidate.castToCandidate()), HttpStatus.OK
        );
    }


    // Update status
    @PatchMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@PathVariable("id") Long id, @RequestBody CandidateDtos candidate, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the status of the candidate"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.changeStatus(id, candidate.castToCandidate()), HttpStatus.OK
        );
    }

    //Delete
    @DeleteMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Candidate>> delete(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }

}