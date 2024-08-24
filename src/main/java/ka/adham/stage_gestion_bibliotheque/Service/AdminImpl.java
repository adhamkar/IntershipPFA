package ka.adham.stage_gestion_bibliotheque.Service;

import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.Admin;
import ka.adham.stage_gestion_bibliotheque.Entities.Bibliothecaire;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import ka.adham.stage_gestion_bibliotheque.Repositories.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public Livre getLivreById(Long id) {
        return livreRepo.findById(id).orElseThrow();
    }


}

