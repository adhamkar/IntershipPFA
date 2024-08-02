package ka.adham.stage_gestion_bibliotheque.Web;

import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Service.BibliothecaireService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private BibliothecaireService bibliothecaireService;

    @GetMapping("/etudiants")
    public List<Etudiant> getEtudiants(){
        return bibliothecaireService.getAllEtudiants();
    }

    @GetMapping("/emprunts")
    public List<Emprunte> getEmprunts(){
        return bibliothecaireService.getAllEmprunts();
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
    @GetMapping("/reservations")
    public List<Reserve> getReservations(){
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
        bibliothecaireService.deleteLivre(id);
    }
    @PostMapping("/livre")
    public Livre addLivre(@RequestBody Livre livre){
        return bibliothecaireService.addLivre(livre);
    }

    @PatchMapping("/livre")
    public Livre updateLivre(@RequestBody Livre livre){
        return bibliothecaireService.updateLivre(livre);
    }
    @PostMapping("/category")
    public Category addCategory(@RequestBody Category category){
        return bibliothecaireService.addCategory(category);
    }
    @PatchMapping("/category")
    public Category updateCategory(@RequestBody Category category){
        return bibliothecaireService.updateCategory(category);
    }
    @DeleteMapping("/category/{id}")
    public void deleteCategory(@PathVariable Long id){
        bibliothecaireService.deleteCategory(id);
    }
    @GetMapping("/livre/{id}")
    public Livre getLivre(@PathVariable Long id){
        return bibliothecaireService.getLivreById(id);
    }
    @PostMapping("/emprunt/approve/{id}")
    public void approveEmprunt(@PathVariable Long id){
        bibliothecaireService.ConfirmerEmprunt(id);
    }
    @DeleteMapping("/emprunt/refuse/{id}")
    public void refuseEmprunt(@PathVariable Long id){
        bibliothecaireService.RefuserEmprunt(id);
    }
    @PostMapping("/reservation/approve/{id}")
    public void approveReservation(@PathVariable Long id){
        bibliothecaireService.ConfirmerReservation(id);
    }
    @DeleteMapping("/reservation/refuse/{id}")
    public void refuseReservation(@PathVariable Long id){
        bibliothecaireService.RefuserReservation(id);
    }
    @PostMapping("/blacklist/{id}")
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

}
