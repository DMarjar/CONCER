package mx.edu.utez.serviciosIntegradora.controller.person;

import mx.edu.utez.serviciosIntegradora.controller.person.Dtos.PersonDtos;
import mx.edu.utez.serviciosIntegradora.controller.person.Dtos.PersonRequest;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.service.person.PersonService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/controlCertificaciones/person")
@CrossOrigin(origins = {"*"})
public class PersonController {
    @Autowired
    private PersonService service;

    // Get all
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/person/
    public ResponseEntity<CustomResponse<List<Person>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }

    // Get one by Email
    @PostMapping("/one")
    // URL: http://localhost:8080/controlCertificaciones/person/one
    public ResponseEntity<CustomResponse<Person>> getOneByEmail(@RequestBody PersonRequest personRequest) {
        return new ResponseEntity<>(
                this.service.getOneByEmail(personRequest.getEmail()),
                HttpStatus.OK
        );
    }


    // Update
    @PutMapping("/update")
    // URL: http://localhost:8080/controlCertificaciones/person/{id}
    public ResponseEntity<CustomResponse<Person>> update(@RequestBody Person person) {
        return new ResponseEntity<>(
                this.service.update(person), HttpStatus.OK
        );
    }

    // Update status
    @PatchMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/person/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@Valid @RequestBody PersonDtos person) {
        return new ResponseEntity<>(
                this.service.changeStatus(person.castToPerson()), HttpStatus.OK
        );
    }

    // Delete
    @DeleteMapping("/")
    public ResponseEntity<CustomResponse<Person>> delete(@Valid @RequestBody PersonDtos person){
        return new ResponseEntity<>(
                this.service.delete(person.castToPerson()),
                HttpStatus.OK
        );
    }

    //create User and Person@PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/person/

    @PostMapping("/")
    public ResponseEntity<CustomResponse<Person>> insert(@Valid @RequestBody PersonDtos person) {
        if(person.getUser().getStatus() == null){
            person.getUser().setStatus(true);
        }

        return new ResponseEntity<>(
                this.service.createUserPerson(person.castToPerson()), HttpStatus.CREATED
        );
    }

}
