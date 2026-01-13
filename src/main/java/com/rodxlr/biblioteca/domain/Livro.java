package com.rodxlr.biblioteca.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "livros")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String autor;

    @Column(nullable = false)
    private Integer anoPublicacao;

    private Boolean disponivel = true;

    // ======= URL do PDF =======
    private String pdfUrl;

    // ======= URL da capa =======
    private String capaUrl;
}
