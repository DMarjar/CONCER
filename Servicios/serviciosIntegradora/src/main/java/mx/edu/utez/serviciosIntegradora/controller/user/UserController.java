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
    public ResponseEntity<CustomResponse<User>> insert(@Valid @RequestBody UserDtos user) {
        return new ResponseEntity<>(
                this.service.insert(user.castToUser()), HttpStatus.CREATED
        );
    }

    // Update
    @PutMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/user/{id}
    public ResponseEntity<CustomResponse<User>> update(@Valid @RequestBody UserDtos user) {
        return new ResponseEntity<>(
                this.service.update(user.castToUser()), HttpStatus.OK
        );
    }


    // Update status
    @PatchMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/user/{id}
    public ResponseEntity<CustomResponse<Boolean>> patch(@Valid @RequestBody UserDtos user) {
        return new ResponseEntity<>(
                this.service.changeStatus(user.castToUser()), HttpStatus.OK
        );
    }

    //Delete
    @DeleteMapping("/")
    // URL: http://localhost:8080/controlCertificaciones/user/{id}
    public ResponseEntity<CustomResponse<User>> delete(@Valid @RequestBody UserDtos user){
        return new ResponseEntity<>(
                this.service.delete(user.castToUser()),
                HttpStatus.OK
        );
    }

    @PostMapping("/one")
    // URL: http://localhost:8080/controlCertificaciones/user/{id}
    public ResponseEntity<CustomResponse<User>> getByUsername(@Valid @RequestBody UserDtos user){
        System.out.println(user.getUsername());
        return new ResponseEntity<>(
                this.service.getUserByUsername2(user.castToUser().getUsername()),HttpStatus.OK
        );
    }

}