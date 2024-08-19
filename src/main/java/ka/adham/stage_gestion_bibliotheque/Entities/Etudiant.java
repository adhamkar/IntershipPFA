package ka.adham.stage_gestion_bibliotheque.Entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Etudiant extends User{

    private boolean blackListed;
    @Column(nullable = false)
    private String cne;
    @Column(nullable = false)
    private String filiere;
    @Column(nullable = false)
    private String niveau;
    @Column(nullable = false)
    private String nationalite;

    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL)
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonManagedReference
    private List<Emprunte> emprunts;

    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL)
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonManagedReference
    private List<Reserve> reservations;

    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL)
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonManagedReference
    private List<Comment> comments;


}
