package mx.edu.utez.serviciosIntegradora.service.user;

import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.model.person.PersonRepository;
import mx.edu.utez.serviciosIntegradora.model.user.User;
import mx.edu.utez.serviciosIntegradora.model.user.UserRepository;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private  PersonRepository personRepository;

    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<User>> getAll(){
        return new CustomResponse<>(
                this.userRepository.findAll(),false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<User> getOne(Long id){
        return new CustomResponse<>(
                this.userRepository.findById(id).get(),false,200,"ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<User> insert(User user){
        if(this.userRepository.existsByUsername(user.getUsername())){
            return new CustomResponse<>(null,true,400,"ya existe");
        }
        return new CustomResponse<>(
                this.userRepository.saveAndFlush(user),false,200,"ok"
        );
    }

    //update
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<User> update(User user){
        if((!this.userRepository.existsById(user.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        return new CustomResponse<>(
                this.userRepository.saveAndFlush(user),false,200,"ok"
        );
    }

    //delate
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<User> delete(User user){
        Optional<User> exists = this.userRepository.findById(user.getId());
        if((!exists.isPresent())){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        this.userRepository.deleteById(user.getId());
        return new CustomResponse<>(
                null,false,200,"ok"
        );
    }

    // update status
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Boolean> changeStatus(User user) {
        if (!this.userRepository.updateStatusById(user.getId(), user.getStatus())) {
            return new CustomResponse<>(null, true, 400, "Error update status");
        }
        return new CustomResponse<>(
                this.userRepository.updateStatusById(user.getId(), user.getStatus()), false, 200, "user updated correctly!"
        );
    }

    //getByUsername
    @Transactional(readOnly = true)
    public User getUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    @Transactional(readOnly = true)
    public CustomResponse<Person> getUserByUsername2(String username){
        User user = this.userRepository.findByUsername(username);
        return new CustomResponse<>(this.personRepository.findByUser(user),false,200,"ahh prro");
    }
}
