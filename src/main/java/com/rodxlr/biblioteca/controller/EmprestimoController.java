package com.rodxlr.biblioteca.controller;

import com.rodxlr.biblioteca.domain.Emprestimo;
import com.rodxlr.biblioteca.domain.Livro;
import com.rodxlr.biblioteca.repository.EmprestimoRepository;
import com.rodxlr.biblioteca.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/emprestimos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class EmprestimoController {

    private final EmprestimoRepository emprestimoRepository;
    private final LivroRepository livroRepository;

    @PostMapping("/{livroId}")
    public ResponseEntity<?> emprestarLivro(
            @PathVariable Long livroId,
            @RequestBody Emprestimo emprestimo) {

        Optional<Livro> livroOpt = livroRepository.findById(livroId);

        if (livroOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Livro não encontrado");
        }

        Livro livro = livroOpt.get();

        if (!livro.getDisponivel()) {
            return ResponseEntity.badRequest().body("Livro já está emprestado");
        }

        livro.setDisponivel(false);
        livroRepository.save(livro);

        emprestimo.setLivro(livro);
        Emprestimo salvo = emprestimoRepository.save(emprestimo);

        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(emprestimoRepository.findAll());
    }
    @PutMapping("/devolver/{emprestimoId}")
    public ResponseEntity<?> devolverLivro(@PathVariable Long emprestimoId) {

        Optional<Emprestimo> emprestimoOpt = emprestimoRepository.findById(emprestimoId);

        if (emprestimoOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Empréstimo não encontrado");
        }

        Emprestimo emprestimo = emprestimoOpt.get();

        if (emprestimo.getDataDevolucao() != null) {
            return ResponseEntity.badRequest().body("Este livro já foi devolvido");
        }

        emprestimo.setDataDevolucao(LocalDate.now());

        Livro livro = emprestimo.getLivro();
        livro.setDisponivel(true);
        livroRepository.save(livro);

        emprestimoRepository.save(emprestimo);

        return ResponseEntity.ok("Livro devolvido com sucesso");
    }
}
