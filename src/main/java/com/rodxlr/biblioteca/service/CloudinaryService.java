package com.rodxlr.biblioteca.service;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadPdf(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                Map.of("resource_type", "raw"));
        return uploadResult.get("secure_url").toString();
    }

    public String uploadImagem(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                Map.of("resource_type", "image"));
        return uploadResult.get("secure_url").toString();
    }
}
