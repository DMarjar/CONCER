package mx.edu.utez.serviciosIntegradora.security.jwt;

import io.jsonwebtoken.*;
import mx.edu.utez.serviciosIntegradora.security.model.UserAuth;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    public final static Logger LOGGER = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${jwt.secret}") //valor de la propiedad jwt.secret definida en el archivo de propiedades application.properties
    private String secret;

    @Value("${jwt.expiration}") //valor de la propiedad jwt.expiration definida en el archivo de propiedades application.properties
    private int expiration;

    //Genera un token JWT a partir de la autenticación del usuario
    public String generateToken(Authentication authentication) {
        UserAuth userAuth = (UserAuth) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userAuth.getUsername()) //nombre de usuario

                .setIssuedAt(new Date()) //fecha de creación del token
                .setExpiration(new Date(new Date().getTime() + expiration * 1000L)) //fecha de expiración del token
                .signWith(SignatureAlgorithm.HS512, secret).compact(); //firmado del token con el algoritmo HS512 y la clave secreta
    }

    //Obtiene el nombre de usuario a partir del token JWT
    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(secret)
                .parseClaimsJws(token).getBody().getSubject();
    }

    //Valida si un token JWT es válido o no
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            LOGGER.error("Token mal formado");
        } catch (UnsupportedJwtException e) {
            LOGGER.error("Token no soportado");
        } catch (ExpiredJwtException e) {
            LOGGER.error("Token expirado");
        } catch (IllegalArgumentException e) {
            LOGGER.error("Token no provisto");
        } catch (SignatureException e) {
            LOGGER.error("Error en la firma del token");
        }
        return false;
    }
}
