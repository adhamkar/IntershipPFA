package ka.adham.stage_gestion_bibliotheque.Web;

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
    @Autowired
    private LivreService livreService;

    @GetMapping("/books")
    public Object searchBooks(@RequestParam String search){
        return livreService.SearchLivre(search);
    }

}
