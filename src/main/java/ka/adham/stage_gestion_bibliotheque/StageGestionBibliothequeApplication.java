package ka.adham.stage_gestion_bibliotheque;

import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Enums.EmpruntStatus;
import ka.adham.stage_gestion_bibliotheque.Enums.EtatLivre;
import ka.adham.stage_gestion_bibliotheque.Enums.Genre;
import ka.adham.stage_gestion_bibliotheque.Repositories.EmprunteRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.LivreRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.ReserveRepo;
import ka.adham.stage_gestion_bibliotheque.Service.AdminService;
import ka.adham.stage_gestion_bibliotheque.Service.BibliothecaireService;
import ka.adham.stage_gestion_bibliotheque.Service.EtudiantService;
import ka.adham.stage_gestion_bibliotheque.Service.LivreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.*;
import java.util.stream.Stream;

@SpringBootApplication
public class StageGestionBibliothequeApplication {

    private final LivreRepo livreRepo;
    @Autowired
    private ReserveRepo reserveRepo;

    public StageGestionBibliothequeApplication(LivreRepo livreRepo) {
        this.livreRepo = livreRepo;
    }

    public static void main(String[] args) {
        SpringApplication.run(StageGestionBibliothequeApplication.class, args);
    }

    //@Bean
    CommandLineRunner commandLineRunner(EtudiantService etudiantService, AdminService adminService, BibliothecaireService bibliothecaireService) {
        return args -> {
            Random random = new Random();
            Genre[] genres = Genre.values();
            EtatLivre[] etatLivre = EtatLivre.values();

            Stream.of("Adham", "Ikram", "Karim").forEach(name -> {
                Etudiant etudiant = new Etudiant();
                etudiant.setNom(name);
                etudiant.setPrenom(name);
                etudiant.setCne("CNE" + name);
                etudiant.setEmail(name + "@gmail.com");
                etudiant.setPassword(name + "@123");
                StringBuilder phoneNumber = new StringBuilder("06");
                for (int j = 0; j < 8; j++) {
                    phoneNumber.append(random.nextInt(10));
                }
                etudiant.setTel(phoneNumber.toString());
                etudiant.setSexe(genres[random.nextInt(genres.length)]);
                etudiant.setVille("Rabat");
                //etudiant.setPhotoProfile("https://www.google.com");

                adminService.addEtudiant(etudiant);
            });
            Stream.of("Ahmed", "Sara", "Aymane").forEach(name -> {
                Bibliothecaire bibliothecaire = new Bibliothecaire();
                bibliothecaire.setNom(name);
                bibliothecaire.setPrenom(name);
                bibliothecaire.setEmail(name + "@gmail.com");
                bibliothecaire.setPassword(name + "@123");
                StringBuilder phoneNumber = new StringBuilder("06");
                for (int j = 0; j < 8; j++) {
                    phoneNumber.append(random.nextInt(10));
                }
                bibliothecaire.setTel(phoneNumber.toString());
                bibliothecaire.setSexe(genres[random.nextInt(genres.length)]);
                bibliothecaire.setVille("Rabat");
                //bibliothecaire.setPhotoProfile("https://www.google.com");
                adminService.addBibliothecaire(bibliothecaire);
            });
            Admin admin = new Admin();
            admin.setNom("Malika");
            admin.setPrenom("karmadi");
            admin.setEmail("malika34@gmail.com");
            admin.setPassword("malika@123");
            admin.setTel("0612345678");
            admin.setSexe(Genre.Feminin);
            admin.setVille("Rabat");
            //admin.setPhotoProfile("https://www.google.com");
            adminService.addAdmin(admin);

            Stream.of("Algorithmique", "Programmation", "Base de Donnée", "Developpement Web", "Science donnée", "Big Data", "Securité").forEach(sousDomaine -> {
                Category category = new Category();
                category.setDomaine("Informatique");
                category.setSous_domaine(sousDomaine);
                bibliothecaireService.addCategory(category);
            });
            Stream.of("Probabilité", "Algebre Lineaire", "Analyse Numerique", "Recherche operationnelle").forEach(sousDomaine -> {
                Category category = new Category();
                category.setDomaine("mathematique");
                category.setSous_domaine(sousDomaine);
                bibliothecaireService.addCategory(category);
            });
            Stream.of("Mecanique du point", "Mecanique du solide", "Electomagnetique", "Electrostatique").forEach(sousDomaine -> {
                Category category = new Category();
                category.setDomaine("Physique");
                category.setSous_domaine(sousDomaine);
                bibliothecaireService.addCategory(category);
            });
            List<Category> categories = bibliothecaireService.getAllCategories();

                Stream.of("Livre1", "Livre2", "Livre3", "Livre4", "Livre5","Livre6").forEach(titre -> {
                    Livre livre = new Livre();
                    livre.setTitre(titre);
                    livre.setAuteur("Auteur de" + titre);
                    livre.setBibliothecaire(adminService.getBibliothecaireById((long) random.nextInt(3) + 4));
                    livre.setDescription("Description de " + titre);
                    //livre.setImageCouverture("https://www.google.com");
                    livre.setDisponibilite(etatLivre[random.nextInt(etatLivre.length)]);
                    livre.setDateSortie(new Date());
                    livre.setCategory(categories.get(random.nextInt(categories.size())));
                    livre.setQuantite((long) random.nextInt(100));
                    bibliothecaireService.addLivre(livre);
                });


            Stream.of("Good book", "Nice book", "Great book", "Awesome book", "Amazing book").forEach(commentaire -> {
                Comment comment = new Comment();
                comment.setCommentaire(commentaire);
                comment.setCreatedDate(new Date());
                comment.setEtudiant(adminService.getEtudiantById((long) random.nextInt(3) + 1));
                comment.setLivre(bibliothecaireService.getLivreById((long) random.nextInt(6) + 1));

                etudiantService.ajouterCommentaire(comment.getLivre().getId(), comment.getCommentaire(), comment.getEtudiant().getId());
            });
            etudiantService.emprunterLivre(1L, 1L);
            etudiantService.reserverLivre(5L, 2L);
            etudiantService.reserverLivre(5L, 1L);


            List<Livre> livres = new ArrayList<>();
            List<Livre> list = etudiantService.getLivres();
            list.forEach(livre -> {
                if (livre.getDisponibilite().equals(EtatLivre.Disponible)) {
                    livres.add(livre);
                }
            });
            livres.forEach(livre -> {
                etudiantService.emprunterLivre(livre.getId(), (long) random.nextInt(3) + 1);
            });
        };
    }

   //   @Bean
     CommandLineRunner cmLineRunner(EtudiantService etudiantService,
                                    AdminService adminService,
                                    BibliothecaireService bibliothecaireService,
                                    EmprunteRepo emprunteRepo) {

        return args -> {
            Long[] studentIds = {13L, 14L, 35L, 36L};
            Long[] bookIds = {1L, 2L, 3L, 4L, 5L, 6L};

            for (int i = 0; i < 20; i++) {
                Emprunte emprunte = new Emprunte();
                Calendar calendar = Calendar.getInstance();

                // Generate random year, month, and day for 'dateEmprunt'
                int year = 2024;
                int month = (int) (Math.random() * 12); // Random month between 0 (Jan) and 11 (Dec)
                int day = (int) (Math.random() * 28) + 1; // Random day between 1 and 28 to avoid invalid dates

                calendar.set(Calendar.YEAR, year);
                calendar.set(Calendar.MONTH, month);
                calendar.set(Calendar.DAY_OF_MONTH, day);
                Date customDate = calendar.getTime();

                emprunte.setDateEmprunt(customDate);

                // Add 15 days for 'dateRetour'
                calendar.add(Calendar.DAY_OF_MONTH, 15);
                Date returnDate = calendar.getTime();
                emprunte.setDateRetour(returnDate);

                // Set random student and book
                Long studentId = studentIds[(int) (Math.random() * studentIds.length)];
                Long bookId = bookIds[(int) (Math.random() * bookIds.length)];

                emprunte.setStatus(EmpruntStatus.OK);
                emprunte.setEtudiant(adminService.getEtudiantById(studentId));
                emprunte.setNomEtudiant(emprunte.getEtudiant().getNom());
                emprunte.setLivre(bibliothecaireService.getLivreById(bookId));
                emprunte.setTitreLivre(emprunte.getLivre().getTitre());
                emprunte.setDomaine(emprunte.getLivre().getCategory().getDomaine());

                // Save the emprunte
                emprunteRepo.save(emprunte);
        };
};
}
}
