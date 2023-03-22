package mx.edu.utez.serviciosIntegradora.model.certification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    @Query(
            value = "UPDATE certifications SET status = :status WHERE id = :id",
            nativeQuery = true
    )
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);
    boolean existsByNameAndVersion(String name, String version);
<<<<<<< Updated upstream
=======

    @Query(nativeQuery = true, value = "select certifications.id as idCertificacion, candidates.id as idCandidatura, people.id as idCandidato, certification_name, people.first_name, people.last_name as apellidoCandidato, managers.first_name as manager_name "
            + "from certifications "
            + "join candidates on candidates.certification_id = certifications.id "
            + "join people on candidates.person_id = people.id "
            + "join people as managers on certifications.person_id = managers.id "
            + "where certifications.person_id = :personId and certifications.status = 1 and candidates.status = 1")
    List<Object[]> findCertificationsByPersonId(@Param("personId") Long personId);

    @Query(nativeQuery = true, value = "select \n" +
            "certifications.id as idCertificacion, \n" +
            "candidates.id as idCandidatura, \n" +
            "people.id as idCandidato, \n" +
            "people.first_name as nombreCandidato,\n" +
            "people.last_name as apellidoCandidato, \n" +
            "people.phone_number as telefono,\n" +
            "people.email as email,\n" +
            "people.gender as sexo,\n" +
            "people.type_person as tipoPersona,\n" +
            "managers.first_name as manager_name,\n" +
            "certification_name, \n" +
            "certifications.version,\n" +
            "certifying_companies.company_name as empresa,\n" +
            "candidates.date,\n" +
            "candidates.estado,\n" +
            "candidates.academy_id as academy\n" +
            "from certifications \n" +
            "join candidates on candidates.certification_id = certifications.id \n" +
            "join people on candidates.person_id = people.id \n" +
            "join people as managers on certifications.person_id = managers.id\n" +
            "join certifying_companies on certifications.company_id = certifying_companies.id\n" +
            "where candidates.id = :candidateId and certifications.status = 1 and candidates.status = 1")
    Object[] findInfoCandidate(@Param("candidateId") Long candidateId);

>>>>>>> Stashed changes
}
