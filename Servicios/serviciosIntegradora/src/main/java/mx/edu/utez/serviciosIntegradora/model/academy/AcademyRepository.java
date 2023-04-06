package mx.edu.utez.serviciosIntegradora.model.academy;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademyRepository extends JpaRepository<Academy, Long> {
    @Query(value = "UPDATE academy SET status = :status WHERE id = :id", nativeQuery = true)
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);
    boolean existsByName(String name);
    @Query(nativeQuery = true, value = "SELECT\n" +
            "    academy.academy_name AS academyName,\n" +
            "    COUNT(candidates.id) AS totalCandidates,\n" +
            "    AVG(candidates.puntaje) AS averageScore,\n" +
            "    SUM(CASE WHEN candidates.estado = 'ENTREGADO' THEN 1 ELSE 0 END) / COUNT(candidates.id) * 100 AS percentageApproved,\n" +
            "    SUM(CASE WHEN candidates.estado = 'PENDIENTE' THEN 1 ELSE 0 END) / COUNT(candidates.id) * 100 AS percentagePending\n" +
            "FROM\n" +
            "    academy\n" +
            "JOIN\n" +
            "    candidates ON academy.id = candidates.academy_id\n" +
            "WHERE\n" +
            "    academy.status = 1\n" +
            "GROUP BY\n" +
            "    academy.academy_name;")
    List<Object[]> findAcademyStats();
}
