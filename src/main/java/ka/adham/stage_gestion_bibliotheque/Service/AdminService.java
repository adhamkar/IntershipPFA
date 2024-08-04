package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.Admin;
import ka.adham.stage_gestion_bibliotheque.Entities.Bibliothecaire;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {
    List<Etudiant> getAllEtudiants();
    Etudiant getEtudiantById(Long id);
    Etudiant addEtudiant(Etudiant etudiant);
    Bibliothecaire addBibliothecaire(Bibliothecaire bibliothecaire);
    Bibliothecaire getBibliothecaireById(Long id);
    List<Bibliothecaire> getAllBibliothecaires();
    void deleteBibliothecaire(Long id);
    Admin addAdmin(Admin admin);
    Etudiant updateEtudiant(Etudiant etudiant);
    void deleteEtudiant(Long id);
    void deleteComment(Long id);
    List<Etudiant> searchEtudiant(String nom);
    List<Etudiant> getBlackList();
    Page<Etudiant> findAllEtudiants(Pageable pageable);
}
