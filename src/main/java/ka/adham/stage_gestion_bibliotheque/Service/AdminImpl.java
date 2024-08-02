package ka.adham.stage_gestion_bibliotheque.Service;

import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.Admin;
import ka.adham.stage_gestion_bibliotheque.Entities.Bibliothecaire;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import ka.adham.stage_gestion_bibliotheque.Repositories.AdminRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.BibliothecaireRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.CommentRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.EtudiantRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class AdminImpl implements AdminService{
    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private EtudiantRepo etudiantRepo;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private BibliothecaireRepo bibliothecaireRepo;
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
        return etudiantRepo.save(etudiant);
    }

    @Override
    public Bibliothecaire addBibliothecaire(Bibliothecaire bibliothecaire) {
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
        };

    }

