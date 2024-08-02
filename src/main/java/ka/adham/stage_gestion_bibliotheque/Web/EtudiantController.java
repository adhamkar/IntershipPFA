package ka.adham.stage_gestion_bibliotheque.Web;

import ka.adham.stage_gestion_bibliotheque.Entities.Category;
import ka.adham.stage_gestion_bibliotheque.Entities.Comment;
import ka.adham.stage_gestion_bibliotheque.Entities.Emprunte;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import ka.adham.stage_gestion_bibliotheque.Service.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
@RequestMapping("/etudiant")
public class EtudiantController {
    private EtudiantService etudiantService;


    private static void accept(String domaine) {
    }

    @GetMapping("/livres")
    public List<Livre> getLivres(){
        return etudiantService.getLivres();
    }
    @GetMapping("/emprunts/{id}")
    public List<Emprunte> getEmprunts(@PathVariable Long id){
        return etudiantService.getEmprunts(id);
    }
    @GetMapping("/retourner/{idEmprunt}")
    public void rendreLivre(@PathVariable Long idEmprunt){
        etudiantService.rendreLivre(idEmprunt);
    }
    @GetMapping("/prolonger/{idEmprunt}")
    public void prolongerEmprunt(@PathVariable Long idEmprunt){
        etudiantService.prolongerEmprunt(idEmprunt);
    }
    @GetMapping("/commenter/{idLivre}/{commentaire}/{idEtudiant}")
    public void ajouterCommentaire(@PathVariable Long idLivre, @PathVariable String commentaire, @PathVariable Long idEtudiant){
        etudiantService.ajouterCommentaire(idLivre, commentaire, idEtudiant);
    }
    @GetMapping("/commentaires/{idLivre}")
    public List<Comment> getCommentaires(@PathVariable Long idLivre){
        return etudiantService.getCommentaires(idLivre);
    }
    @DeleteMapping("/supprimerCommentaire/{idCommentaire}")
    public void supprimerCommentaire(@PathVariable Long idCommentaire){
        etudiantService.supprimerCommentaire(idCommentaire);
    }
    @GetMapping("/reserver/{idEtudiant}")
    public void reserverLivre( @PathVariable Long idEtudiant){
        etudiantService.getReservations(idEtudiant);
    }
    @DeleteMapping("/annulerReservation/{idReservation}")
    public void annulerReservation(@PathVariable Long idReservation){
        etudiantService.annulerReservation(idReservation);
    }
    @GetMapping("/categories")
    public List<Category> getCategories(){
        return etudiantService.getCategories();
    }
    @GetMapping("/categories/domaines")
    public List<String> getDomaines(){
        List<Category> categories= etudiantService.getCategories();
        List<String> domaines= new ArrayList<>();
        categories.forEach(category -> domaines.add(category.getDomaine()));
        List<String> Infos= new ArrayList<>();
        List<String> Maths= new ArrayList<>();
        List<String> Physq= new ArrayList<>();
        domaines.forEach(domaine -> {
            if(domaine.equals("Informatique")){
                Infos.add(domaine);
            }
            if(domaine.equals("mathematique")){
                Maths.add(domaine);
            }
            if(domaine.equals("Physique")){
                Physq.add(domaine);
            }
        });
        List<String> titles= new ArrayList<>();
        titles.add(Infos.get(0));
        titles.add(Maths.get(0));
        titles.add(Physq.get(0));
        return titles;
    }
    @GetMapping("/livres/{sousDomaine}")
    public List<Livre> getLivresBySousDomaine(@PathVariable String sousDomaine){
        return etudiantService.getLivresBySousDomaine(sousDomaine);
    }

    @GetMapping("/livres/category/{id}")
    public List<Livre> getLivresByCategory(@PathVariable Long id){
        Category category=etudiantService.getCategoryById(id);
        return category.getLivres();
    }
    @GetMapping("/informatique/livres")
    public List<Livre> getInformatiqueLivres(){
        List<Category> categories=etudiantService.getCategories();
        List<Livre> livres= new ArrayList<>();
        categories.forEach(category -> {
            if(category.getDomaine().equals("Informatique")){
                livres.addAll(category.getLivres());
            }
        });
        return livres;
    }
    @GetMapping("/mathematique/livres")
    public List<Livre> getMathematiqueLivres(){
        List<Category> categories=etudiantService.getCategories();
        List<Livre> livres= new ArrayList<>();
        categories.forEach(category -> {
            if(category.getDomaine().equals("mathematique")){
                livres.addAll(category.getLivres());
            }
        });
        return livres;
    }
    @GetMapping("/physique/livres")
    public List<Livre> getPhysiqueLivres(){
        List<Category> categories=etudiantService.getCategories();
        List<Livre> livres= new ArrayList<>();
        categories.forEach(category -> {
            if(category.getDomaine().equals("Physique")){
                livres.addAll(category.getLivres());
            }
        });
        return livres;
    }


}
