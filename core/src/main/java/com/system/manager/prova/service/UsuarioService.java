package com.system.manager.prova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.manager.prova.model.Usuario;
import com.system.manager.prova.repository.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public void save(Usuario usuario) {
        usuarioRepository.save(usuario);
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

}
