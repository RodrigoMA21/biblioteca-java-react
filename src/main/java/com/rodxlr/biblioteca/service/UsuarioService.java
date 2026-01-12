package com.rodxlr.biblioteca.service;

import com.rodxlr.biblioteca.domain.Role;
import com.rodxlr.biblioteca.domain.Usuario;
import com.rodxlr.biblioteca.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public Usuario cadastrar(Usuario usuario) {

        // Criptografa a senha
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));

        // Define a role corretamente
        String roleStr = usuario.getRole() != null ? usuario.getRole().name() : "USER";
        Role roleEnum;
        try {
            roleEnum = Role.valueOf(roleStr.toUpperCase());
        } catch (IllegalArgumentException e) {
            roleEnum = Role.USER; // valor padrão
        }
        usuario.setRole(roleEnum);

        return repository.save(usuario);
    }

    public Usuario buscarPorEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public boolean validarSenha(String rawSenha, String encodedSenha) {
        return passwordEncoder.matches(rawSenha, encodedSenha);
    }
}
