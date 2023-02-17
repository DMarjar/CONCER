package mx.edu.utez.serviciosIntegradora.model.certifyingCompany;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CertifyingCompanyRepository extends JpaRepository<CertifyingCompany, Long> {
    @Query(
            value = "UPDATE certifying_companies SET status = :status WHERE id = :id",
            nativeQuery = true
    )
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);

    boolean existsByName(String name);
}
