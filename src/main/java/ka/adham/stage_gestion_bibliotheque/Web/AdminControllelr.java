package ka.adham.stage_gestion_bibliotheque.Web;
import com.fasterxml.jackson.annotation.JsonView;
import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.EtudiantViews;
import ka.adham.stage_gestion_bibliotheque.Repositories.ImageRepo;
import ka.adham.stage_gestion_bibliotheque.Service.AdminService;
import ka.adham.stage_gestion_bibliotheque.Service.StorageService;
import ka.adham.stage_gestion_bibliotheque.Service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    @Autowired private StorageService storageService;
    @Autowired private UserService userService;

    @GetMapping("/etudiants")
    public List<Etudiant> getEtudiants(){
        return adminService.getAllEtudiants();
    }
    @GetMapping("/paginated")
    public ResponseEntity<Page<Etudiant>> getLivresPaginated(@RequestParam int page, @RequestParam int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<Etudiant> etudiants = adminService.findAllEtudiants(pageable);
        return ResponseEntity.ok(etudiants);
    }
    @GetMapping("/etudiant/{id}")
    public Etudiant getEtudiant(@PathVariable Long id){
        return adminService.getEtudiantById(id);
    }

    @PostMapping(value="/etudiant", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Etudiant addEtudiant(@RequestBody Etudiant etudiant){
        //String uploadImage = storageService.uploadImage(file);
        List<Image> images = imageRepo.findAll();
        Image image = images.get(images.size()-1);
        etudiant.setImage(image);
        return adminService.addEtudiant(etudiant);

    }
    @PatchMapping(value="/etudiant/{id}", consumes = "application/json")
    public Etudiant updateEtudiant(@RequestBody Etudiant etudiant, @PathVariable Long id){
        Etudiant existingEtudiant = adminService.getEtudiantById(id);
        if(etudiant.getNom() != null){
            existingEtudiant.setNom(etudiant.getNom());
        }
        if(etudiant.getPrenom() != null){
            existingEtudiant.setPrenom(etudiant.getPrenom());
        }
        if(etudiant.getCne()!=null){
            existingEtudiant.setCne(etudiant.getCne());
        }
        if(etudiant.getEmail()!=null){
            existingEtudiant.setEmail(etudiant.getEmail());
        }
        if(etudiant.getFiliere()!=null){
            existingEtudiant.setFiliere(etudiant.getFiliere());
        }
        if(etudiant.getNiveau()!=null){
            existingEtudiant.setNiveau(etudiant.getNiveau());
        }
        if(etudiant.getTel()!=null){
            existingEtudiant.setTel(etudiant.getTel());
        }
        if(etudiant.getVille()!=null){
            existingEtudiant.setVille(etudiant.getVille());
        }
        if(etudiant.getImage()!=null){
            existingEtudiant.setImage(etudiant.getImage());
        }
        if(etudiant.getComments()!=null){
            existingEtudiant.setComments(etudiant.getComments());
        }
        if(etudiant.getEmprunts()!=null){
            existingEtudiant.setEmprunts(etudiant.getEmprunts());
        }
        if(etudiant.getReservations()!=null){
            existingEtudiant.setReservations(etudiant.getReservations());
        }
        if(etudiant.getNationalite()!=null){
            existingEtudiant.setNationalite(etudiant.getNationalite());
        }
        if(etudiant.getPassword()!=null){
            existingEtudiant.setPassword(etudiant.getPassword());
        }
        if(etudiant.getSexe()!=null){
            existingEtudiant.setSexe(etudiant.getSexe());
        }
        if(etudiant.isBlackListed()!=existingEtudiant.isBlackListed()){
            existingEtudiant.setBlackListed(etudiant.isBlackListed());
        }



        return adminService.updateEtudiant(existingEtudiant);
    }
    @DeleteMapping("/etudiant/{id}")
    public void deleteEtudiant(@PathVariable Long id){
        Etudiant etudiant = adminService.getEtudiantById(id);
        if (etudiant != null && etudiant.getImage() != null) {
            Image image = etudiant.getImage();
            storageService.deleteImage(image.getId());
        }
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
   @GetMapping("/livre/{id}/comment")
   @JsonView(EtudiantViews.CommentView.class)
    public List<Comment> getCommentsLivre(@PathVariable Long id){
        Livre livre= adminService.getLivreById(id);
        return livre.getComments();
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
@GetMapping("users")
    public List<User> getUsers(){
        return userService.findAllUsers();
}
}
