package mx.edu.utez.serviciosIntegradora.service.certification;

import mx.edu.utez.serviciosIntegradora.controller.certification.Dtos.ImageCertificationRequest;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.certification.CertificationRepository;
import mx.edu.utez.serviciosIntegradora.service.image.ImageService;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CertificationService {
    @Autowired
    private CertificationRepository Repository;

    @Autowired
    private ImageService imageService;

    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getAll(){
        return new CustomResponse<>(
                this.Repository.findAllCertifications(),false,200,"ok"
        );
    }

    //get without images
    @Transactional(readOnly = true)
    public CustomResponse<List<Certification>> getAllWithoutImages(){
        return new CustomResponse<>(
                this.Repository.findAll(),false,200,"ok"
        );
    }


    //get by person
    @Transactional(readOnly = true)
    public CustomResponse<List<Certification>> getByPerson(Long id){
        return new CustomResponse<>(
                this.Repository.findCertificationsByPersonId(id),false,200,"ok"
        );
    }

    //getAll Whit Images
    @Transactional
    public CustomResponse<List<String>> getImages() throws IOException {
        List<String> images = this.Repository.findAllImages();
        for (int i = 0; i < images.size(); i++) {
            images.set(i,imageService.getPicture(images.get(i)));
        }
        return new CustomResponse<>(
                images,false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getOne(Long id){
        List<Object[]> certification = this.Repository.findCertification(id);
        if(certification != null){
            if(certification.get(0)[6] != null){
                try {

                    certification.get(0)[2]=(imageService.getPicture((String) certification.get(0)[2]));
                    
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            return new CustomResponse<>(
                    certification,false,200,"ok"
            );
        }
        return new CustomResponse<>(
                null,true,400,"no existe"
        );
    }

    //get by company
    @Transactional(readOnly = true)
    public CustomResponse<List<Certification>> getByCompany(Long id){
        return new CustomResponse<>(
                this.Repository.findCertificationsByCompany(id),false,200,"ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Certification> insert(Certification certification){
        if(this.Repository.existsByNameAndVersion(certification.getName(),certification.getVersion())){
            return new CustomResponse<>(null,true,400,"ya existe");
        }

        try{
            certification.setPictureUrl(imageService.savePicture(certification.getPictureBase64()));
            return new CustomResponse<>(
                    this.Repository.saveAndFlush(certification),false,200,"ok"
            );
        } catch (IOException e) {
            return new CustomResponse<>(null,true,400,"error");
        }
    }

    //update
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Certification> update(Certification certification){
        if((!this.Repository.existsById(certification.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        try{
            certification.setPictureUrl(imageService.savePicture(certification.getPictureBase64()));
            return new CustomResponse<>(
                    this.Repository.saveAndFlush(certification),false,200,"ok"
            );
        } catch (IOException e) {
            return new CustomResponse<>(null,true,400,"error");
        }
    }

    //actualizar imagen
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Certification> updateImage(ImageCertificationRequest certification) throws IOException {
        if((!this.Repository.existsById(certification.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }

        try {
            Certification certificationUpdateImage = this.Repository.findById(certification.getId()).get();
            certificationUpdateImage.setPictureUrl(imageService.savePicture(certification.getPicture()));

            return new CustomResponse<>(
                    this.Repository.saveAndFlush(certificationUpdateImage),false,200,"ok"
            );
        }catch (IOException e){
            return new CustomResponse<>(null,true,400,"error");
        }

    }

    // update status
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Boolean> changeStatus(Certification certification) {
        if (!this.Repository.updateStatusById(certification.getId(), certification.getStatus())) {
            return new CustomResponse<>(null, true, 400, "Error update status");
        }
        return new CustomResponse<>(
                this.Repository.updateStatusById(certification.getId(), certification.getStatus()), false, 200, "certification updated correctly!"
        );
    }

    //delate
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Certification> delete(Certification certification){
        Optional<Certification> exists = this.Repository.findById(certification.getId());
        if((!exists.isPresent())){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        this.Repository.deleteById(certification.getId());
        return new CustomResponse<>(
                null,false,200,"ok"
        );
    }


}
