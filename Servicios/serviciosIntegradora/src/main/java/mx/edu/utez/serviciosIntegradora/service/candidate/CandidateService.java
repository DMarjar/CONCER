package mx.edu.utez.serviciosIntegradora.service.candidate;

import mx.edu.utez.serviciosIntegradora.controller.candidate.Dtos.ImageCandidateRequest;
import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.academy.AcademyRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.CandidateRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Estado;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
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
public class CandidateService {
    @Autowired
    private CandidateRepository Repository;
    @Autowired
    private ImageService imageService;



    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getAll(){
        return new CustomResponse<>(
                this.Repository.findALl(),false,200,"ok"
        );
    }

    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getOne(Long id){
        return new CustomResponse<>(
                this.Repository.findCandidateById(id),false,200,"ok"
        );
    }

    //get by certifier
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getByCertifier(Long id){
        return new CustomResponse<>(
                this.Repository.findCandidatesByCertifier(id),false,200,"ok"

        );
    }

    //Certifications PENDIENTEs
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getInformationPENDIENTES(Person person){

        String estado = Estado.PENDIENTE.toString();

        return new CustomResponse<>(
                this.Repository.findCertificationsByPersonId(person.getId(), estado),false,200,"ok"
        );
    }

    //Certifications ENTREGADAS
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getInformationENTREGADAS(Person person){

        String estado = Estado.ENTREGADO.toString();

        return new CustomResponse<>(
                this.Repository.findCertificationsByPersonId(person.getId(), estado),false,200,"ok"
        );
    }

    //Informacion Candidato
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getCandidatureInformation(Person person) throws IOException {
        List<Object[]> candidateInformation = this.Repository.candidateInformation(person.getId());
        //19

        if(candidateInformation.get(0)[19] != null){
            String picture = imageService.getPicture(candidateInformation.get(0)[19].toString());
            candidateInformation.get(0)[19] = picture;
            return new CustomResponse<>(
                    candidateInformation, false, 200, "ok"
            );
        }else {
            candidateInformation.get(0)[19] = "";
            return new CustomResponse<>(
                    candidateInformation, false, 200, "ok"
            );
        }
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Candidate> insert(Candidate candidate){
        if(this.Repository.existsByClave(candidate.getClave())){
            return new CustomResponse<>(null,true,400,"Esa clave de certificacion ya existe");
        }


        return new CustomResponse<>(
                this.Repository.saveAndFlush(candidate),false,200,"ok"
        );
    }

    //update
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Candidate> update(Candidate candidate){
        if((!this.Repository.existsById(candidate.getId()))){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        return new CustomResponse<>(
                this.Repository.saveAndFlush(candidate),false,200,"ok"
        );
    }

    //update estado and load image
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Candidate> updateWithImage(ImageCandidateRequest candidate){

        Candidate candidateChangeState = this.Repository.findById(candidate.getId()).get();

        if(candidateChangeState != null){
            try{
                candidateChangeState.setPictureUrl(imageService.savePicture(candidate.getPicture()));
                candidateChangeState.setEstado(Estado.ENTREGADO);
                return new CustomResponse<>(
                        this.Repository.saveAndFlush(candidateChangeState),false,200,"ok"
                );

            } catch (IOException e) {
                return new CustomResponse<>(null,true,400,"no se pudo guardar la imagen");
            }
        }
        return new CustomResponse<>(null,true,400,"no existe");
    }

    //delate
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Candidate> delete(Long id){
        Optional<Candidate> exists = this.Repository.findById(id);
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
    public CustomResponse<Boolean> changeStatus(Candidate candidate) {
        if (!this.Repository.updateStatusById(candidate.getId(), candidate.getStatus())) {
            return new CustomResponse<>(null, true, 400, "Error update status");
        }
        return new CustomResponse<>(
                this.Repository.updateStatusById(candidate.getId(), candidate.getStatus()), false, 200, "candidate updated correctly!"
        );
    }
}
