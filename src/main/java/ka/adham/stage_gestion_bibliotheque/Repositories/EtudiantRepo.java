package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Comment;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EtudiantRepo extends JpaRepository<Etudiant, Long>{
    Etudiant getEtudiantByCne(String cne);
    List<Etudiant> searchEtudiantsByNom(String nom);
    List<Etudiant> findByBlackListed(boolean blackListed);
    Comment getCommentById(Long id);
    @Query("SELECT e FROM Etudiant e WHERE e.nom LIKE %?1% OR e.prenom LIKE %?1% OR e.cne LIKE %?1% OR e.email LIKE %?1% OR e.tel LIKE %?1% OR e.ville LIKE %?1%")
    List<Etudiant> searchEtudiants(String query);
}
