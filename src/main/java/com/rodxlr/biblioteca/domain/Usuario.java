package com.rodxlr.biblioteca.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String senha;

    private String nome;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER; // default USER

    private String resetToken;

    private LocalDateTime resetTokenExpiry;

    public boolean isResetTokenValid() {
        return resetToken != null && resetTokenExpiry != null && LocalDateTime.now().isBefore(resetTokenExpiry);
    }
}
