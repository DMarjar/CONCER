package mx.edu.utez.serviciosIntegradora.model.person;

import mx.edu.utez.serviciosIntegradora.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    // Actualizar el status
    @Query(
            value = "UPDATE people SET status = :status WHERE id = :id",
            nativeQuery = true
    )
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);
    // Verificar si la persona ya existe por su email
    boolean existsByEmail(String email);
    Person findByUser(User user);
    Person findByEmail(String email);

    @Query(nativeQuery = true, value = "select p.* from people p join users u where p.user_id = u.id AND u.role = :role")
    List<Person> findUsers(@Param("role") String role);

    @Query(nativeQuery = true, value = "select distinct p.* from people p join certifications c on c.person_id = p.id;")
    List<Person> findCertifiers();

    @Query(nativeQuery = true, value = "SELECT\n" +
            "    CONCAT(people.first_name, ' ', people.last_name) AS fullName,\n" +
            "    certifications.certification_name AS certificationName,\n" +
            "    certifications.version AS version,\n" +
            "    COUNT(candidates.id) AS totalCandidates,\n" +
            "    AVG(candidates.puntaje) AS averageScore,\n" +
            "    SUM(CASE WHEN candidates.estado = 'ENTREGADO' THEN 1 ELSE 0 END) / COUNT(candidates.id) * 100 AS percentageApproved,\n" +
            "    SUM(CASE WHEN candidates.estado = 'PENDIENTE' THEN 1 ELSE 0 END) / COUNT(candidates.id) * 100 AS percentagePending\n" +
            "FROM\n" +
            "    people\n" +
            "JOIN\n" +
            "    users ON people.user_id = users.id\n" +
            "JOIN\n" +
            "    certifications ON people.id = certifications.person_id\n" +
            "JOIN\n" +
            "    candidates ON certifications.id = candidates.certification_id\n" +
            "WHERE\n" +
            "    users.role = 'GESTOR' AND users.status = 1\n" +
            "GROUP BY\n" +
            "    fullName, certificationName, version;")
    List<Object[]> findGestorStats();

}
