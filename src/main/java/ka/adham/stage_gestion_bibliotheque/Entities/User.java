package ka.adham.stage_gestion_bibliotheque.Entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import ka.adham.stage_gestion_bibliotheque.Enums.Genre;
import ka.adham.stage_gestion_bibliotheque.EtudiantViews;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "Role")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @JsonView(EtudiantViews.CommentView.class)
    private String nom;
    @Column(nullable = false)
    @JsonView(EtudiantViews.CommentView.class)
    private String prenom;

    @Column(unique = true,nullable = false)
    @Pattern(
            regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
            message = "Invalid email address"
    )
    private String email;
    @Column(nullable = false)
    @Size(min=6)
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$",
            message = "Password must contain at least one letter, one number, and one special character"
    )
    private String password;
    @Column(unique = true,nullable = false)
    private String tel;
    @Column(nullable = false)
    private String ville;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Genre sexe;

    @ManyToOne
    @JsonView(EtudiantViews.DefaultView.class)
    private Image image;

    @Formula("Role")
    private String role;
}
