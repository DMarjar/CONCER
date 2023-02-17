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
    private UserRepository Repository;

    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<User>> getAll(){
        return new CustomResponse<>(
                this.Repository.findAll(),false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<User> getOne(Long id){
        return new CustomResponse<>(
                this.Repository.findById(id).get(),false,200,"ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<User> insert(User user){
        if(this.Repository.existsByUsername(user.getUsername())){
            return new CustomResponse<>(null,true,400,"ya existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(user),false,200,"ok"
        );
    }

    //update
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<User> update(Long id,User user){
        if((!this.Repository.existsById(id))){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(user),false,200,"ok"
        );
    }

    //delate
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<User> delete(Long id){
        Optional<User> exists = this.Repository.findById(id);
        if((!exists.isPresent())){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        this.Repository.deleteById(id);
        return new CustomResponse<>(
                null,false,200,"ok"
        );
    }

    // update status
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Boolean> changeStatus(Long id, User user) {
        if (!this.Repository.updateStatusById(id, user.getStatus())) {
            return new CustomResponse<>(null, true, 400, "Error update status");
        }
        return new CustomResponse<>(
                this.Repository.updateStatusById(user.getId(), user.getStatus()), false, 200, "user updated correctly!"
        );
    }
}
