package mx.edu.utez.serviciosIntegradora.service.certifyingCompany;

import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompanyRepository;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CertifyingCompanyService {

    @Autowired
    private CertifyingCompanyRepository Repository;

    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<CertifyingCompany>> getAll(){
        return new CustomResponse<>(
                this.Repository.findAll(),false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<CertifyingCompany> getOne(Long id){
        return new CustomResponse<>(
                this.Repository.findById(id).get(),false,200,"ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<CertifyingCompany> insert(CertifyingCompany company){
        if(this.Repository.existsByName(company.getName())){
            return new CustomResponse<>(null,true,400,"ya existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(company),false,200,"ok"
        );
    }

    //update
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<CertifyingCompany> update(CertifyingCompany company){
        if((!this.Repository.existsById(company.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(company),false,200,"ok"
        );
    }

    //delate
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<CertifyingCompany> delete(CertifyingCompany company){
        Optional<CertifyingCompany> exists = this.Repository.findById(company.getId());
        if((!exists.isPresent())){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        this.Repository.deleteById(company.getId());
        return new CustomResponse<>(
                null,false,200,"ok"
        );
    }

    // update status
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Boolean> changeStatus(CertifyingCompany company) {
        if (!this.Repository.updateStatusById(company.getId(), company.getStatus())) {
            return new CustomResponse<>(null, true, 400, "Error update status");
        }
        return new CustomResponse<>(
                this.Repository.updateStatusById(company.getId(), company.getStatus()), false, 200, "company updated correctly!"
        );
    }
}
