package ka.adham.stage_gestion_bibliotheque.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import ka.adham.stage_gestion_bibliotheque.Enums.EtatLivre;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
    public class Livre {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private Long quantite;
        private String titre;
        private String auteur;
        private String description;
        //private String imageCouverture;
        @Enumerated(EnumType.STRING)
        private EtatLivre disponibilite;
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private Date dateSortie;
        @ManyToOne
        private Category category;
        @ManyToOne
        private Bibliothecaire bibliothecaire;

        @OneToMany(mappedBy = "livre", cascade = CascadeType.ALL)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        private List<Emprunte> emprunts;

        @OneToMany(mappedBy = "livre", cascade = CascadeType.ALL)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        private List<Reserve> reservations;

        @OneToMany(mappedBy = "livre", cascade = CascadeType.ALL)
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        private List<Comment> comments;

        @ManyToOne
        private Image image;
    }
