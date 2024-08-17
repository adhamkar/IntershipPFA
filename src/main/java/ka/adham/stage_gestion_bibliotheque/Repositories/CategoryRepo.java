package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category, Long>{
    Category getCategoryById(Long id);
    Category getCategoryByDomaine(String name);
    Page<Category> findAllByDomaine(String domaine, Pageable pageable);
    @Query("SELECT c FROM Category c WHERE c.domaine LIKE %:search% OR c.sous_domaine LIKE %:search%")
    List<Category> search(@Param("search") String search);
    @Query("SELECT c FROM Category c WHERE c.domaine = :domaine AND c.sous_domaine = :sous_domaine")
    Category getCategoryByDomaineAndSousdomaine(@Param("domaine") String domaine, @Param("sous_domaine") String sous_domaine);

    List<Category> getCategoriesByDomaine(String domaine);
}
