package ka.adham.stage_gestion_bibliotheque.Service;

import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Repositories.*;
import ka.adham.stage_gestion_bibliotheque.Web.BibliotecaireController;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class BibliothecaireImpl implements BibliothecaireService{
    @Autowired
    private EtudiantRepo etudiantRepo;
    @Autowired
    private BibliothecaireRepo bibliothecaireRepo;
    @Autowired
    private LivreRepo livreRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    @Autowired
    private EmprunteRepo emprunteRepo;
    @Autowired
    private ReserveRepo reserveRepo;
    @Override
    public Etudiant getEtudiantByCne(String cne) {
        return etudiantRepo.getEtudiantByCne(cne);
    }

    @Override
    public List<Etudiant> getAllEtudiants() {
        return etudiantRepo.findAll();
    }

    @Override
    public Livre addLivre(Livre livre) {
        return livreRepo.save(livre);
    }

    @Override
    public void deleteLivre(Long idLivre) {
        livreRepo.deleteById(idLivre);
    }

    @Override
    public Livre updateLivre(Livre livre) {
        return livreRepo.save(livre);
    }

    @Override
    public List<Livre> getLivres() {
        return livreRepo.findAll();
    }

    @Override
    public List<Livre> searchLivres(String keyword) {
        return livreRepo.searchLivresByAuteur(keyword);
    }

    @Override
    public Livre getLivreById(Long idLivre) {
        return livreRepo.findById(idLivre).orElseThrow();
    }

    @Override
    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public void deleteCategory(Long idCategory) {
        categoryRepo.deleteById(idCategory);
    }

    @Override
    public Category updateCategory(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @Override
    public void ConfirmerEmprunt(Long idEmprunt) {

    }

    @Override
    public void RefuserEmprunt(Long idEmprunt) {
        emprunteRepo.deleteById(idEmprunt);
    }

    @Override
    public void ConfirmerReservation(Long idReservation) {

    }

    @Override
    public void RefuserReservation(Long idReservation) {
        reserveRepo.deleteById(idReservation);
    }

    @Override
    public List<Etudiant> addToBlackList(Long idEtudiant) {
        List<Etudiant> blackList = new ArrayList<>();
        Etudiant etudiant = etudiantRepo.findById(idEtudiant).orElseThrow();
        Emprunte emprunte = emprunteRepo.getEmprunteByEtudiant(etudiant);
        Date BorrowDate = emprunte.getDateEmprunt();
        Date ReturnDate = emprunte.getDateRetour();
        long diffInMillies = ReturnDate.getTime() - BorrowDate.getTime();
        long diffInDays = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
        if(diffInDays > 15){
            etudiant.setBlackListed(true);
            etudiantRepo.save(etudiant);
            blackList.add(etudiant);
        }
        return blackList;
    }

    @Override
    public List<Etudiant> getBlackList() {
        return etudiantRepo.findByBlackListed(true);
    }

    @Override
    public List<Emprunte> getAllEmprunts() {
        return emprunteRepo.findAll();
    }

    @Override
    public List<Reserve> getAllReservations() {
        return reserveRepo.findAll();
    }

    @Override
    public Etudiant getEtudiantById(Long id) {
        return etudiantRepo.findById(id).orElseThrow();
    }

    @Override
    public List<String> getCategoriesNames() {
        List<Category> categories = categoryRepo.findAll();
        List<String> categoriesNames = new ArrayList<>();
        for (Category category : categories) {
            categoriesNames.add(category.getDomaine());
        }

        return categoriesNames;
    }

    @Override
    public Long getNombreEmpruntsParLivre(Long id) {
        Livre livre = livreRepo.findById(id).orElseThrow();
        List<Emprunte> emprunts = livre.getEmprunts();
       Long nombreEmprunts = 0L;
        for (Emprunte emprunt : emprunts) {
            if(emprunt.getLivre().getId().equals(id)){
                nombreEmprunts++;
            }
        }
        return nombreEmprunts;
    }
}
