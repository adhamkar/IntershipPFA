package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.Category;
import ka.adham.stage_gestion_bibliotheque.Entities.Emprunte;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;

import java.util.List;

public interface LivreService {
    //void insertLivresFromJson(String JsonFile);
    List<Livre> SearchLivre(String query);

    List<Category> SearchCategory(String search);
    List<Emprunte> SearchEmprunte(String search);
}
