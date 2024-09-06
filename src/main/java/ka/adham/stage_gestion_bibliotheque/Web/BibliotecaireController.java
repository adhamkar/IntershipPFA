package ka.adham.stage_gestion_bibliotheque.Web;

import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Repositories.*;
import ka.adham.stage_gestion_bibliotheque.Service.BibliothecaireService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
@RequestMapping("/bibliotecaire")
public class BibliotecaireController {

    @Autowired
    private BibliothecaireService bibliothecaireService;
    @Autowired
    private ImageRepo imageRepo;
    @Autowired private CategoryRepo categoryRepo;
    @Autowired private EmprunteRepo emprunteRepo;
    @Autowired private ReserveRepo reserveRepo;
    @Autowired private EtudiantRepo etudiantRepo;

    @GetMapping("/etudiants")
    public List<Etudiant> getEtudiants(){
        return bibliothecaireService.getAllEtudiants();
    }

    @GetMapping("/emprunts")
    public List<Emprunte> getEmprunts(){
        List<Emprunte> emprunteList=bibliothecaireService.getAllEmprunts();
        emprunteList.forEach(emprunte -> {
            emprunte.setEtudiant(emprunte.getEtudiant());
            emprunte.setNomEtudiant(emprunte.getEtudiant().getNom());
            emprunte.setTitreLivre(emprunte.getLivre().getTitre());
            emprunte.setDomaine(emprunte.getLivre().getCategory().getDomaine());
            emprunteRepo.save(emprunte);

        });
        return emprunteList;
    }
    @GetMapping("/reserves")
    public List<Reserve> getReservations(){
        List<Reserve> reserves=bibliothecaireService.getAllReservations();
        reserves.forEach(reservation -> {
            reservation.setEtudiant(reservation.getEtudiant());
            reservation.setNomEtudiant(reservation.getEtudiant().getNom());
            reservation.setTitreLivre(reservation.getLivre().getTitre());
            reservation.setDomaine(reservation.getLivre().getCategory().getDomaine());
            reserveRepo.save(reservation);

        });
        return reserves;
    }
    @GetMapping("/emprunt/{id}")
    public Emprunte getEmprunt(@PathVariable Long id){
        return emprunteRepo.findById(id).orElseThrow();
    }
    @GetMapping("/etudiant/{id}/emprunts")
    public List<Emprunte> getEmpruntsByEtudiant(@PathVariable Long id){
        return bibliothecaireService.getEtudiantById(id).getEmprunts();
    }
    @GetMapping("/etudiant/{id}/reservations")
    public List<Reserve> getReservationsByEtudiant(@PathVariable Long id){
        return bibliothecaireService.getEtudiantById(id).getReservations();
    }
    @GetMapping("/etudiant/{id}/emprunts/dates")
    public List<Emprunte> EtudiantEmpruntesDates(@PathVariable Long id){
        return bibliothecaireService.getEtudiantById(id).getEmprunts().stream()
                .map(emprunte -> new Emprunte(emprunte.getDateEmprunt(),emprunte.getDateRetour()))
                .collect(Collectors.toList());
    }
    @GetMapping("/etudiantNom/emprunt/{nom}/{idEmprunte}")
    public Etudiant getEtudiantEmprunt(@PathVariable String nom,@PathVariable Long idEmprunte){
        return bibliothecaireService.getEtudiantEmprunt(nom,idEmprunte);
    }
    @GetMapping("/reservations")
    public List<Reserve> getAllReservations(){
        return bibliothecaireService.getAllReservations();
    }
    @GetMapping("/livres")
    public List<Livre> getLivres(){
        return bibliothecaireService.getLivres();
    }
    @GetMapping("/categories")
    public List<Category> getCategories(){
        return bibliothecaireService.getAllCategories();
    }
    @GetMapping("/blacklist")
    public List<Etudiant> getBlackList(){
        return bibliothecaireService.getBlackList();
    }
    @DeleteMapping("/livre/{id}")
    public void deleteLivre(@PathVariable Long id){
        Image image=bibliothecaireService.getLivreById(id).getImage();
        imageRepo.delete(image);
        bibliothecaireService.deleteLivre(id);
    }
    @PostMapping(value="/livre", consumes = "application/json")
    public Livre addLivre(@RequestBody Livre livre){
        List<Image> images = imageRepo.findAll();
        Image image = images.get(images.size()-1);
        livre.setImage(image);
        return bibliothecaireService.addLivre(livre);
    }
    @PatchMapping(value="/livre/{id}", consumes = "application/json")
    public Livre updateLivre(@RequestBody Livre livre,@PathVariable Long id){
        Livre UpdatedLivre = bibliothecaireService.getLivreById(id);
        if(livre.getTitre() != null){
            UpdatedLivre.setTitre(livre.getTitre());
        }
        if(livre.getAuteur() != null){
            UpdatedLivre.setAuteur(livre.getAuteur());
        }
        if(livre.getDisponibilite() != null){
            UpdatedLivre.setDisponibilite(livre.getDisponibilite());
        }
        if(livre.getQuantite() != null){
            UpdatedLivre.setQuantite(livre.getQuantite());
        }
        if(livre.getBibliothecaire() != null){
            UpdatedLivre.setBibliothecaire(livre.getBibliothecaire());
        }
        if (livre.getDateSortie()!=null){
            UpdatedLivre.setDateSortie(livre.getDateSortie());
        }
        if(livre.getDescription() != null){
            UpdatedLivre.setDescription(livre.getDescription());
        }
        return bibliothecaireService.updateLivre(UpdatedLivre);
    }

    @PatchMapping(value="addedBook/{domaine}/{sousDomaine}", consumes = "application/json")
    public Livre addBookCategory(@RequestBody Livre livre,@PathVariable String domaine,@PathVariable String sousDomaine){
        List<Livre> livres = bibliothecaireService.getLivres();
        livre=livres.get(livres.size()-1);
        Livre existingLivre = bibliothecaireService.getLivreById(livre.getId());
        if(livre.getTitre() != null){
            existingLivre.setTitre(livre.getTitre());
        }
        if(livre.getAuteur() != null){
            existingLivre.setAuteur(livre.getAuteur());
        }
        if(livre.getDisponibilite() != null){
            existingLivre.setDisponibilite(livre.getDisponibilite());
        }
        if(livre.getQuantite() != null){
            existingLivre.setQuantite(livre.getQuantite());
        }
        if(livre.getBibliothecaire() != null){
            existingLivre.setBibliothecaire(livre.getBibliothecaire());
        }
        if(livre.getDateSortie()!=null){
            existingLivre.setDateSortie(livre.getDateSortie());
        }
            Category category = categoryRepo.getCategoryByDomaineAndSousdomaine(domaine,sousDomaine);
            if(category!=null){
                existingLivre.setCategory(category);
            }

        return bibliothecaireService.updateLivre(existingLivre);
    }
    @PostMapping(value="/category", consumes = "application/json")
    public Category addCategory(@RequestBody Category category){
        List<Image> images = imageRepo.findAll();
        Image image = images.get(images.size()-1);
        category.setImage(image);
        return bibliothecaireService.addCategory(category);
    }
    @PatchMapping(value="/category/{id}", consumes = "application/json")
    public Category updateCategory(@RequestBody Category category,@PathVariable Long id){
        Category existingCategory = categoryRepo.getCategoryById(id);
        if (category.getDomaine() != null) {
            existingCategory.setDomaine(category.getDomaine());
        }
        if (category.getSous_domaine() != null) {
            existingCategory.setSous_domaine(category.getSous_domaine());
        }
        if (category.getLivres() != null) {
            existingCategory.setLivres(category.getLivres());
        }
        if (category.getImage() != null) {
            existingCategory.setImage(category.getImage());
        }
        return bibliothecaireService.updateCategory(existingCategory);

    }
    @DeleteMapping("/category/{id}")
    public void deleteCategory(@PathVariable Long id){
        Image image=categoryRepo.getCategoryById(id).getImage();
        imageRepo.delete(image);
        bibliothecaireService.deleteCategory(id);
    }
    @GetMapping("/livre/{id}")
    public Livre getLivre(@PathVariable Long id){
        return bibliothecaireService.getLivreById(id);
    }
    @PostMapping(value="/emprunt/approve/{id}", consumes = "application/json")
    public void approveEmprunt(@PathVariable Long id){
        bibliothecaireService.ConfirmerEmprunt(id);
    }
    @DeleteMapping("/emprunt/delete/{id}")
    public void refuseEmprunt(@PathVariable Long id){
        bibliothecaireService.RefuserEmprunt(id);
    }
    @PostMapping(value="/reservation/approve/{id}", consumes = "application/json")
    public void approveReservation(@PathVariable Long id){
        bibliothecaireService.ConfirmerReservation(id);
    }
    @DeleteMapping("/reservation/refuse/{id}")
    public void refuseReservation(@PathVariable Long id){
        bibliothecaireService.RefuserReservation(id);
    }
    @PostMapping(value="/blacklist/{id}", consumes = "application/json")
    public List<Etudiant> addToBlackList(@PathVariable Long id){
        return bibliothecaireService.addToBlackList(id);
    }
    @GetMapping("/CategoriesNames")
    public List<String> getCategoriesNames(){
        List<String> Names=new ArrayList<>();
        List<String> Info=new ArrayList<>();
        List<String> Math=new ArrayList<>();
        List<String> Phys=new ArrayList<>();
        List<String> CategoriesName=bibliothecaireService.getCategoriesNames();

        for(String name:CategoriesName){
            switch (name) {
                case "Informatique" -> Info.add(name);
                case "mathematique" -> Math.add(name);
                case "Physique" -> Phys.add(name);
            }
        }
        Names.add(Info.get(0));
        Names.add(Math.get(0));
        Names.add(Phys.get(0));
        return Names;
    }
    @GetMapping("/NombreEmpruntsParLivre/{id}")
    public Long getNombreEmpruntsParLivre(@PathVariable Long id){
        return bibliothecaireService.getNombreEmpruntsParLivre(id);
    }
    @GetMapping("/livres/number/{sousDomaine}")
    public Long getNombreLivresBySousDomaine(@PathVariable String sousDomaine){
        return bibliothecaireService.getNombreLivresBySousDomaine(sousDomaine);
    }
    @PutMapping("/return/{etudiantId}/{emprunteId}")
    public ResponseEntity<String> markEmpruntAsReturned(@PathVariable Long etudiantId,@PathVariable Long emprunteId) {
        try {
            Etudiant etudiant = etudiantRepo.findById(etudiantId).orElseThrow();
            Emprunte emprunte=emprunteRepo.findById(emprunteId).orElseThrow();
            bibliothecaireService.MarkEmpruntAsReturned(etudiant,emprunte);
            return ResponseEntity.ok("Emprunt marked as returned successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error marking emprunt as returned: " + e.getMessage());
        }
    }

}
