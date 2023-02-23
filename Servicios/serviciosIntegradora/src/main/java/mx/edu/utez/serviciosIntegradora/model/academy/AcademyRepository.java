package mx.edu.utez.serviciosIntegradora.model.academy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AcademyRepository extends JpaRepository<Academy, Long> {
    @Query(value = "UPDATE academy SET status = :status WHERE id = :id", nativeQuery = true)
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);
    boolean existsByName(String name);
}
