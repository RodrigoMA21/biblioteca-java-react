package com.rodxlr.biblioteca.dto;

import com.rodxlr.biblioteca.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private Role role;
}
