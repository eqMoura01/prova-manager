package com.system.manager.prova;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.system.manager.prova.controller.UsuarioController;
import com.system.manager.prova.model.Usuario;

@SpringBootApplication
public class ProvaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProvaApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(UsuarioController usuarioController) {
        return args -> {
            Usuario usuarioConvidado = new Usuario(null, "convidado", "manager", "Usuário convidado", false);
            usuarioController.save(usuarioConvidado);

            Usuario admin = new Usuario(null, "admin", "suporte", "Gestor", true);
            usuarioController.save(admin);
        };
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
