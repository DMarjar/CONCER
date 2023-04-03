package mx.edu.utez.serviciosIntegradora.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.io.File;

@Configuration
public class InitializeDirectories implements CommandLineRunner {
    @Value("${spring.os}")
    private String rootPath;
    @Override
    public void run(String... args) throws Exception {
        File dir = new File(rootPath); // Crea un objeto File con el path de la configuración
        if (!dir.exists()) dir.mkdirs(); // Si no existe el directorio, lo crea
    }
}
