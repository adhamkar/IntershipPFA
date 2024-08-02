package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Web.BibliotecaireController;

import java.util.List;

public interface BibliothecaireService {
    Etudiant getEtudiantByCne(String cne);
    List<Etudiant> getAllEtudiants();

    Livre addLivre(Livre livre);
    void deleteLivre(Long idLivre);
    Livre updateLivre(Livre livre);
    List<Livre> getLivres();
    List<Livre> searchLivres(String keyword);
    Livre getLivreById(Long idLivre);

    Category addCategory(Category category);
    void deleteCategory(Long idCategory);
    Category updateCategory(Category category);
    List<Category> getAllCategories();

    void ConfirmerEmprunt(Long idEmprunt);
    void RefuserEmprunt(Long idEmprunt);
    void ConfirmerReservation(Long idReservation);
    void RefuserReservation(Long idReservation);

    List<Etudiant> addToBlackList(Long idEtudiant);
    List<Etudiant> getBlackList();

    List<Emprunte> getAllEmprunts();
    List<Reserve> getAllReservations();

    Etudiant getEtudiantById(Long id);

    List<String> getCategoriesNames();

    Long getNombreEmpruntsParLivre(Long id);
}
