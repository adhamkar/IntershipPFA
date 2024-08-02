package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import ka.adham.stage_gestion_bibliotheque.Entities.Reserve;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReserveRepo extends JpaRepository<Reserve, Long>{
    Optional<Reserve> findByLivreAndEtudiant(Livre livre, Etudiant etudiant);

    List<Reserve> getReservesByEtudiant(Etudiant etudiant);
}
