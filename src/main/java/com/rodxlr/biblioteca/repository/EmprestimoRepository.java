package com.rodxlr.biblioteca.repository;

import com.rodxlr.biblioteca.domain.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
}
