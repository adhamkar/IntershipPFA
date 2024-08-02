package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.Livre;

import java.util.List;

public interface LivreService {
    //void insertLivresFromJson(String JsonFile);
    List<Livre> SearchLivre(String query);
}
