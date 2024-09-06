package ka.adham.stage_gestion_bibliotheque.Web;

import ka.adham.stage_gestion_bibliotheque.Service.AdminService;
import ka.adham.stage_gestion_bibliotheque.Service.EtudiantService;
import ka.adham.stage_gestion_bibliotheque.Service.LivreService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
@RequestMapping("/search")
public class SearchEngine {
    @Autowired private LivreService livreService;
    @Autowired private AdminService adminService;

    @GetMapping("/books")
    public Object searchBooks(@RequestParam String search){
        return livreService.SearchLivre(search);
    }
    @GetMapping("/students")
    public Object searchStudents(@RequestParam String search){
        return adminService.searchEtudiants(search);
    }
    @GetMapping("/categories")
    public Object searchCategory(@RequestParam String search){
        return livreService.SearchCategory(search);
    }
    @GetMapping("/emprunts")
    public Object searchEmprunte(@RequestParam String search){
        return livreService.SearchEmprunte(search);
    }
    @GetMapping("/reservations")
    public Object searchreservations(@RequestParam String search){
        return livreService.SearchReservation(search);
    }

}
