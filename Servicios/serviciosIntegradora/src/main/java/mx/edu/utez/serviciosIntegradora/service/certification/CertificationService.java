package mx.edu.utez.serviciosIntegradora.service.certification;

import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.CandidateRepository;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.certification.CertificationRepository;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CertificationService {
    @Autowired
    private CertificationRepository Repository;

    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<Certification>> getAll(){
        return new CustomResponse<>(
                this.Repository.findAll(),false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<Certification> getOne(Long id){
        return new CustomResponse<>(
                this.Repository.findById(id).get(),false,200,"ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Certification> insert(Certification certification){
        if(this.Repository.existsByNameAndVersion(certification.getName(),certification.getVersion())){
            return new CustomResponse<>(null,true,400,"ya existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(certification),false,200,"ok"
        );
    }

    //update
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Certification> update(Long id,Certification certification){
        if((!this.Repository.existsById(id))){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(certification),false,200,"ok"
        );
    }

    //delate
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Certification> delete(Long id){
        Optional<Certification> exists = this.Repository.findById(id);
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
    public CustomResponse<Boolean> changeStatus(Long id, Certification certification) {
        if (!this.Repository.updateStatusById(id, certification.getStatus())) {
            return new CustomResponse<>(null, true, 400, "Error update status");
        }
        return new CustomResponse<>(
                this.Repository.updateStatusById(certification.getId(), certification.getStatus()), false, 200, "certification updated correctly!"
        );
    }
}
