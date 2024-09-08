package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import ka.adham.stage_gestion_bibliotheque.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Long>{
    User findByEmail(String email);
    @Query("SELECT e FROM User e WHERE e.nom LIKE %?1% OR e.prenom LIKE %?1% OR e.email LIKE %?1% OR e.tel LIKE %?1% OR e.ville LIKE %?1%")
    List<User> searchUsers(String query);
}
