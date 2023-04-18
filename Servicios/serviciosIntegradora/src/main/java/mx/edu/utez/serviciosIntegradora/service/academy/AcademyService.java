package mx.edu.utez.serviciosIntegradora.service.academy;

import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.academy.AcademyRepository;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AcademyService {

    @Autowired
    private AcademyRepository Repository;

    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<Academy>> getAll(){
        return new CustomResponse<>(
                this.Repository.findAll(),false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<Academy> getOne(Long id){
        return new CustomResponse<>(
                this.Repository.findById(id).get(),false,200,"ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Academy> insert(Academy academy){
        if(this.Repository.existsByName(academy.getName())){
            return new CustomResponse<>(null,true,400,"ya existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(academy),false,200,"ok"
        );
    }

    //update
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Academy> update(Academy academy){
        System.out.println("aaa");
        if((!this.Repository.existsById(academy.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }

        System.out.println("academy = " + academy);
        System.out.println("academy.getId() = " + academy.getId());
        System.out.println("academy.getName() = " + academy.getName());
        System.out.println("academy.fullName() = " + academy.getFullName());
        return new CustomResponse<>(
                this.Repository.saveAndFlush(academy),false,200,"ok"
        );
    }

    // update status
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Boolean> changeStatus(Academy category) {
        if (!this.Repository.updateStatusById(category.getId(), category.getStatus())) {
            return new CustomResponse<>(null, true, 400, "Error update status");
        }
        return new CustomResponse<>(
                this.Repository.updateStatusById(category.getId(), category.getStatus()), false, 200, "Academy updated correctly!"
        );
    }

    //delete
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Academy> delete(Academy academy){
        Optional<Academy> exists = this.Repository.findById(academy.getId());
        if((!exists.isPresent())){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        this.Repository.deleteById(academy.getId());
        return new CustomResponse<>(
                null,false,200,"ok"
        );
    }
}
