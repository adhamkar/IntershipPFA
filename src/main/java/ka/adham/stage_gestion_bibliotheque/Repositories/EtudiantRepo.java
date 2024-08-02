package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Comment;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EtudiantRepo extends JpaRepository<Etudiant, Long>{
    Etudiant getEtudiantByCne(String cne);
    List<Etudiant> searchEtudiantsByNom(String nom);
    List<Etudiant> findByBlackListed(boolean blackListed);
    Comment getCommentById(Long id);
}
