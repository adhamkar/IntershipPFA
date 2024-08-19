package ka.adham.stage_gestion_bibliotheque.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import ka.adham.stage_gestion_bibliotheque.EtudiantViews;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonView(EtudiantViews.CommentView.class)
    private String commentaire;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonView(EtudiantViews.CommentView.class)
    private Date CreatedDate;
    @ManyToOne
    @JsonView(EtudiantViews.CommentView.class)
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    //@JsonManagedReference
    @JsonBackReference
    private Etudiant etudiant;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Livre livre;


}
