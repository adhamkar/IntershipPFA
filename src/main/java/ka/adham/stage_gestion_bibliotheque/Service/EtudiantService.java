package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EtudiantService {
    List<Livre> getLivres();
    List<Category> getCategories();
    List<Livre> searchLivres(String keyword);
    Emprunte emprunterLivre(Long idLivre, Long idEtudiant);
    Reserve reserverLivre(Long idLivre, Long idEtudiant);
    List<Emprunte> getEmprunts(Long id);
    List<Reserve> getReservations(Long id);
    Category getCategoryById(Long id);

    void annulerReservation(Long idReservation);
    void rendreLivre(Long idEmprunt);
    void prolongerEmprunt(Long idEmprunt);
    Comment ajouterCommentaire( Comment comment);
    List<Comment> getCommentaires(Long idLivre);
    void supprimerCommentaire(Long idCommentaire);
    Etudiant updateEtudiant(Etudiant etudiant);
    //void modifierPassword(String password);
    //void envoyerEmailAuBibliothecaire(int etudiantId, String subject, String body);
    Etudiant getEtudiantByCne(String cne);

    List<Livre> getLivresBySousDomaine(String sousDomaine);


    Page<Livre> findAll(Pageable pageable);
    Page<Category> findAllCategories(Pageable pageable);

    Page<Category> findCategoriesByDomaine(String domaine, Pageable pageable);
}
