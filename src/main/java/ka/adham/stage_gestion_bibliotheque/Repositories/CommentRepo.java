package ka.adham.stage_gestion_bibliotheque.Repositories;

import ka.adham.stage_gestion_bibliotheque.Entities.Comment;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment, Long>{
    List<Comment> getCommentsByLivre(Livre livre);
}
