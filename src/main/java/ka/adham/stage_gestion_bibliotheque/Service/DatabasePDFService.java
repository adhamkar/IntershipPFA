package ka.adham.stage_gestion_bibliotheque.Service;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.Category;
import ka.adham.stage_gestion_bibliotheque.Entities.Emprunte;
import ka.adham.stage_gestion_bibliotheque.Entities.Etudiant;
import ka.adham.stage_gestion_bibliotheque.Entities.Livre;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.awt.print.PageFormat;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class DatabasePDFService {
    public static ByteArrayInputStream etudiantPDFReport(List<Etudiant> etudiants) {
        Document document = new Document(PageSize.B4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);
            document.open();

            // Add Content to PDF file ->
            Font fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD, 22);
            Paragraph para = new Paragraph("etudiant Structure", fontHeader);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(Chunk.NEWLINE);


            PdfPTable table = new PdfPTable(8);
            float[] columnWidths = { 3f, 2.5f,7f, 1.5f, 4f, 2f, 2f, 1.5f};
            table.setWidths(columnWidths);
            table.setWidthPercentage(100);
            table.setHeaderRows(1);
            // Add PDF Table Header ->
            Stream.of( "Nom", "Prénom", "Email","Sexe","CNE","Ann","Filiere","Pays").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.TIMES_BOLD);
                header.setBackgroundColor(Color.CYAN);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(1);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });

            for (Etudiant etudiant : etudiants) {


                PdfPCell nomCell = new PdfPCell(new Phrase(etudiant.getNom()));
                nomCell.setPaddingLeft(4);
                nomCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                nomCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                nomCell.setPadding(7);
                table.addCell(nomCell);

                PdfPCell prenomCell = new PdfPCell(new Phrase(String.valueOf(etudiant.getPrenom())));
                prenomCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                prenomCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                prenomCell.setPaddingRight(4);
                table.addCell(prenomCell);

                PdfPCell emailCell = new PdfPCell(new Phrase(String.valueOf(etudiant.getEmail())));
                emailCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                emailCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                emailCell.setPaddingRight(4);
                table.addCell(emailCell);


                String genre=etudiant.getSexe().toString();
                if(genre.equals("Masculin")) {
                    genre = "M";
                }else{
                    genre = "F";

                }
                PdfPCell sexeCell = new PdfPCell(new Phrase(String.valueOf(genre)));
                sexeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                sexeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                sexeCell.setPaddingRight(4);
                table.addCell(sexeCell);

                PdfPCell cneCell = new PdfPCell(new Phrase(String.valueOf(etudiant.getCne())));
                cneCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cneCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cneCell.setPaddingRight(4);
                table.addCell(cneCell);

                PdfPCell niveauCell = new PdfPCell(new Phrase(String.valueOf(etudiant.getNiveau())));
                niveauCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                niveauCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                niveauCell.setPaddingRight(4);
                table.addCell(niveauCell);

                PdfPCell filiereCell = new PdfPCell(new Phrase(String.valueOf(etudiant.getFiliere())));
                filiereCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                filiereCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                filiereCell.setPaddingRight(4);
                table.addCell(filiereCell);

                String nationalite=etudiant.getNationalite();
                if(nationalite.equals("Marocain")) {
                    nationalite = "Mar";
                }else{
                    nationalite = "Etr";
                }

                PdfPCell nationaliteCell = new PdfPCell(new Phrase(String.valueOf(nationalite)));
                nationaliteCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                nationaliteCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                nationaliteCell.setPaddingRight(4);
                table.addCell(nationaliteCell);

            }
            document.add(table);

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }


    public static ByteArrayInputStream livrePDFReport(List<Livre> livres) {
        log.info("Starting PDF generation for livres");
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();
            log.info("PDF document opened");

            Font fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD, 22);
            Paragraph para = new Paragraph("Livres Structure", fontHeader);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(Chunk.NEWLINE);
            log.info("PDF header added");

            PdfPTable table = new PdfPTable(5);
            float[] columnWidths = { 3f, 4f, 4f, 5f, 2.5f };
            table.setWidths(columnWidths);
            table.setWidthPercentage(100);
            table.setHeaderRows(1);
            log.info("PDF table structure created");

            Stream.of("Titre", "Category", "Auteur", "Type", "Quantité").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.TIMES_BOLD);
                header.setBackgroundColor(Color.CYAN);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(1);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });
            log.info("PDF table headers added");

            for (Livre livre : livres) {
                PdfPCell titreCell = new PdfPCell(new Phrase(livre.getTitre()));
                titreCell.setPaddingLeft(4);
                titreCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                titreCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                titreCell.setPadding(7);
                table.addCell(titreCell);

                PdfPCell categoryCell = new PdfPCell(new Phrase(livre.getCategory().getDomaine()));
                categoryCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                categoryCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                categoryCell.setPaddingRight(4);
                table.addCell(categoryCell);

                PdfPCell auteurCell = new PdfPCell(new Phrase(livre.getAuteur()));
                auteurCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                auteurCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                auteurCell.setPaddingRight(4);
                table.addCell(auteurCell);

                PdfPCell typeCell = new PdfPCell(new Phrase(livre.getCategory().getSous_domaine()));
                typeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                typeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                typeCell.setPaddingRight(4);
                table.addCell(typeCell);

                PdfPCell quantiteCell = new PdfPCell(new Phrase(String.valueOf(livre.getQuantite().toString())));
                quantiteCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                quantiteCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                quantiteCell.setPaddingRight(4);
                table.addCell(quantiteCell);
            }
            document.add(table);
            log.info("PDF table content added");

            document.close();
            log.info("PDF document closed");
        } catch (DocumentException e) {
            log.error("Error occurred while generating PDF report for books", e);
        }
        return new ByteArrayInputStream(out.toByteArray());
    }

    public static ByteArrayInputStream EmpruntPDFReport(List<Emprunte> empruntes){
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();
            log.info("PDF document opened");

            Font fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD, 22);
            Paragraph para = new Paragraph("Empruntes Structure", fontHeader);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(Chunk.NEWLINE);
            log.info("PDF header added");

            PdfPTable table = new PdfPTable(5);
            float[] columnWidths = { 3f, 4f, 4f, 3f, 3f };
            table.setWidths(columnWidths);
            table.setWidthPercentage(100);
            table.setHeaderRows(1);
            log.info("PDF table structure created");

            Stream.of("Titre", "Category", "Type", "Date Emprunte", "Date Retour").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.TIMES_BOLD);
                header.setBackgroundColor(Color.CYAN);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(1);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });
            log.info("PDF table headers added");

            for (Emprunte emp : empruntes) {
                PdfPCell titreCell = new PdfPCell(new Phrase(emp.getLivre().getTitre()));
                titreCell.setPaddingLeft(4);
                titreCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                titreCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                titreCell.setPadding(7);
                table.addCell(titreCell);

                PdfPCell categoryCell = new PdfPCell(new Phrase(emp.getLivre().getCategory().getDomaine()));
                categoryCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                categoryCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                categoryCell.setPaddingRight(4);
                table.addCell(categoryCell);

                PdfPCell auteurCell = new PdfPCell(new Phrase(emp.getLivre().getCategory().getSous_domaine()));
                auteurCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                auteurCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                auteurCell.setPaddingRight(4);
                table.addCell(auteurCell);

                Date dateEmprunt = emp.getDateEmprunt();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
                String formattedDate = formatter.format(dateEmprunt);

                PdfPCell typeCell = new PdfPCell(new Phrase(formattedDate));
                typeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                typeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                typeCell.setPaddingRight(4);
                table.addCell(typeCell);

                Date dateRetour = emp.getDateRetour();
                SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd");
                String formattedDateRetour = formatter2.format(dateEmprunt);

                PdfPCell quantiteCell = new PdfPCell(new Phrase(formattedDateRetour));
                quantiteCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                quantiteCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                quantiteCell.setPaddingRight(4);
                table.addCell(quantiteCell);
            }
            document.add(table);
            log.info("PDF table content added");

            document.close();
            log.info("PDF document closed");
        } catch (DocumentException e) {
            log.error("Error occurred while generating PDF report for books", e);
        }
        return new ByteArrayInputStream(out.toByteArray());
    }

    public static ByteArrayInputStream CategoryPDFReport(List<Category> categories){
        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();
            log.info("PDF document opened");

            Font fontHeader = FontFactory.getFont(FontFactory.TIMES_BOLD, 22);
            Paragraph para = new Paragraph("Category Structure", fontHeader);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(Chunk.NEWLINE);
            log.info("PDF header added");

            PdfPTable table = new PdfPTable(3);
            float[] columnWidths = { 4f, 4f, 2f };
            table.setWidths(columnWidths);
            table.setWidthPercentage(100);
            table.setHeaderRows(1);
            log.info("PDF table structure created");

            Stream.of( "Category", "Type",  "Nombre de livres").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.TIMES_BOLD);
                header.setBackgroundColor(Color.CYAN);
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setBorderWidth(1);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });
            log.info("PDF table headers added");

            for (Category emp : categories) {
                PdfPCell domaineCell = new PdfPCell(new Phrase(emp.getDomaine()));
                domaineCell.setPaddingLeft(4);
                domaineCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                domaineCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                domaineCell.setPadding(6);
                table.addCell(domaineCell);

                PdfPCell TypeCell = new PdfPCell(new Phrase(emp.getSous_domaine()));
                TypeCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                TypeCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                TypeCell.setPaddingRight(6);
                table.addCell(TypeCell);

                int size=emp.getLivres().size();
                PdfPCell quantiteCell = new PdfPCell(new Phrase(String.valueOf(size)));
                quantiteCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                quantiteCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                quantiteCell.setPaddingRight(6);
                table.addCell(quantiteCell);

            }
            document.add(table);
            log.info("PDF table content added");

            document.close();
            log.info("PDF document closed");
        } catch (DocumentException e) {
            log.error("Error occurred while generating PDF report for books", e);
        }
        return new ByteArrayInputStream(out.toByteArray());
    }
}
