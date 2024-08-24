package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Emprunte;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmprunteRepo extends JpaRepository<Emprunte, Long>{

    List<Emprunte> getEmpruntesByEtudiant_Cne(String cne);
    Emprunte getEmprunteByEtudiant(Etudiant etudiant);
    List<Emprunte> getEmpruntesByEtudiant(Etudiant etudiant);
    @Query("SELECT e FROM Emprunte e WHERE e.livre.category.sous_domaine LIKE %:search% OR e.NomEtudiant LIKE %:search% OR e.TitreLivre LIKE %:search%")
    List<Emprunte> SearchEmprunt(@Param("search") String search);
}
