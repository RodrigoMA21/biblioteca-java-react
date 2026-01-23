package com.rodxlr.biblioteca.service;

import com.cloudinary.Cloudinary;
import com.rodxlr.biblioteca.domain.Livro;
import com.rodxlr.biblioteca.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository repository;
    private final Cloudinary cloudinary;

    // ======= CRUD básico =======
    public Livro salvar(Livro livro) {
        return repository.save(livro);
    }

    public List<Livro> listarTodos() {
        return repository.findAll();
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Livro atualizar(Long id, Livro livroAtualizado) {
        livroAtualizado.setId(id);
        return repository.save(livroAtualizado);
    }

    public Livro buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));
    }

    // ======= Upload PDF para Cloudinary =======
    public void uploadPdf(Long id, MultipartFile file) throws Exception {
        if (!file.getContentType().equals("application/pdf")) {
            throw new IllegalArgumentException("Apenas arquivos PDF são permitidos");
        }

        Livro livro = buscarPorId(id);

        // Upload no Cloudinary (resource_type raw para PDF)
        var uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                Map.of(
                        "folder", "biblioteca/pdfs",
                        "resource_type", "raw"
                )
        );

        String pdfUrl = uploadResult.get("secure_url").toString();

        livro.setPdfUrl(pdfUrl);
        repository.save(livro);
    }

    // ======= Upload Capa para Cloudinary =======
    public void uploadCapa(Long id, MultipartFile file) throws Exception {
        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Apenas arquivos de imagem são permitidos");
        }

        Livro livro = buscarPorId(id);

        var uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                Map.of("folder", "biblioteca/capas")
        );

        String capaUrl = uploadResult.get("secure_url").toString();

        livro.setCapaUrl(capaUrl);
        repository.save(livro);
    }
}
