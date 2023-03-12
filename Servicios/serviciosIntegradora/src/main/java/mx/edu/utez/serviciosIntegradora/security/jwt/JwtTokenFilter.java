package mx.edu.utez.serviciosIntegradora.security.jwt;

import mx.edu.utez.serviciosIntegradora.security.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtTokenFilter extends OncePerRequestFilter {

    private final static Logger LOGGER = LoggerFactory.getLogger(JwtTokenFilter.class);

    @Autowired
    private JwtProvider provider;
    @Autowired
    private AuthService service;

    // Este método se ejecuta para cada solicitud entrante
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws ServletException, IOException {
        try {
            // Se extrae el token de la solicitud
            String token = getToken(request);
            // Si el token es válido
            if (token != null && provider.validateToken(token)) {
                // Se extrae el nombre de usuario del token
                String username = provider.getUsernameFromToken(token);
                // Se cargan los detalles del usuario a partir del nombre de usuario
                UserDetails userDetails = service.loadUserByUsername(username);
                // Se crea un objeto de autenticación y se establece en el contexto de seguridad de Spring
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                System.out.println(userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception e) {
            // Se registra un error si algo sale mal
            LOGGER.error("Error filter -> " + e.getMessage());
        }
        // Se continua con la cadena de filtros
        chain.doFilter(request, response);
    }

    // Este método se utiliza para extraer el token de la solicitud
    public String getToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer"))
            return header.replace("Bearer ", "");
        return null;
    }
}
