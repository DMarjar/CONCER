package mx.edu.utez.serviciosIntegradora.controller.candidate;

import mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos.CandidateDtos;
import mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos.CandidateRequest;
import mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos.ImageCandidateRequest;
import mx.edu.utez.serviciosIntegradora.model.academy.AcademyRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;
import mx.edu.utez.serviciosIntegradora.model.certification.CertificationRepository;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.model.person.PersonRepository;
import mx.edu.utez.serviciosIntegradora.service.academy.AcademyService;
import mx.edu.utez.serviciosIntegradora.service.candidate.CandidateService;
import mx.edu.utez.serviciosIntegradora.service.certification.CertificationService;
import mx.edu.utez.serviciosIntegradora.service.person.PersonService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.ls.LSOutput;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/controlCertificaciones/candidate")
@CrossOrigin(origins = {"*"})
public class CandidateController {
    @Autowired
    private CandidateService service;
    @Autowired
    private PersonRepository personService;
    @Autowired
    private CertificationRepository certificationService;
    @Autowired
    private AcademyRepository academyService;

    // Get all
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/
    public ResponseEntity<CustomResponse<List<Object[]>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }

    // Get one
    @PostMapping("/one/{id}")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<List<Object[]>>> getOne(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    //get by certifier
    @PostMapping("/certifier/{id}")
    public ResponseEntity<CustomResponse<List<Object[]>>> getByCertifier(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.getByCertifier(id),
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
    public ResponseEntity<CustomResponse<List<Object[]>>> getInformationCandidature(@RequestBody Person person) throws IOException {

        return new ResponseEntity<>(

                this.service.getCandidatureInformation(person), HttpStatus.OK
        );
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/
    public ResponseEntity<CustomResponse<Candidate>> insert(@RequestBody CandidateRequest candidate) {
        Candidate newCandidate = new Candidate();
        newCandidate.setPerson(this.personService.findById(candidate.getIdPerson()).get());
        newCandidate.setCertification(this.certificationService.findById(candidate.getIdCertification()).get());
        newCandidate.setAcademy(this.academyService.findById(candidate.getIdAcademy()).get());
        newCandidate.setEstado(Estado.PENDIENTE);
        newCandidate.setStatus(true);
        newCandidate.setFechaFin(candidate.getFechaFin());
        newCandidate.setPuntaje(candidate.getPuntaje());
        newCandidate.setGrupo(candidate.getGrupo());
        newCandidate.setClave(candidate.getClave());

        System.out.println(candidate.getFechaFin());
        return new ResponseEntity<>(
                this.service.insert(newCandidate), HttpStatus.CREATED
        );
    }

    //update Estado and load image
    @PostMapping("/estado")
    public ResponseEntity<CustomResponse<Candidate>> updateEstado(@RequestBody ImageCandidateRequest candidate){
        System.out.println(candidate.getId());
        System.out.println(candidate.getPicture());
        return new ResponseEntity<>(

                this.service.updateWithImage(candidate), HttpStatus.OK
        );
    }


    // Update
    @PutMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/candidate/{id}
    public ResponseEntity<CustomResponse<Candidate>> update(@RequestBody CandidateRequest candidate) {

        Candidate updateCandidate = new Candidate();
        updateCandidate.setId(candidate.getId());

        updateCandidate.setPerson(this.personService.findById(candidate.getIdPerson()).get());
        updateCandidate.setCertification(this.certificationService.findById(candidate.getIdCertification()).get());
        updateCandidate.setAcademy(this.academyService.findById(candidate.getIdAcademy()).get());
        updateCandidate.setEstado(Estado.PENDIENTE);
        updateCandidate.setStatus(true);
        updateCandidate.setFechaFin(candidate.getFechaFin());
        updateCandidate.setPuntaje(candidate.getPuntaje());
        updateCandidate.setGrupo(candidate.getGrupo());
        updateCandidate.setClave(candidate.getClave());

        return new ResponseEntity<>(
                this.service.update(updateCandidate), HttpStatus.OK
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