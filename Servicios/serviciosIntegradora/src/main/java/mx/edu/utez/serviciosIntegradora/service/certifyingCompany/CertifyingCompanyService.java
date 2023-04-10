package mx.edu.utez.serviciosIntegradora.service.certifyingCompany;

import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompany;
import mx.edu.utez.serviciosIntegradora.model.certifyingCompany.CertifyingCompanyRepository;
import mx.edu.utez.serviciosIntegradora.service.image.ImageService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CertifyingCompanyService {

    @Autowired
    private CertifyingCompanyRepository Repository;
    @Autowired
    private ImageService imageService;




    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<CertifyingCompany>> getAll(){
        List<CertifyingCompany> companies = this.Repository.findAll();
        for (CertifyingCompany c : companies) {
            if (c.getPictureUrl() != null) {
                try {
                    c.setPictureBase64(imageService.getPicture(c.getPictureUrl()));
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                }
            }
        }
        return new CustomResponse<>(
                companies,false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<CertifyingCompany> getOne(Long id){
        CertifyingCompany company = this.Repository.findById(id).get();

        if (company.getPictureUrl() != null) {
            try {
                company.setPictureBase64(imageService.getPicture(company.getPictureUrl()));
                return new CustomResponse<>(
                        company,false,200,"ok"
                );
            } catch (IOException e) {
                return new CustomResponse<>(null,true,400,"error al obtener la imagen");
            }
        }
        return new CustomResponse<>(
                company,false,200,"ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<CertifyingCompany> insert(CertifyingCompany company){
        if(this.Repository.existsByName(company.getName())){
            return new CustomResponse<>(null,true,400,"ya existe");
        }
        try {
            company.setPictureUrl(imageService.savePicture(company.getPictureBase64()));
            return new CustomResponse<>(
                    this.Repository.saveAndFlush(company),false,200,"ok"
            );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new CustomResponse<>(null,true,400,"error al guardar la imagen");
        }
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
