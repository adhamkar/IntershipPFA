package ka.adham.stage_gestion_bibliotheque.Entities;

import com.fasterxml.jackson.annotation.*;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(EtudiantViews.CommentView.class)
    private Long id;
    @JsonView(EtudiantViews.CommentView.class)
    private String commentaire;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonView(EtudiantViews.CommentView.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date CreatedDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonView(EtudiantViews.CommentView.class)
    //@JsonBackReference
    private Etudiant etudiant;
    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Livre livre;


}
