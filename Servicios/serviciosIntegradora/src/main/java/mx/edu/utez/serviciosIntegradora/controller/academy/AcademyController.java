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
//URL: http://localhost:8080/controlCertificaciones/academy/
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
    // URL: http://localhost:8080/controlCertificaciones/academy/
    public ResponseEntity<CustomResponse<Academy>> getOne(@PathVariable Long id) {
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK
        );
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/academy/
    public ResponseEntity<CustomResponse<Academy>> insert(@Valid @RequestBody AcademyDtos academy) {
        academy.setStatus(true);
        return new ResponseEntity<> (
                this.service.insert(academy.castToAcademy()),
                HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/academy/
    public ResponseEntity<CustomResponse<Academy>> update(@Valid @RequestBody AcademyDtos academy) {
        return new ResponseEntity<>(
                this.service.update( academy.castToAcademy()), HttpStatus.OK
        );
    }

   
    // Update status
    @PatchMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/academy/
    public ResponseEntity<CustomResponse<Boolean>> patch(@Valid @RequestBody AcademyDtos academy) {
        return new ResponseEntity<>(
                this.service.changeStatus(academy.castToAcademy()), HttpStatus.OK
        );
    }

    //Delete
    @DeleteMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/academy/
    public ResponseEntity<CustomResponse<Academy>> delete(@Valid @RequestBody AcademyDtos academy){
        return new ResponseEntity<>(
                this.service.delete(academy.castToAcademy()),
                HttpStatus.OK
        );
    }

}
