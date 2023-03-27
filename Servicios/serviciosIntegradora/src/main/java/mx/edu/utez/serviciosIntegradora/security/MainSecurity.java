package mx.edu.utez.serviciosIntegradora.security;

import mx.edu.utez.serviciosIntegradora.security.jwt.JwtEntryPoint;
import mx.edu.utez.serviciosIntegradora.security.jwt.JwtTokenFilter;
import mx.edu.utez.serviciosIntegradora.security.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MainSecurity extends WebSecurityConfigurerAdapter {
    @Autowired
    private AuthService service;
    @Autowired
    private JwtEntryPoint entryPoint;

    @Bean
    public JwtTokenFilter jwtTokenFilter(){
        return new JwtTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(service).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Override
    public AuthenticationManager authenticationManager() throws Exception{
        return super.authenticationManager();
    }
    //END POINTS::
    /*
        "/controlCertificaciones/auth/**"
        "/controlCertificaciones/academy/**"
        "/controlCertificaciones/candidate/**"
        "/controlCertificaciones/certification/**"
        "/controlCertificaciones/certifyingCompany/**"
        "/controlCertificaciones/person/**"
        "/controlCertificaciones/user/**"
     */

    /*NO ES LA SEGURIDAD OFICIAL, SOLO ES PARA IR RESTRINGIENDO EN PRUEBA DE TOKENS*/

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/controlCertificaciones/auth/**").permitAll()
                .antMatchers(HttpMethod.GET, "/controlCertificaciones/**").permitAll() // Permitir todos los endpoints con el método GET
                .antMatchers(HttpMethod.POST, "/controlCertificaciones/**").hasAnyAuthority("GESTOR", "ADMIN") // Permitir los endpoints POST solo para GESTOR y ADMIN
                .antMatchers(HttpMethod.PUT, "/controlCertificaciones/**").hasAnyAuthority("GESTOR", "ADMIN") // Permitir los endpoints PUT solo para GESTOR y ADMIN
                .antMatchers(HttpMethod.DELETE, "/controlCertificaciones/**").hasAuthority("ADMIN") // Permitir los endpoints DELETE solo para ADMIN
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(entryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                http.addFilterBefore(jwtTokenFilter(),
                UsernamePasswordAuthenticationFilter.class);

    }

    //EN CASO DE NECESITAR QUITAR LA SEGURIDAD PRO PRUEBAS
/*
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/controlCertificaciones/**").permitAll()
                .and()
                .exceptionHandling().authenticationEntryPoint(entryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                http.addFilterBefore(jwtTokenFilter(),
                UsernamePasswordAuthenticationFilter.class);

    }
*/
}