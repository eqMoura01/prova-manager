package com.system.manager.prova.model;

import org.springframework.security.crypto.bcrypt.BCrypt;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O campo login é obrigatório")
    private String login;
    @NotBlank(message = "O campo senha é obrigatório")
    private String senha;
    private String nome;
    private Boolean administrador;

    public void setSenha(String senha) {
        this.senha = BCrypt.hashpw(senha, BCrypt.gensalt());
    }
}
