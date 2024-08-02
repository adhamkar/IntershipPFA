package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Emprunte;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmprunteRepo extends JpaRepository<Emprunte, Long>{

    List<Emprunte> getEmpruntesByEtudiant_Cne(String cne);
    Emprunte getEmprunteByEtudiant(Etudiant etudiant);
    List<Emprunte> getEmpruntesByEtudiant(Etudiant etudiant);
}
