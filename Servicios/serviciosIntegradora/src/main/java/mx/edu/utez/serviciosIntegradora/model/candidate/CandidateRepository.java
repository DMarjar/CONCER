
package mx.edu.utez.serviciosIntegradora.model.candidate;

import mx.edu.utez.serviciosIntegradora.model.certification.Certification;
import mx.edu.utez.serviciosIntegradora.model.person.Person;
import mx.edu.utez.serviciosIntegradora.model.stats.CandidateStats;
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
            + "where candidates.status = 1 ")
    List<Object[]> findALl();

    @Query(nativeQuery = true, value = "select certifications.id as idCertificacion, candidates.id as idCandidatura, people.id as idCandidato, certification_name, people.first_name, people.last_name as apellidoCandidato, managers.first_name as manager_name "
            + "from certifications "
            + "join candidates on candidates.certification_id = certifications.id "
            + "join people on candidates.person_id = people.id "
            + "join people as managers on certifications.person_id = managers.id "
            + "where certifications.person_id = :personId and certifications.status = 1 and candidates.status = 1 and candidates.estado = :estado")
    List<Object[]> findCertificationsByPersonId(@Param("personId") Long personId, @Param("estado") String estado);

    @Query(nativeQuery = true, value = "SELECT \n" +
            "certifications.id as idCertificacion, \n" +
            "candidates.id as idCandidatura, \n" +
            "people.id as idCandidato, \n" +
            "people.first_name as nombreCandidato, \n" +
            "people.last_name as apellidoCandidato, \n" +
            "people.gender as sexo, \n" +
            "people.email as email,\n" +
            "people.phone_number as phone, \n" +
            "people.type_person as tipo, \n" +
            "academy.academy_name as academia, \n" +
            "candidates.estado as estadoCertificacion, \n" +
            "certifications.certification_name, \n" +
            "certifications.version as version, \n" +
            "certifying_companies.company_name as empresaCertificadora, \n" +
            "managers.first_name as Gestor,\n" +
            "candidates.clave as clave,\n" +
            "candidates.grupo as grupo,\n" +
            "candidates.puntaje as puntaje,\n" +
            "candidates.fecha_fin as fecha,\n" +
            "candidates.picture_url as imagen\n" +
            "FROM certifications JOIN candidates ON candidates.certification_id = certifications.id JOIN people ON candidates.person_id = people.id \n" +
            "JOIN people as managers ON certifications.person_id = managers.id \n" +
            "JOIN academy ON candidates.academy_id = academy.id \n" +
            "JOIN certifying_companies on certifications.company_id = certifying_companies.id WHERE candidates.id=:personId AND certifications.status=1  AND candidates.status=1")
    List<Object[]> candidateInformation(@Param("personId") Long personId);

    @Query(nativeQuery = true, value = "SELECT \n" +
            "    cert1.certification_name AS mostCandidatesCertification,\n" +
            "    cert1.totalCandidates,\n" +
            "    cert1.averageScore AS mostCandidatesAvgScore,\n" +
            "    cert4.certification_name AS leastPopularCertification,\n" +
            "    cert4.totalCandidates AS leastPopularTotalCandidates,\n" +
            "    cert4.averageScore AS leastPopularAvgScore,\n" +
            "    cert2.certification_name AS bestAvgScoreCertification,\n" +
            "    cert2.averageScore AS bestAvgScore,\n" +
            "    cert3.certification_name AS worstAvgScoreCertification,\n" +
            "    cert3.averageScore AS worstAvgScore\n" +
            "FROM (\n" +
            "    SELECT \n" +
            "        certifications.certification_name, \n" +
            "        COUNT(candidates.id) AS totalCandidates, \n" +
            "        AVG(candidates.puntaje) AS averageScore\n" +
            "    FROM \n" +
            "        certifications \n" +
            "    JOIN candidates \n" +
            "        ON certifications.id = candidates.certification_id \n" +
            "    GROUP BY \n" +
            "        certifications.id \n" +
            "    ORDER BY \n" +
            "        totalCandidates DESC \n" +
            "    LIMIT 1\n" +
            ") AS cert1\n" +
            "JOIN (\n" +
            "    SELECT \n" +
            "        certifications.certification_name, \n" +
            "        AVG(candidates.puntaje) AS averageScore\n" +
            "    FROM \n" +
            "        certifications \n" +
            "    JOIN candidates \n" +
            "        ON certifications.id = candidates.certification_id \n" +
            "    GROUP BY \n" +
            "        certifications.id \n" +
            "    ORDER BY \n" +
            "        averageScore DESC \n" +
            "    LIMIT 1\n" +
            ") AS cert2\n" +
            "JOIN (\n" +
            "    SELECT \n" +
            "        certifications.certification_name, \n" +
            "        AVG(candidates.puntaje) AS averageScore\n" +
            "    FROM \n" +
            "        certifications \n" +
            "    JOIN candidates \n" +
            "        ON certifications.id = candidates.certification_id \n" +
            "    GROUP BY \n" +
            "        certifications.id \n" +
            "    ORDER BY \n" +
            "        averageScore ASC \n" +
            "    LIMIT 1\n" +
            ") AS cert3\n" +
            "JOIN (\n" +
            "    SELECT \n" +
            "        certifications.certification_name, \n" +
            "        COUNT(candidates.id) AS totalCandidates, \n" +
            "        AVG(candidates.puntaje) AS averageScore\n" +
            "    FROM \n" +
            "        certifications \n" +
            "    JOIN candidates \n" +
            "        ON certifications.id = candidates.certification_id \n" +
            "    GROUP BY \n" +
            "        certifications.id \n" +
            "    ORDER BY \n" +
            "        totalCandidates ASC \n" +
            "    LIMIT 1\n" +
            ") AS cert4;")
    Object[] findCandidateStats();
}