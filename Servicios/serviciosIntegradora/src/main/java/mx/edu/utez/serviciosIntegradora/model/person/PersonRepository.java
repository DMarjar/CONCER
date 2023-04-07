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

    @Query(nativeQuery = true, value = "select distinct p.* from people p join certifications c on c.person_id = p.id;")
    List<Person> findCertifiers();
}
