package mx.edu.utez.serviciosIntegradora.security.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtEntryPoint implements AuthenticationEntryPoint {
    private final static Logger LOGGER = LoggerFactory.getLogger(JwtEntryPoint.class);

    // Este método es invocado por Spring Security cuando se produce un error de autenticación
    // y se trata de acceder a una URL protegida.
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        LOGGER.error("Error commence -> UNAUTHORIZED");

        // Devuelve un código de error 401 no autorizado.
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No autorizado");
    }
}
