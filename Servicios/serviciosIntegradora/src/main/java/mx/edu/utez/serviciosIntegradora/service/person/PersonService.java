package mx.edu.utez.serviciosIntegradora.service.person;

import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompanyRepository;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.model.person.PersonRepository;
import mx.edu.utez.serviciosIntegradora.model.user.User;
import mx.edu.utez.serviciosIntegradora.model.user.UserRepository;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PersonService {

    //INYECCIONES-----------------------------------------------------------------------------------------------
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;


    //METODOS---------------------------------------------------------------------------------------------------

    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<Person>> getAll(){
        return new CustomResponse<>(
                this.personRepository.findAll(),false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<Person> getOne(Long id){
        return new CustomResponse<>(
                this.personRepository.findById(id).get(),false,200,"ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Person> insert(Person person){
        if(this.personRepository.existsByEmail(person.getEmail())){
            return new CustomResponse<>(null,true,400,"ya existe");
        }
        return new CustomResponse<>(
                this.personRepository.saveAndFlush(person),false,200,"ok"
        );
    }

    //update
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Person> update(Person person){
        if((!this.personRepository.existsById(person.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        return new CustomResponse<>(
                this.personRepository.saveAndFlush(person),false,200,"ok"
        );
    }

    //delate
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Person> delete(Person person){
        Optional<Person> exists = this.personRepository.findById(person.getId());
        if((!exists.isPresent())){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        this.personRepository.deleteById(person.getId());
        return new CustomResponse<>(
                null,false,200,"ok"
        );
    }

    // update status
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Boolean> changeStatus(Person person) {
        if (!this.personRepository.updateStatusById(person.getId(), person.getStatus())) {
            return new CustomResponse<>(null, true, 400, "Error update status");
        }
        return new CustomResponse<>(
                this.personRepository.updateStatusById(person.getId(), person.getStatus()), false, 200, "person updated correctly!"
        );
    }


    //creacion de usuario y persona
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Person> createUserPerson(Person person){
        if(this.userRepository.existsByUsername(person.getUser().getUsername())){
            return new CustomResponse<>(null,true,400,"el usuario ya existe");
        }
        if(this.personRepository.existsByEmail(person.getEmail())){
            return new CustomResponse<>(null,true,400,"el correo electronico ya fue registrado");
        }

        person.getUser().setPassword(
                encoder.encode(person.getUser().getPassword())
        );

        User newUser =  userRepository.saveAndFlush(person.getUser());

        person.setUser(newUser);

        return new CustomResponse<>(this.personRepository.saveAndFlush(person), false, 200, "persona guardada esplendidamente");

    }


}
