package mx.edu.utez.serviciosIntegradora.controller.academy;

import mx.edu.utez.serviciosIntegradora.controller.academy.Dtos.AcademyDtos;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.service.academy.AcademyService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/controlCertificaciones/academy")
@CrossOrigin(origins = {"*"})
public class AcademyController {
    @Autowired
    private AcademyService service;

    // Get all
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/academy/
    public ResponseEntity<CustomResponse<List<Academy>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }

    // Get one
    @GetMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/academy/{id}
    public ResponseEntity<CustomResponse<Academy>> getOne(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/academy/
    public ResponseEntity<CustomResponse<Academy>> insert(@RequestBody AcademyDtos academy, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "The academy already exists"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.insert(academy.castToAcademy()), HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/academy/{id}
    public ResponseEntity<CustomResponse<Academy>> update(@PathVariable("id") Long id, @RequestBody AcademyDtos academy, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the academy"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.update(id, academy.castToAcademy()), HttpStatus.OK
        );
    }

   
    // Update status
    @PatchMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/academy/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@PathVariable("id") Long id, @RequestBody AcademyDtos academy, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the status of the academy"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.changeStatus(id, academy.castToAcademy()), HttpStatus.OK
        );
    }

    //Delete
    @DeleteMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/academy/{id}
    public ResponseEntity<CustomResponse<Academy>> delete(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }

}
