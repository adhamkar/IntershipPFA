package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Tache;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface TaskRepo extends JpaRepository<Tache, Long> {
    List<Tache> findAllByEtudiantId(Long id);
}
