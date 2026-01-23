package com.rodxlr.biblioteca.controller;

import com.rodxlr.biblioteca.domain.Livro;
import com.rodxlr.biblioteca.service.LivroService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/livros")
@RequiredArgsConstructor
@CrossOrigin("*")
public class LivroController {

    private final LivroService service;

    // ======= CRUD básico =======
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Livro> cadastrar(@RequestBody Livro livro) {
        return ResponseEntity.ok(service.salvar(livro));
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping
    public ResponseEntity<List<Livro>> listar() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(@PathVariable Long id, @RequestBody Livro livro) {
        return ResponseEntity.ok(service.atualizar(id, livro));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

    // ======= Upload PDF =======
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/upload")
    public ResponseEntity<?> uploadPdf(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            service.uploadPdf(id, file);
            return ResponseEntity.ok("PDF enviado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro: " + e.getMessage());
        }
    }


    // ======= Upload de capa =======
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{id}/uploadCapa")
    public ResponseEntity<?> uploadCapa(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            service.uploadCapa(id, file);
            return ResponseEntity.ok("Capa enviada com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao enviar capa: " + e.getMessage());
        }
    }

}
