package ka.adham.stage_gestion_bibliotheque.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateReservation;
    @ManyToOne
    private Livre livre;
    @ManyToOne
    private Etudiant etudiant;
    private String NomEtudiant;
    private String TitreLivre;
    private String Domaine;
}
