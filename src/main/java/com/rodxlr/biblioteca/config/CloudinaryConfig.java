package com.rodxlr.biblioteca.config;


import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "SEU_CLOUD_NAME");
        config.put("api_key", "SEU_API_KEY");
        config.put("api_secret", "SEU_API_SECRET");
        return new Cloudinary(config);
    }
}
