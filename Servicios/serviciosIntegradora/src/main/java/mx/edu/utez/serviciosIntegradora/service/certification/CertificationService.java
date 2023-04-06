package mx.edu.utez.serviciosIntegradora.service.certification;

import mx.edu.utez.serviciosIntegradora.controller.certification.Dtos.ImageCertificationRequest;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.CandidateRepository;
import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.certification.CertificationRepository;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class CertificationService {
    @Autowired
    private CertificationRepository Repository;

    @Value("${spring.os}")
    private String os;

    String separator = FileSystems.getDefault().getSeparator();



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
        Certification certification = this.Repository.findById(id).get();
        if(certification != null){

            if(certification.getPictureUrl() != null){
                try {
                    Resource resource = new FileSystemResource(certification.getPictureUrl());

                    byte[] pictureData = StreamUtils.copyToByteArray(resource.getInputStream());

                    String pictureBase64 = Base64.getEncoder().encodeToString(pictureData);

                    certification.setPictureBase64(pictureBase64);

                    return new CustomResponse<>(
                            certification,false,200,"ok"
                    );

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

        }
        return new CustomResponse<>(
                null,true,400,"no existe"
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
    public CustomResponse<Certification> update(Certification certification){
        if((!this.Repository.existsById(certification.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(certification),false,200,"ok"
        );
    }

    //actualizar imagen
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Certification> updateImage(ImageCertificationRequest certification) throws IOException {
        if((!this.Repository.existsById(certification.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }

        try {
            Certification certificationUpdateImage = this.Repository.findById(certification.getId()).get();

            byte[] image = Base64.getDecoder().decode(certification.getPicture());

            String nombreImage = UUID.randomUUID().toString()+".png";
            String imagePath = os + separator + nombreImage;

            Files.write(Paths.get(imagePath),image);

            certificationUpdateImage.setPictureUrl(os + nombreImage);

            return new CustomResponse<>(
                    this.Repository.saveAndFlush(certificationUpdateImage),false,200,"ok"
            );
        }catch (IOException e){
            return new CustomResponse<>(null,true,400,"error");
        }

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
}
