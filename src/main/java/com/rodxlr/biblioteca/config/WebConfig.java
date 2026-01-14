package com.rodxlr.biblioteca.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // PDFs continuam sendo servidos da pasta uploads no filesystem
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/") // deixa PDFs funcionando
                .setCachePeriod(3600);

        // Capas agora servidas do classpath (static) para produção no Render
        registry.addResourceHandler("/uploads/capas/**")
                .addResourceLocations("classpath:/static/uploads/capas/")
                .setCachePeriod(3600);
    }
}
