package mx.edu.utez.serviciosIntegradora.model.certification;

import mx.edu.utez.serviciosIntegradora.model.stats.CertificationStats;
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

    @Query(nativeQuery = true,
            value = "SELECT \n" +
                    "    certification_name AS certificationName,\n" +
                    "    version AS version,\n" +
                    "    COUNT(candidates.id) AS totalCandidates,\n" +
                    "    AVG(candidates.puntaje) AS averageScore,\n" +
                    "    SUM(CASE WHEN candidates.estado = \"ENTREGADO\" THEN 1 ELSE 0 END) / COUNT(candidates.id) * 100 AS passPercentage,\n" +
                    "    SUM(CASE WHEN candidates.estado = \"PENDIENTE\" THEN 1 ELSE 0 END) / COUNT(candidates.id) * 100 AS failPercentage\n" +
                    "FROM \n" +
                    "    certifications\n" +
                    "JOIN \n" +
                    "    candidates ON certifications.id = candidates.certification_id\n" +
                    "WHERE\n" +
                    "    certifications.status = 1\n" +
                    "GROUP BY \n" +
                    "    certifications.id, certification_name, version;"
    )
    List<Object[]> findCertificationStats();

}
