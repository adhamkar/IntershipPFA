package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.*;

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
    void ajouterCommentaire(Long idLivre, String commentaire, Long idEtudiant);
    List<Comment> getCommentaires(Long idLivre);
    void supprimerCommentaire(Long idCommentaire);
    Etudiant updateEtudiant(Etudiant etudiant);
    //void modifierPassword(String password);
    //void envoyerEmailAuBibliothecaire(int etudiantId, String subject, String body);
    Etudiant getEtudiantByCne(String cne);

    List<Livre> getLivresBySousDomaine(String sousDomaine);


}
