package ka.adham.stage_gestion_bibliotheque.Web;

import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Service.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
@RequestMapping("/etudiant")

public class EtudiantController {
    @Autowired private EtudiantService etudiantService;
    @Autowired private TacheService taskService;
    @Autowired private AdminService adminService;
    @Autowired private BibliothecaireService bibliothecaireService;


    private static void accept(String domaine) {
    }

    @GetMapping("/livres")
    public List<Livre> getLivres(){
        return etudiantService.getLivres();
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<Livre>> getLivresPaginated(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Livre> livres = etudiantService.findAll(pageable);
        return ResponseEntity.ok(livres);
    }
    @GetMapping("/paginated/categories")
    public ResponseEntity<Page<Category>> getCategoriesPaginated(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Category> categories = etudiantService.findAllCategories(pageable);
        return ResponseEntity.ok(categories);
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
    @PostMapping(value="/commenter/{idLivre}/{idEtudiant}")
    public Comment ajouterCommentaire(@RequestBody Comment comment, @PathVariable Long idLivre, @PathVariable Long idEtudiant){
        log.info("Received Content-Type: {}", RequestContextHolder.currentRequestAttributes().getAttribute("Content-Type", RequestAttributes.SCOPE_REQUEST));
        log.info("Received Comment: {}", comment);
        Livre livre=bibliothecaireService.getLivreById(idLivre);
        Etudiant etudiant=adminService.getEtudiantById(idEtudiant);
        comment.setEtudiant(etudiant);
        comment.setLivre(livre);
        comment.setCreatedDate(new Date());
        return etudiantService.ajouterCommentaire(comment);
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

    @GetMapping("/livres/category/number/{id}")
    public int getLivresNumberByCategory(@PathVariable Long id){
        Category category=etudiantService.getCategoryById(id);
        List<Livre> livres=category.getLivres();
        return livres.size();

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
    @GetMapping("/informatique/categories")
    public List<Category> getInformatiqueCategories(){
        List<Category> categories=etudiantService.getCategories();
        List<Category> Infos= new ArrayList<>();
        categories.forEach(category -> {
            if(category.getDomaine().equals("Informatique")){
                Infos.add(category);
            }
        });
        return Infos;
    }
    @GetMapping("/mathematique/categories")
    public List<Category> getMathematiqueCategories(){
        List<Category> categories=etudiantService.getCategories();
        List<Category> Maths= new ArrayList<>();
        categories.forEach(category -> {
            if(category.getDomaine().equals("mathematique")){
                Maths.add(category);
            }
        });
        return Maths;
    }
    @GetMapping("/physique/categories")
    public List<Category> getPhysiqueCategories(){
        List<Category> categories=etudiantService.getCategories();
        List<Category> Physq= new ArrayList<>();
        categories.forEach(category -> {
            if(category.getDomaine().equals("Physique")){
                Physq.add(category);
            }
        });
        return Physq;
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

    @GetMapping("/tasks/{etudiantId}")
    public List<Tache> getTasksByEtudiant(@PathVariable Long etudiantId) {
        return taskService.getAllTasksByEtudiant(etudiantId);
    }
    @PostMapping("/addtask/{etudiantId}")
    public Tache addTask(@RequestBody Tache task, @PathVariable Long etudiantId) {
        Etudiant etudiant = adminService.getEtudiantById(etudiantId);
        task.setEtudiant(etudiant);
        task.setCompleted(false);
        return taskService.addTask(task);
    }
    @PatchMapping("/updateTask/{taskId}")
    public Tache updateTask(@RequestBody Tache task,@PathVariable Long taskId) {
        Tache existedTache = taskService.getTaskById(taskId);
        if(task.getTitle()!=null){
            existedTache.setTitle(task.getTitle());
        }
        if(task.getDescription()!=null){
            existedTache.setDescription(task.getDescription());
        }
        if(task.getStartDateTime()!=null){
            existedTache.setStartDateTime(task.getStartDateTime());
        }
        if(task.getEndDateTime()!=null){
            existedTache.setEndDateTime(task.getEndDateTime());
        }
        if(task.isCompleted()){
            existedTache.setCompleted(true);
        }
        return taskService.updateTask(existedTache);
    }
    @DeleteMapping("/delete/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
    }
    @PatchMapping("/complete/{taskId}")
    public Tache markTaskAsComplete(@PathVariable Long taskId) {
        return taskService.markTaskAsComplete(taskId);
    }

    //borrow and reserve methodes
    @PostMapping("/borrow/{bookId}/{studentId}")
    public ResponseEntity<String> borrowBook(@PathVariable Long bookId, @PathVariable Long studentId) {
        try {
            Emprunte emprunte = new Emprunte();
            etudiantService.emprunterLivre(emprunte,bookId, studentId);
            return ResponseEntity.ok("Book borrowed successfully");
        }catch (Exception e){
            System.err.println("Error during borrowing process: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/reserver/{bookId}/{studentId}")
    public ResponseEntity<String> reserverLivre(@PathVariable Long bookId, @PathVariable Long studentId) {
        try {
            Reserve reserve = new Reserve();
            etudiantService.reserverLivre(reserve,bookId, studentId);
            return ResponseEntity.ok("Book borrowed successfully");
        }catch (Exception e){
            System.err.println("Error during borrowing process: " + e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
