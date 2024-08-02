package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.Select;

import java.util.List;

public interface LivreRepo extends JpaRepository<Livre, Long>{
    List<Livre> searchLivresByAuteur(String auteur);
    @Query ("SELECT l FROM Livre l WHERE l.category.sous_domaine = ?1")
    List<Livre> getLivresBySousDomaine(String sousDomaine);

    List<Livre> findByTitreContainingOrAuteurContaining(String titre, String auteur);
}
