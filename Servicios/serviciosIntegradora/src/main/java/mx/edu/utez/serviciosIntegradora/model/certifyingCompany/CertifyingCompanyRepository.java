package mx.edu.utez.serviciosIntegradora.model.certifyingCompany;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertifyingCompanyRepository extends JpaRepository<CertifyingCompany, Long> {
    @Query(
            value = "UPDATE certifying_companies SET status = :status WHERE id = :id",
            nativeQuery = true
    )
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);

    boolean existsByName(String name);

    @Query(
            value = "select picture_url from certifying_companies where status = 1;",
            nativeQuery = true
    )
    List<String> findAllImages();

    @Query(
            value = "select * from certifying_companies where status = 1;",
            nativeQuery = true
    )
    List<CertifyingCompany> findAllActive();
}
