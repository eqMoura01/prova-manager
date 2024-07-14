package com.system.manager.prova.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioAutenticado {
    private Long id;
    private String login;
    private String nome;
    private String token;
    private Boolean isAdministrador;
    private Boolean isAutenticado;
}
