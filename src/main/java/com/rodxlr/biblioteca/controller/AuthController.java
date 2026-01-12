package com.rodxlr.biblioteca.controller;

import com.rodxlr.biblioteca.domain.Usuario;
import com.rodxlr.biblioteca.dto.LoginRequestDTO;
import com.rodxlr.biblioteca.dto.LoginResponseDTO;
import com.rodxlr.biblioteca.service.JwtService;
import com.rodxlr.biblioteca.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final UsuarioService service;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(service.cadastrar(usuario));
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO dto) {

        Usuario usuario = service.buscarPorEmail(dto.getEmail());

        boolean senhaOk = service.validarSenha(dto.getSenha(), usuario.getSenha());

        if (!senhaOk) {
            return ResponseEntity.status(401).build();
        }

        String token = jwtService.gerarToken(usuario.getEmail());

        // retornando token + role
        return ResponseEntity.ok(new LoginResponseDTO(token, usuario.getRole()));
    }


}
