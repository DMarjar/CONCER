package mx.edu.utez.serviciosIntegradora.model.candidate;

import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    @Query(
            value = "UPDATE candidates SET status = :status WHERE id = :id",
            nativeQuery = true
    )
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);

    // Verificar si el candidato ya existe en esa certificacion
    boolean existsByPersonAndCertification(Person person, Certification certification);
}
