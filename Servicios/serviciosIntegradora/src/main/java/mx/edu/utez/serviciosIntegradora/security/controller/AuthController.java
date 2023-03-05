package mx.edu.utez.serviciosIntegradora.security.controller;

import mx.edu.utez.serviciosIntegradora.security.controller.dto.LoginDto;
import mx.edu.utez.serviciosIntegradora.security.jwt.JwtProvider;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/controlCertificaciones/auth")
@CrossOrigin(origins = {"*"})
public class AuthController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtProvider provider;

    @PostMapping("/inicioSesion")
    public ResponseEntity<CustomResponse<Map<String, Object>>> login(
            @Valid @RequestBody LoginDto loginDto
    ) {
        // se autentica el usuario con el AuthenticationManager usando el username y password
        Authentication authentication = manager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(),
                        loginDto.getPassword()
                )
        );

        // se establece el contexto de seguridad para el usuario autenticado
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // se genera el token JWT para el usuario autenticado
        String token = provider.generateToken(authentication);

        // se obtiene el objeto UserDetails del usuario autenticado
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // se crean los datos de respuesta que incluyen el token y la información del usuario
        Map<String, Object> data = new HashMap<>();
        data.put("token", token);
        data.put("user", userDetails);

        // se devuelve la respuesta con los datos y el estado OK
        return new ResponseEntity<>(
                new CustomResponse<>(data, false, 200, "OK"),
                HttpStatus.OK
        );
    }
}