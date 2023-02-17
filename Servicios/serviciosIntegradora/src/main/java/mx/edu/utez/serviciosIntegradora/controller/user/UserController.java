package mx.edu.utez.serviciosIntegradora.controller.user;

import mx.edu.utez.serviciosIntegradora.controller.user.Dtos.UserDtos;
import mx.edu.utez.serviciosIntegradora.model.user.User;
import mx.edu.utez.serviciosIntegradora.service.user.UserService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/controlCertificaciones/user")
@CrossOrigin(origins = {"*"})
public class UserController {
    @Autowired
    private UserService service;

    // Get all
    @GetMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/user/
    public ResponseEntity<CustomResponse<List<User>>> getAll() {
        return new ResponseEntity<>(
                this.service.getAll(),
                HttpStatus.OK);
    }

    // Get one
    @GetMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/user/{id}
    public ResponseEntity<CustomResponse<User>> getOne(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.getOne(id),
                HttpStatus.OK);
    }

    // Insert
    @PostMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/user/
    public ResponseEntity<CustomResponse<User>> insert(@RequestBody UserDtos user, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "The user already exists"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.insert(user.castToUser()), HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/user/{id}
    public ResponseEntity<CustomResponse<User>> update(@PathVariable("id") Long id, @RequestBody UserDtos user, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the user"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.update(id, user.castToUser()), HttpStatus.OK
        );
    }


    // Update status
    @PatchMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/user/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@PathVariable("id") Long id, @RequestBody UserDtos academy, @Valid BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(
                    new CustomResponse<>(null, true, 400, "There was an error updating the status of the academy"),
                    HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(
                this.service.changeStatus(id, academy.castToUser()), HttpStatus.OK
        );
    }

    //Delete
    @DeleteMapping("/{id}")
    // URL: http://localhost:8080/controlCertificaciones/user/{id}
    public ResponseEntity<CustomResponse<User>> delete(@PathVariable Long id){
        return new ResponseEntity<>(
                this.service.delete(id),
                HttpStatus.OK
        );
    }

}