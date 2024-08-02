package ka.adham.stage_gestion_bibliotheque.Web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Repositories.ImageRepo;
import ka.adham.stage_gestion_bibliotheque.Service.AdminService;
import ka.adham.stage_gestion_bibliotheque.Service.StorageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
@RequestMapping("/admin")
public class AdminControllelr {

    @Autowired
    private AdminService adminService;
    @Autowired
    private ImageRepo imageRepo;

    @GetMapping("/etudiants")
    public List<Etudiant> getEtudiants(){
        return adminService.getAllEtudiants();
    }
    @GetMapping("/etudiant/{id}")
    public Etudiant getEtudiant(@PathVariable Long id){
        return adminService.getEtudiantById(id);
    }

    @PostMapping("/etudiant")
    public Etudiant addEtudiant(@RequestBody Etudiant etudiant){
        //String uploadImage = storageService.uploadImage(file);
        List<Image> images = imageRepo.findAll();
        Image image = images.get(images.size()-1);
        etudiant.setImage(image);
        return adminService.addEtudiant(etudiant);

    }
    @PatchMapping("/etudiant")
    public Etudiant updateEtudiant(@RequestBody Etudiant etudiant){
        return adminService.updateEtudiant(etudiant);
    }
    @DeleteMapping("/etudiant/{id}")
    public void deleteEtudiant(@PathVariable Long id){
        adminService.deleteEtudiant(id);
    }
   @GetMapping("/etudiant/{id}/empruntes")
    public List<Livre> EtudiantEmpruntes(@PathVariable Long id){
    return adminService.getEtudiantById(id).getEmprunts().stream()
            .map(Emprunte::getLivre)
            .collect(Collectors.toList());
   }
    @GetMapping("/etudiant/{id}/empruntes/dates")
    public List<Emprunte> EtudiantEmpruntesDates(@PathVariable Long id){
        return adminService.getEtudiantById(id).getEmprunts().stream()
                .map(emprunte -> new Emprunte(emprunte.getDateEmprunt(),emprunte.getDateRetour()))
                .collect(Collectors.toList());
    }

    @GetMapping("/etudiant/{id}/reserves")
    public List<Livre> EtudiantReserves(@PathVariable Long id){
        return adminService.getEtudiantById(id).getReservations().stream()
                .map(Reserve::getLivre)
                .collect(Collectors.toList());
    }

    @GetMapping("/etudiants/blacklist")
    public List<Etudiant> getBlackList(){
        return adminService.getBlackList();
    }
    @GetMapping("/etudiant/{id}/comment")
    public List<Comment> getComments(@PathVariable Long id){
        Etudiant etudiant= adminService.getEtudiantById(id);
       return etudiant.getComments();
    }
    @DeleteMapping("/comment/{idComment}")
    public void deleteComment(@PathVariable Long idComment){
        adminService.deleteComment(idComment);
    }

    @GetMapping("/bibliothecaires")
    public List<Bibliothecaire> getBibliothecaires(){
        return adminService.getAllBibliothecaires();
    }
    @GetMapping("/bibliothecaire/{id}")
    public Bibliothecaire getBibliothecaire(@PathVariable Long id){
        return adminService.getBibliothecaireById(id);
    }
    @DeleteMapping("/bibliothecaire/{id}")
    public void deleteBibliothecaire(@PathVariable Long id){
        adminService.deleteBibliothecaire(id);
    }

}
