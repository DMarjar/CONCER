package mx.edu.utez.serviciosIntegradora.model.candidate;

import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    @Query(
            value = "UPDATE candidates SET status = :status WHERE id = :id",
            nativeQuery = true
    )
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);

    // Verificar si el candidato ya existe en esa certificacion
    boolean existsByPersonAndCertification(Person person, Certification certification);
    int countAllBy();
    int countAllByEstado(Estado estado);
    @Query(nativeQuery = true, value = "select certifications.id as idCertificacion, candidates.id as idCandidatura, people.id as idCandidato, certification_name, people.first_name, people.last_name as apellidoCandidato, managers.first_name as manager_name "
            + "from certifications "
            + "join candidates on candidates.certification_id = certifications.id "
            + "join people on candidates.person_id = people.id "
            + "join people as managers on certifications.person_id = managers.id "
            + "where certifications.person_id = :personId and certifications.status = 1 and candidates.status = 1")
    List<Object[]> findCertificationsByPersonId(@Param("personId") Long personId);

    @Query(nativeQuery = true, value = "SELECT certifications.id as idCertificacion, candidates.id as idCandidatura, people.id as idCandidato, people.first_name as nombreCandidato, people.last_name as apellidoCandidato, people.gender as sexo, people.email as email,people.phone_number as phone, people.type_person as tipo, academy.academy_name as academia, candidates.estado as estadoCertificacion, certifications.certification_name, certifications.version as version, certifying_companies.company_name as empresaCertificadora, managers.first_name as Gestor FROM certifications JOIN candidates ON candidates.certification_id = certifications.id JOIN people ON candidates.person_id = people.id JOIN people as managers ON certifications.person_id = managers.id JOIN academy ON candidates.academy_id = academy.id JOIN certifying_companies on certifications.company_id = certifying_companies.id WHERE candidates.person_id=:personId AND certifications.status=1  AND candidates.status=1")
    List<Object[]> candidateInformation(@Param("personId") Long personId);
}
