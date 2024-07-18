package com.system.manager.prova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.system.manager.prova.model.Usuario;
import com.system.manager.prova.model.UsuarioAutenticado;
import com.system.manager.prova.service.TokenService;
import com.system.manager.prova.service.UsuarioService;

import io.jsonwebtoken.security.SignatureException;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    private final long EXPIRATION_TIME = 300000; // 5 Minutos

    public ResponseEntity<Usuario> save(Usuario usuario) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.usuarioService.save(usuario));
    }

    @PostMapping("/autenticar")
    public ResponseEntity<UsuarioAutenticado> autenticarUsuario(@RequestBody Usuario usuarioParaAutenticar) {
        try {
            return ResponseEntity.ok(usuarioService.autenticaUsuario(usuarioParaAutenticar));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/renovar-ticket")
    public ResponseEntity<Boolean> renovarTicket(@RequestHeader("Authorization") String tokenStr) {
        try {
            return ResponseEntity.ok(tokenService.validaToken(tokenStr));
        } catch (SignatureException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}
