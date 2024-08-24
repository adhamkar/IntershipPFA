package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long>{
    User findByEmail(String email);
}
