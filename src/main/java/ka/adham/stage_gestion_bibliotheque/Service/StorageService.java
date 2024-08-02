package ka.adham.stage_gestion_bibliotheque.Service;

import ka.adham.stage_gestion_bibliotheque.Entities.Image;
import ka.adham.stage_gestion_bibliotheque.Repositories.ImageRepo;
import ka.adham.stage_gestion_bibliotheque.Utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class StorageService {
    @Autowired
    private ImageRepo imageRepo;

    public String uploadImage(MultipartFile file) throws IOException {

        Image imageData = imageRepo.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
        if (imageData != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }
        return null;
    }

    public byte[] downloadImage(String fileName){
        Optional<Image> dbImageData = imageRepo.findByName(fileName);
        byte[] images=ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }

    public Image findByName(String originalFilename) {
        return imageRepo.findByName(originalFilename).get();
    }

    public List<Image> getImages() {
        return imageRepo.findAll();
    }

    public Image findById(Long id) {
        return imageRepo.findById(id).get();
    }

    public void deleteImage(Long id) {
        imageRepo.deleteById(id);
    }
}
