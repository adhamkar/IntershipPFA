package ka.adham.stage_gestion_bibliotheque.Entities;

import jakarta.persistence.*;
import ka.adham.stage_gestion_bibliotheque.Enums.EmpruntStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emprunte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private EmpruntStatus status;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateEmprunt;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateRetour;
    @ManyToOne
    private Livre livre;
    @ManyToOne
    private Etudiant etudiant;
    private String NomEtudiant;
    private String TitreLivre;
    private String Domaine;

    public Emprunte(Date dateEmprunt, Date dateRetour) {
        this.dateEmprunt = dateEmprunt;
        this.dateRetour = dateRetour;
    }
}
