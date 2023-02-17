package mx.edu.utez.serviciosIntegradora.model.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    // Actualizar el status
    @Query(
            value = "UPDATE users SET status = :status WHERE id = :id",
            nativeQuery = true
    )
    boolean updateStatusById(@Param("id") Long id, @Param("status") boolean status);

    boolean existsByUsername(String name);
}
