package com.rodxlr.biblioteca.service;

import com.rodxlr.biblioteca.domain.Usuario;
import com.rodxlr.biblioteca.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public Usuario cadastrar(Usuario usuario) {
        usuario.setSenha(encoder.encode(usuario.getSenha()));
        usuario.setRole("FUNCIONARIO");
        return repository.save(usuario);
    }
    public boolean validarLogin(String email, String senha) {
        Usuario usuario = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return new BCryptPasswordEncoder().matches(senha, usuario.getSenha());
    }
    public Usuario buscarPorEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public boolean validarSenha(String senhaDigitada, String senhaBanco) {
        return new BCryptPasswordEncoder().matches(senhaDigitada, senhaBanco);
    }


}
