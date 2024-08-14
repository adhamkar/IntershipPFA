package ka.adham.stage_gestion_bibliotheque.Web;

import ka.adham.stage_gestion_bibliotheque.Entities.Category;
import ka.adham.stage_gestion_bibliotheque.Entities.Emprunte;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import ka.adham.stage_gestion_bibliotheque.Repositories.CategoryRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.EmprunteRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.EtudiantRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.LivreRepo;
import ka.adham.stage_gestion_bibliotheque.Service.DatabasePDFService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class PDFExportController {
    @Autowired EtudiantRepo etudiantRepo;
    @Autowired LivreRepo livreRepo;
    @Autowired EmprunteRepo emprunteRepo;
    @Autowired
    CategoryRepo categoryRepo;

    @GetMapping(value = "/openpdf/etudiants", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> employeeReport()  throws IOException {
        List<Etudiant> etudiants = (List<Etudiant>) etudiantRepo.findAll();

        ByteArrayInputStream bis = DatabasePDFService.etudiantPDFReport(etudiants);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=etudiants.pdf");

        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

    @GetMapping(value="/openpdf/livres",produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> livreReport() throws IOException{
        List<Livre> livres = (List<Livre>) livreRepo.findAll();
        ByteArrayInputStream bis = DatabasePDFService.livrePDFReport(livres);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=livres.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
    @GetMapping(value="/openpdf/empruntes")
    public ResponseEntity<InputStreamResource> EmpruntesReport() throws IOException {
        List<Emprunte> empruntes = (List<Emprunte>) emprunteRepo.findAll();
        ByteArrayInputStream bis = DatabasePDFService.EmpruntPDFReport(empruntes);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=empruntes.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
    @GetMapping(value="/openpdf/categories")
    public ResponseEntity<InputStreamResource> CategoriesReport() throws IOException {
        List<Category> categories = (List<Category>) categoryRepo.findAll();
        ByteArrayInputStream bis = DatabasePDFService.CategoryPDFReport(categories);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=categories.pdf");
        return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }

}
