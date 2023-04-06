package mx.edu.utez.serviciosIntegradora.service.image;

import org.apache.tomcat.jni.File;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class ImageService {
    @Value("${spring.os}")
    private String os;

    String separator = FileSystems.getDefault().getSeparator();



    public String getPicture (String path) throws IOException {
        try{

            Resource resource = new FileSystemResource(path);
            byte[] pictureData = StreamUtils.copyToByteArray(resource.getInputStream());

            String pictureBase64 = Base64.getEncoder().encodeToString(pictureData);

            return pictureBase64;

        }catch (IOException e){
            return null;
        }
    }

    public String savePicture (String picture) throws IOException {

        try {
            byte[] pictureData = Base64.getDecoder().decode(picture);

            String pictureName = UUID.randomUUID().toString() + ".png";
            String imagePath = os + separator + pictureName;

            Files.write(Paths.get(imagePath),pictureData);

            return imagePath;
        }catch (IOException e){
            return null;
        }

    }

}
