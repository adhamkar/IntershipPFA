package ka.adham.stage_gestion_bibliotheque.Service;

import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Enums.EmpruntStatus;
import ka.adham.stage_gestion_bibliotheque.Enums.EtatLivre;
import ka.adham.stage_gestion_bibliotheque.Repositories.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class AdminImpl implements AdminService{
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private EtudiantRepo etudiantRepo;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private BibliothecaireRepo bibliothecaireRepo;
    @Autowired private LivreRepo livreRepo;
    @Autowired private EmprunteRepo emprunteRepo;
    @Autowired private MailService mailService;
    @Autowired private ReserveRepo reserveRepo;
    @Autowired private UserRepo userRepo;
    @Override
    public List<Etudiant> getAllEtudiants() {
        return etudiantRepo.findAll();
    }

    @Override
    public Etudiant getEtudiantById(Long id) {
        return etudiantRepo.findById(id).orElseThrow();
    }

    @Override
    public Etudiant addEtudiant(Etudiant etudiant) {
        etudiant.setPassword(passwordEncoder.encode(etudiant.getPassword()));
        return etudiantRepo.save(etudiant);
    }

    @Override
    public Bibliothecaire addBibliothecaire(Bibliothecaire bibliothecaire) {
        bibliothecaire.setPassword(passwordEncoder.encode(bibliothecaire.getPassword()));
        return bibliothecaireRepo.save(bibliothecaire);
    }

    @Override
    public Bibliothecaire getBibliothecaireById(Long id) {
        return bibliothecaireRepo.findById(id).orElseThrow();
    }

    @Override
    public List<Bibliothecaire> getAllBibliothecaires() {
        return bibliothecaireRepo.findAll();
    }

    @Override
    public void deleteBibliothecaire(Long id) {
        bibliothecaireRepo.deleteById(id);
    }

    @Override
    public Admin addAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepo.save(admin);
    }

    @Override
    public Etudiant updateEtudiant(Etudiant etudiant) {
        return etudiantRepo.save(etudiant);
    }

    @Override
    public void deleteEtudiant(Long id) {
        etudiantRepo.deleteById(id);
    }

    @Override
    public void deleteComment(Long id) {
        commentRepo.deleteById(id);
    }

    @Override
    public List<Etudiant> searchEtudiant(String nom) {
        return etudiantRepo.searchEtudiantsByNom(nom);
    }

    @Override
    public List<Etudiant> getBlackList() {
        List<Etudiant> etudiants=getAllEtudiants();
        List<Etudiant> BlackList=new ArrayList<>();
        etudiants.forEach(etudiant -> {
            if(etudiant.isBlackListed()){
                BlackList.add(etudiant);
            }
        });
        return BlackList;
        }

    @Override
    public Page<Etudiant> findAllEtudiants(Pageable pageable) {
        return etudiantRepo.findAll(pageable);
    }

    @Override
    public List<Etudiant> searchEtudiants(String query) {
        return etudiantRepo.searchEtudiants(query);
    }

    @Override
    public List<User> searchUsers(String query) {
        return userRepo.searchUsers(query);
    }

    @Override
    public Livre getLivreById(Long id) {
        return livreRepo.findById(id).orElseThrow();
    }

    @Override
    @Scheduled(cron = "0 00 01 * * *")
    public void ToBlackList() {
        List<Emprunte> overdueEmprunts=emprunteRepo.findOverdueEmprunts();
        overdueEmprunts.forEach(emprunte -> {
            emprunte.setStatus(EmpruntStatus.NonRendu);
            Etudiant etudiant=emprunte.getEtudiant();
            etudiant.setBlackListed(true);
            try {
                mailService.sendBlackListEmail(etudiant);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
            etudiantRepo.save(etudiant);
        });
    }
    @Scheduled(cron = "0 00 01 * * *")
    public void RemoveFromBlackList(){
        List<Etudiant> etudiants=etudiantRepo.getEtudiantsByBlackListedTrue();
        etudiants.forEach(etudiant -> {
            List<Emprunte> empruntes=emprunteRepo.getEmpruntesByEtudiant(etudiant);
            boolean allReturned=true;
            for(Emprunte emprunte:empruntes){
                if(emprunte.getStatus().equals(EmpruntStatus.NonRendu)){
                    allReturned=false;
                    break;
                }
            }
            if(allReturned){
                etudiant.setBlackListed(false);
            }

            etudiantRepo.save(etudiant);
        });
    }
    @Scheduled(cron = "0 01 17 * * *")
    public void ReservationToEmprunt(){
        List<Reserve> reservations=reserveRepo.findAll();
        reservations.forEach(reserve -> {
            Livre livre=reserve.getLivre();
            if(reserve.getLivre().getQuantite()>0){
                Emprunte emprunte=new Emprunte();
                emprunte.setEtudiant(reserve.getEtudiant());
                emprunte.setDateEmprunt(new Date());
                emprunte.setDomaine(reserve.getDomaine());
                emprunte.setStatus(EmpruntStatus.OK);
                emprunte.setNomEtudiant(reserve.getNomEtudiant());
                emprunte.setLivre(livre);
                emprunte.setTitreLivre(reserve.getTitreLivre());

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(emprunte.getDateEmprunt());
                calendar.add(Calendar.DAY_OF_YEAR, 15);
                emprunte.setDateRetour(calendar.getTime());
                emprunteRepo.save(emprunte);
                livre.setQuantite(livre.getQuantite()-1);
                livreRepo.save(livre);
                reserveRepo.deleteById(reserve.getId());
                try {
                    mailService.sendBorrowConfirmationEmail(emprunte.getEtudiant(),livre);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    @Scheduled(cron = "0 13 13 * * *")
    public void BookDispoCheck(){
        List<Livre> livres=livreRepo.findAll();
        livres.forEach(livre->{
            if(livre.getQuantite()==0 && livre.getDisponibilite().equals(EtatLivre.Disponible)  ){
                livre.setDisponibilite(EtatLivre.Indisponible);
            }
        });
    }
    @Scheduled(cron = "0 13 13 * * *")
    public void BookDispoChecking(){
        List<Livre> livres=livreRepo.findAll();
        livres.forEach(livre->{
            if(livre.getQuantite()>0 && livre.getDisponibilite().equals(EtatLivre.Indisponible)){
                livre.setDisponibilite(EtatLivre.Disponible);
            }
        });
    }

}

