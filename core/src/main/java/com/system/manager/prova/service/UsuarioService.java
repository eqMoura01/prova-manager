package com.system.manager.prova.service;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.system.manager.prova.model.Token;
import com.system.manager.prova.model.Usuario;
import com.system.manager.prova.model.UsuarioAutenticado;
import com.system.manager.prova.repository.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    private final long EXPIRATION_TIME = 300000;

    public Usuario save(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public Usuario findByLogin(String login) {
        Usuario usuarioEncontrado = usuarioRepository.findByLogin(login);

        if (usuarioEncontrado == null) {
            throw new EntityNotFoundException("Usuário com login: " + login + ", não foi encontrado");
        }
        return usuarioRepository.findByLogin(login);
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com id: " + id + ", não foi encontrado"));
    }

    // Metodos utilitarios
    public UsuarioAutenticado autenticaUsuario(Usuario object) {

        Usuario usuarioEncontrado = this.findByLogin(object.getLogin());

        if (validaSenha(object.getSenha(), usuarioEncontrado.getSenha())) {

            String token = tokenService.gerarToken(usuarioEncontrado.getId(), usuarioEncontrado.getLogin(),
                    usuarioEncontrado.getAdministrador());

            Token Token = new Token(null, token,
                    new Timestamp(System.currentTimeMillis() + EXPIRATION_TIME));

            tokenService.save(Token);

            return new UsuarioAutenticado(usuarioEncontrado.getId(), usuarioEncontrado.getLogin(),
                    usuarioEncontrado.getNome(), token, usuarioEncontrado.getAdministrador(), true);
        } else {
            throw new IllegalArgumentException("Senha inválida");
        }

    }

    private Boolean validaSenha(String senha, String senhaEncriptada) {
        return passwordEncoder.matches(senha, senhaEncriptada);
    }

}
