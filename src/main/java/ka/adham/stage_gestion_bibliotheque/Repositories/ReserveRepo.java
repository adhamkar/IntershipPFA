package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Emprunte;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import ka.adham.stage_gestion_bibliotheque.Entities.Reserve;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReserveRepo extends JpaRepository<Reserve, Long>{
    Optional<Reserve> findByLivreAndEtudiant(Livre livre, Etudiant etudiant);

    List<Reserve> getReservesByEtudiant(Etudiant etudiant);
    @Query("SELECT e FROM Reserve e WHERE e.livre.category.sous_domaine LIKE %:search% OR e.NomEtudiant LIKE %:search% OR e.TitreLivre LIKE %:search%")
    List<Reserve> SearchReserve(@Param("search") String search);
    Reserve findByEtudiantAndLivre(Etudiant etudiant, Livre livre);
}
