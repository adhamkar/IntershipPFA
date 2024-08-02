package ka.adham.stage_gestion_bibliotheque.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import ka.adham.stage_gestion_bibliotheque.Enums.EtatLivre;
import ka.adham.stage_gestion_bibliotheque.Repositories.CategoryRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.LivreRepo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class LivresImpl implements LivreService {
    @Autowired
    AdminService adminService;
    @Autowired
    LivreRepo LivreRepo;
    @Autowired
    CategoryRepo categoryRepo;


    @Override
    public List<Livre> SearchLivre(String query) {
        return LivreRepo.findByTitreContainingOrAuteurContaining(query, query);
    }
}

