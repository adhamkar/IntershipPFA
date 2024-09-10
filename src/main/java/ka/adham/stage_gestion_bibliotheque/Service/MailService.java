package ka.adham.stage_gestion_bibliotheque.Service;

import com.google.zxing.WriterException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import ka.adham.stage_gestion_bibliotheque.Entities.*;
import ka.adham.stage_gestion_bibliotheque.Enums.EmpruntStatus;
import ka.adham.stage_gestion_bibliotheque.QRCode.QRCodeGenerator;
import ka.adham.stage_gestion_bibliotheque.Repositories.EmprunteRepo;
import ka.adham.stage_gestion_bibliotheque.Repositories.ReserveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class MailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired private EmprunteRepo emprunteRepo;
    @Autowired private ReserveRepo reserveRepo;

    public void sendBorrowConfirmationEmail(Etudiant etudiant, Livre livre ) throws MessagingException, IOException, WriterException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        Emprunte emprunte= emprunteRepo.findByEtudiantAndLivre(etudiant, livre);
        helper.setTo(etudiant.getEmail());
        helper.setSubject("Confirmation de l'emprunt du livre " + livre.getTitre());

        String text = "Cher(è) " + etudiant.getNom() + " " + etudiant.getPrenom() + ",\n"
                + "Vous avez emprunter le livre" + livre.getTitre() + " avec Succés.\n"
                + "Voici votre QR Code pour emprunter votre livre chez notre bibliothecaire à l'Enset. \n"
                + "Merci d'utiliser notre bibliothéque.";
        helper.setText(text);

        String content = "Employé : " + etudiant.getNom() + " " + etudiant.getPrenom()
                + "\nCNE : " + etudiant.getCne() + "\nEmail : " + etudiant.getEmail() + "\n"
                +"Filiere : " + etudiant.getFiliere() +" "+"\n"+ "Niveau :"+ etudiant.getNiveau()+ "\n"
                + "Id du Livre : " + livre.getId() +"Livre : " + livre.getTitre() + "\nAuteur : " + livre.getAuteur() + "\n"
                + "Date d'emprunt : " + emprunte.getDateEmprunt() + "\nDate de retour : " + emprunte.getDateRetour()
                + "\nStatus : " + emprunte.getStatus();

        byte[] qrCodeImage= QRCodeGenerator.generateQRCodeImage(content, 200, 200);
        helper.addAttachment("QRCode.png", new ByteArrayResource(qrCodeImage));

        mailSender.send(message);
    }
    public void sendBlackListEmail(Etudiant etudiant) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        List<Emprunte> empruntes=emprunteRepo.getEmpruntesByEtudiant(etudiant);
        List<Emprunte> BlckEmprunts=new ArrayList<>();
        empruntes.forEach(emprunte->{
            if(emprunte.getStatus().equals(EmpruntStatus.NonRendu)){
                BlckEmprunts.add(emprunte);
            }
        });
        helper.setTo(etudiant.getEmail());
        helper.setSubject("Vous etes dans la liste noire");

        StringBuilder text = new StringBuilder("Cher(è) " + etudiant.getNom() + " " + etudiant.getPrenom() + ",\n"
                + "Vous etes dans la liste noire de la bibliothéque de l'Enset.\n"
                + "Car les livres suivants n'ont pas été rendus :\n");
        for (Emprunte emprunte : BlckEmprunts) {
            text.append("Livre : ").append(emprunte.getLivre().getTitre()).append("\n")
                    .append("Date d'emprunt : ").append(emprunte.getDateEmprunt()).append("\n")
                    .append("Date de retour : ").append(emprunte.getDateRetour()).append("\n\n");
        };
        String text2 = "Vous ne pouvez plus emprunter des livres.\n"
                + "Merci de contacter le bibliothecaire pour plus d'informations.";
        text.append(text2);
        helper.setText(text.toString());

        mailSender.send(message);
    }

    public void returnBookMailConfirmation(Etudiant etudiant,Emprunte emprunte) throws MessagingException, IOException, WriterException{
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(etudiant.getEmail());
        helper.setSubject("Confirmation de retour du livre " + emprunte.getLivre().getTitre());

        String text = "Cher(è) " + etudiant.getNom() + " " + etudiant.getPrenom() + ",\n"
                + "Vous avez retourné le livre " + emprunte.getLivre().getTitre() + " avec Succés.\n"
                + "Merci d'utiliser notre bibliothéque.";
        helper.setText(text);

        mailSender.send(message);
    }
    public void sendReservationConfirmationEmail(Etudiant etudiant, Livre livre ) throws MessagingException, IOException, WriterException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        Reserve reserve= reserveRepo.findByEtudiantAndLivre(etudiant, livre);
        helper.setTo(etudiant.getEmail());
        helper.setSubject("Confirmation de la reservation du livre " + livre.getTitre());

        String text = "Cher(è) " + etudiant.getNom() + " " + etudiant.getPrenom() + ",\n"
                + "Vous avez reserver le livre" + livre.getTitre() + " avec Succés.\n"
                + "Voici votre QR Code pour emprunter votre livre chez notre bibliothecaire à l'Enset. \n"
                + "Merci d'utiliser notre bibliothéque.";
        helper.setText(text);

        String content = "Etudiant : " + etudiant.getNom() + " " + etudiant.getPrenom()
                + "\nCNE : " + etudiant.getCne() + "\nEmail : " + etudiant.getEmail() + "\n"
                +"Filiere : " + etudiant.getFiliere() +" "+"\n"+ "Niveau :"+ etudiant.getNiveau()+ "\n"
                + "Id du Livre : " + livre.getId() +"Livre : " + livre.getTitre() + "\nAuteur : " + livre.getAuteur() + "\n"
                + "Date de reservation : " + reserve.getDateReservation() ;


        byte[] qrCodeImage= QRCodeGenerator.generateQRCodeImage(content, 200, 200);
        helper.addAttachment("QRCode.png", new ByteArrayResource(qrCodeImage));

        mailSender.send(message);
    }
}
