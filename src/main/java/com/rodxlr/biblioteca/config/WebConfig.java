package com.rodxlr.biblioteca.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Pega a pasta uploads na raiz do projeto
        Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads");
        String uploadPath = uploadDir.toFile().getAbsolutePath();

        // Servir PDFs (diretório raiz uploads)
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadPath + "/")
                .setCachePeriod(3600); // opcional: cache de 1 hora

        // Servir capas separadamente (opcional, mas não estraga nada)
        Path capasDir = uploadDir.resolve("capas");
        String capasPath = capasDir.toFile().getAbsolutePath();

        registry.addResourceHandler("/uploads/capas/**")
                .addResourceLocations("file:" + capasPath + "/")
                .setCachePeriod(3600);
    }
}
