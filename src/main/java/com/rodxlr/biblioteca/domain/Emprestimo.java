package com.rodxlr.biblioteca.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "emprestimos")
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeUsuario;

    private LocalDate dataEmprestimo = LocalDate.now();

    private LocalDate dataDevolucao;

    @ManyToOne
    @JoinColumn(name = "livro_id")
    private Livro livro;
}
