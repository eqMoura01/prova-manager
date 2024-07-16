package com.system.manager.prova;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.system.manager.prova.controller.UsuarioController;
import com.system.manager.prova.model.Pais;
import com.system.manager.prova.model.Usuario;
import com.system.manager.prova.service.PaisService;

@SpringBootApplication
public class ProvaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProvaApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(UsuarioController usuarioController, PaisService paisService) {
        return args -> {
            Usuario usuarioConvidado = new Usuario(null, "convidado", "manager", "Usuário convidado", false);
            usuarioController.save(usuarioConvidado);

            Usuario admin = new Usuario(null, "admin", "suporte", "Gestor", true);
            usuarioController.save(admin);

            Pais pais1 = new Pais(null, "Brasil", "BR", "Brasileiro");
            paisService.save(pais1);
            Pais pais2 = new Pais(null, "Argentina", "AR", "Argentino");
            paisService.save(pais2);
            Pais pais3 = new Pais(null, "Alemanha", "AL", "Alemão");
            paisService.save(pais3);
        };
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
