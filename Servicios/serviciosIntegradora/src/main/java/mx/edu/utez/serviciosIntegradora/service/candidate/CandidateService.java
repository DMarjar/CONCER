package mx.edu.utez.serviciosIntegradora.service.candidate;

import mx.edu.utez.serviciosIntegradora.model.academy.Academy;
import mx.edu.utez.serviciosIntegradora.model.academy.AcademyRepository;
import mx.edu.utez.serviciosIntegradora.model.candidate.Candidate;
import mx.edu.utez.serviciosIntegradora.model.candidate.CandidateRepository;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.utils.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CandidateService {
    @Autowired
    private CandidateRepository Repository;

    //getAll
    @Transactional(readOnly = true)
    public CustomResponse<List<Candidate>> getAll(){
        return new CustomResponse<>(
                this.Repository.findAll(),false,200,"ok"
        );
    }
    //getOne
    @Transactional(readOnly = true)
    public CustomResponse<Candidate> getOne(Long id){
        return new CustomResponse<>(
                this.Repository.findById(id).get(),false,200,"ok"
        );
    }

    //Certifications
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getInformation(Person person){
        return new CustomResponse<>(
                this.Repository.findCertificationsByPersonId(person.getId()),false,200,"ok"
        );
    }

    //Informacion Candidato
    @Transactional(readOnly = true)
    public CustomResponse<List<Object[]>> getCandidatureInformation(Person person){
        return new CustomResponse<>(
                this.Repository.candidateInformation(person.getId()), false, 200, "ok"
        );
    }

    //insert
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Candidate> insert(Candidate candidate){
        if(this.Repository.existsByPersonAndCertification(candidate.getPerson(),candidate.getCertification())){
            return new CustomResponse<>(null,true,400,"ya existe");
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

    //delate
    @Transactional(rollbackFor = {SQLException.class})
    public CustomResponse<Candidate> delete(Candidate candidate){
        Optional<Candidate> exists = this.Repository.findById(candidate.getId());
        if((!exists.isPresent())){
            return new CustomResponse<>(null,true,400,"no existe");
        }
        this.Repository.deleteById(candidate.getId());
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
