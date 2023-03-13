package mx.edu.utez.serviciosIntegradora.model.certification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    @Query(
            value = "UPDATE certifications SET status = :status WHERE id = :id",
            nativeQuery = true
    )
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);
    boolean existsByNameAndVersion(String name, String version);

    @Query(nativeQuery = true, value = "select certifications.id as idCertificacion, candidates.id as idCandidatura, people.id as idCandidato, certification_name, people.first_name, people.last_name as apellidoCandidato, managers.first_name as manager_name "
            + "from certifications "
            + "join candidates on candidates.certification_id = certifications.id "
            + "join people on candidates.person_id = people.id "
            + "join people as managers on certifications.person_id = managers.id "
            + "where certifications.person_id = :personId and certifications.status = 1 and candidates.status = 1")
    List<Object[]> findCertificationsByPersonId(@Param("personId") Long personId);

}
