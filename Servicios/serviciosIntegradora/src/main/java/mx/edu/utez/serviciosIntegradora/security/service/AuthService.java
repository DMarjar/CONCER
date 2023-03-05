package mx.edu.utez.serviciosIntegradora.security.service;


import mx.edu.utez.serviciosIntegradora.model.user.User;
import mx.edu.utez.serviciosIntegradora.security.model.UserAuth;
import mx.edu.utez.serviciosIntegradora.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService implements UserDetailsService {

    @Autowired
    private UserService service;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Obtener el usuario correspondiente al nombre de usuario proporcionado
        User user = service.getUserByUsername(username);
        // Construir un objeto UserDetails a partir del usuario obtenido
        return UserAuth.build(user);
    }
}