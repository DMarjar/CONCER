package mx.edu.utez.serviciosIntegradora.security.model;

import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.model.user.Role;
import mx.edu.utez.serviciosIntegradora.model.user.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserAuth implements UserDetails {

    private String username; //nombre de usuario
    private String password; //contraseña
    private Person person; //información de la persona asociada al usuario
    private Collection<? extends GrantedAuthority> authorities; //roles asignados al usuario

    //constructor
    public UserAuth(String username, String password, Person person,
                    Collection<? extends GrantedAuthority> authorities) {
        this.username = username; //asigna el nombre de usuario
        this.password = password; //asigna la contraseña
        this.person = person; //asigna la información de la persona asociada al usuario
        this.authorities = authorities; //asigna los roles asignados al usuario
    }

    public static UserAuth build(User user) {
        List<GrantedAuthority> authorities =
                user.getRoles() //obtiene los roles del usuario
                        .stream() //convierte la lista a un stream
                        .map(role -> new SimpleGrantedAuthority(role.name())) //se convierte cada rol en un objeto SimpleGrantedAuthority
                        .collect(Collectors.toList()); //se colectan los objetos SimpleGrantedAuthority en una lista

        return new UserAuth(
                user.getUsername(), //obtiene el nombre de usuario del objeto User y lo asigna
                user.getPassword(), //obtiene la contraseña del objeto User y la asigna
                user.getPerson(), //obtiene la información de la persona asociada al usuario y la asigna
                authorities //asigna la lista de roles convertidos en objetos SimpleGrantedAuthority
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities; //retorna la lista de roles asignados al usuario
    }

    @Override
    public String getPassword() {
        return password; //retorna la contraseña
    }

    @Override
    public String getUsername() {
        return username; //retorna el nombre de usuario
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; //la cuenta nunca expira
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; //la cuenta nunca se bloquea
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; //las credenciales nunca expiran
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
