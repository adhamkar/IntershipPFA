package ka.adham.stage_gestion_bibliotheque.Web;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import ka.adham.stage_gestion_bibliotheque.Entities.Image;
import ka.adham.stage_gestion_bibliotheque.Service.StorageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
@RequestMapping("/image")
public class ImageService {

    @Autowired
    private StorageService service;

    @Operation(summary = "Upload an image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Image uploaded successfully",
                    content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "400", description = "Invalid input",
                    content = @Content(mediaType = "application/json"))
    })
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        String uploadImage = service.uploadImage(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @Operation(summary = "Download an image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Image downloaded successfully",
                    content = @Content(mediaType = "image/png")),
            @ApiResponse(responseCode = "404", description = "Image not found",
                    content = @Content(mediaType = "application/json"))
    })
        @GetMapping("/name/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName){
        byte[] imageData=service.downloadImage(fileName);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);
    }
    @GetMapping("/images")
    public List<Image> getImages(){
        return service.getImages();
    }
    @GetMapping("/id/{id}")
    public Image getImage(@PathVariable Long id){
        return service.findById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteImage(@PathVariable Long id){
        service.deleteImage(id);
    }

    @DeleteMapping("/lastImage")
    public void deleteLastImage(){
        List<Image> images = service.getImages();
        Image image = images.get(images.size()-1);
        service.deleteImage(image.getId());
    }
}
