package ka.adham.stage_gestion_bibliotheque.Service;

import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Enums.*;
import ka.adham.stage_gestion_bibliotheque.Repositories.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class EtudiantImpl implements EtudiantService{
    @Autowired
    private LivreRepo livreRepo;
    @Autowired
    private EtudiantRepo etudiantRepo;
    @Autowired
    private EmprunteRepo emprunteRepo;
    @Autowired
    private ReserveRepo reserveRepo;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private CategoryRepo categoryRepo;
    //private CategoryRepo categoryRepo;

    @Override
    public List<Livre> getLivres() {
        List<Livre> livres=livreRepo.findAll();
        return livres;
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepo.findAll();
    }

    @Override
    public List<Livre> searchLivres(String auteur) {
        List<Livre> livres=livreRepo.searchLivresByAuteur(auteur);
        return livres;
    }

    @Override
    public Emprunte emprunterLivre(Long idLivre, Long idEtudiant) {
        Livre livre=livreRepo.findById(idLivre).orElseThrow();
        Etudiant etudiant=etudiantRepo.findById(idEtudiant).orElseThrow();
        Emprunte emprunte=new Emprunte();
        Optional<Reserve> reserveOptional=reserveRepo.findByLivreAndEtudiant(livre, etudiant);
        if(reserveOptional.isPresent()){
            System.out.println("Vous avez déjà emprunté ce livre");
            return null;
        }
        if(livre.getQuantite()>0 && livre.getDisponibilite()== EtatLivre.Disponible){
            livre.setQuantite(livre.getQuantite()-1);
            if (livre.getQuantite() == 0) {
                livre.setDisponibilite(EtatLivre.Indisponible);
            }
            emprunte.setLivre(livre);
            emprunte.setEtudiant(etudiant);
            emprunte.setNomEtudiant(etudiant.getNom());
            emprunte.setTitreLivre(livre.getTitre());
            emprunte.setDomaine(livre.getCategory().getDomaine());
            emprunte.setStatus(EmpruntStatus.OK);

            Date borrowDate = new Date();
            emprunte.setDateEmprunt(borrowDate);

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(borrowDate);
            calendar.add(Calendar.DAY_OF_YEAR, 15);
            Date returnDate = calendar.getTime();
            emprunte.setDateRetour(returnDate);
            emprunteRepo.save(emprunte);
        }
        return emprunte;
    }

    @Override
    public Reserve reserverLivre(Long idLivre, Long idEtudiant) {
        Livre livre=livreRepo.findById(idLivre).orElseThrow();
        Etudiant etudiant=etudiantRepo.findById(idEtudiant).orElseThrow();
        Reserve reserve=new Reserve();
        Optional<Reserve> reserveOptional=reserveRepo.findByLivreAndEtudiant(livre, etudiant);
        if(reserveOptional.isPresent()){
            System.out.println("Vous avez déjà réservé ce livre");
            return null;
        }
        if(livre.getQuantite()>0){
            livre.setQuantite(livre.getQuantite()-1);
            if (livre.getQuantite() == 0) {
                livre.setDisponibilite(EtatLivre.Indisponible);
            }
            reserve.setLivre(livre);
            reserve.setEtudiant(etudiant);
            reserve.setNomEtudiant(etudiant.getNom());
            reserve.setTitreLivre(livre.getTitre());
            reserve.setDomaine(livre.getCategory().getDomaine());
            reserve.setDateReservation(new Date());
            reserveRepo.save(reserve);
        }
        return reserve;
    }

    @Override
    public List<Emprunte> getEmprunts(Long id) {
        Etudiant etudiant=etudiantRepo.findById(id).orElseThrow();
        List<Emprunte> ListEmprunts=emprunteRepo.getEmpruntesByEtudiant(etudiant);
        return ListEmprunts;

    }

    @Override
    public List<Reserve> getReservations(Long id) {
        Etudiant etudiant=etudiantRepo.findById(id).orElseThrow();
        List<Reserve> ListReservations=reserveRepo.getReservesByEtudiant(etudiant);
        return ListReservations;
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id).orElseThrow();
    }

    @Override
    public void annulerReservation(Long idReservation) {
        reserveRepo.deleteById(idReservation);
    }

    @Override
    public void rendreLivre(Long idEmprunt) {
        Emprunte emprunte=emprunteRepo.findById(idEmprunt).orElseThrow();
        Livre livre=emprunte.getLivre();
        livre.setQuantite(livre.getQuantite()+1);
        if(livre.getQuantite()>0){
            livre.setDisponibilite(EtatLivre.Disponible);
        }
        livreRepo.save(livre);
        emprunteRepo.deleteById(idEmprunt);
    }

    @Override
    public void prolongerEmprunt(Long idEmprunt) {
        Emprunte emprunte=emprunteRepo.findById(idEmprunt).orElseThrow();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(emprunte.getDateRetour());
        calendar.add(Calendar.DAY_OF_YEAR, 3);
        Date newReturnDate = calendar.getTime();
        emprunte.setDateRetour(newReturnDate);
        emprunteRepo.save(emprunte);
    }

    @Override
    public void ajouterCommentaire(Long idLivre, String commentaire, Long idEtudiant) {
        Livre livre=livreRepo.findById(idLivre).orElseThrow();
        Etudiant etudiant=etudiantRepo.findById(idEtudiant).orElseThrow();
        Comment comment=new Comment();
        comment.setEtudiant(etudiant);
        comment.setLivre(livre);
        comment.setCommentaire(commentaire);
        comment.setCreatedDate(new Date());
        commentRepo.save(comment);
    }

    @Override
    public List<Comment> getCommentaires(Long idLivre) {
        Livre livre=livreRepo.findById(idLivre).orElseThrow();
        List<Comment> comments=commentRepo.getCommentsByLivre(livre);
        return comments;
    }

    @Override
    public void supprimerCommentaire(Long idCommentaire) {
        commentRepo.deleteById(idCommentaire);
    }

    @Override
    public Etudiant updateEtudiant(Etudiant etudiant) {
        return etudiantRepo.save(etudiant);
    }



    @Override
    public Etudiant getEtudiantByCne(String cne) {
        return etudiantRepo.getEtudiantByCne(cne);
    }

    @Override
    public List<Livre> getLivresBySousDomaine(String sousDomaine) {
        List<Livre> livres=livreRepo.getLivresBySousDomaine(sousDomaine);
        return livres;
    }

    @Override
    public Page<Livre> findAll(Pageable pageable) {
        return livreRepo.findAll(pageable);
    }

    @Override
    public Page<Category> findAllCategories(Pageable pageable) {
        return categoryRepo.findAll(pageable);
    }

    @Override
    public Page<Category> findCategoriesByDomaine(String domaine, Pageable pageable) {
        return categoryRepo.findAllByDomaine(domaine, pageable);
    }


}
