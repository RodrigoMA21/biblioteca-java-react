package com.rodxlr.biblioteca.service;

import com.rodxlr.biblioteca.domain.Livro;
import com.rodxlr.biblioteca.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository repository;
    private final Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads");

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

    // ======= Upload de PDF =======
    public void uploadPdf(Long id, MultipartFile file) throws Exception {
        if (!file.getContentType().equals("application/pdf")) {
            throw new IllegalArgumentException("Apenas arquivos PDF são permitidos");
        }

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        Livro livro = buscarPorId(id);

        // Remove PDF antigo
        if (livro.getPdfUrl() != null) {
            Path antigo = uploadDir.resolve(Paths.get(livro.getPdfUrl()).getFileName());
            Files.deleteIfExists(antigo);
        }

        String filename = id + "_" + System.currentTimeMillis() + ".pdf";
        Path filePath = uploadDir.resolve(filename);
        file.transferTo(filePath.toFile());

        livro.setPdfUrl("/livros/pdf/" + filename); // URL via endpoint seguro
        repository.save(livro);
    }

    // ======= Upload de Capa =======
    public void uploadCapa(Long id, MultipartFile file) throws Exception {
        if (!file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Apenas arquivos de imagem são permitidos");
        }

        Path capaDir = uploadDir.resolve("capas");
        if (!Files.exists(capaDir)) {
            Files.createDirectories(capaDir);
        }

        Livro livro = buscarPorId(id);

        // Remove capa antiga
        if (livro.getCapaUrl() != null) {
            try {
                String nomeArquivo = Paths.get(new URI(livro.getCapaUrl()).getPath()).getFileName().toString();
                Path antigo = capaDir.resolve(nomeArquivo);
                Files.deleteIfExists(antigo);
            } catch (Exception ignored) {}
        }

        String filename = "capa_" + id + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = capaDir.resolve(filename);
        file.transferTo(filePath.toFile());

        livro.setCapaUrl("/uploads/capas/" + filename); // URL pública
        repository.save(livro);
    }

    // ======= Download seguro de PDF =======
    public Resource baixarPdf(String filename) throws Exception {
        Path filePath = uploadDir.resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("Arquivo não encontrado");
        }

        return resource;
    }

    // ======= Download seguro de capa =======
    public Resource baixarCapa(String filename) throws Exception {
        Path filePath = uploadDir.resolve("capas").resolve(filename);
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            throw new RuntimeException("Capa não encontrada");
        }

        return resource;
    }
}
