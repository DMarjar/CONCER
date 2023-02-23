package mx.edu.utez.serviciosIntegradora.controller.person;

import mx.edu.utez.serviciosIntegradora.controller.person.Dtos.PersonDtos;
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

    // Get one
    @GetMapping("/{id}")
    public ResponseEntity<CustomResponse<Person>> getOne(@PathVariable Long id) {
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/person/
    public ResponseEntity<CustomResponse<Person>> insert(@Valid @RequestBody PersonDtos person) {
        return new ResponseEntity<>(
                this.service.insert(person.castToPerson()), HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/person/{id}
    public ResponseEntity<CustomResponse<Person>> update(@Valid @RequestBody PersonDtos person) {
        return new ResponseEntity<>(
                this.service.update(person.castToPerson()), HttpStatus.OK
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

}
