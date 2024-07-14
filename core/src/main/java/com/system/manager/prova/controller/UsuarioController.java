package com.system.manager.prova.controller;

import java.security.Key;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.system.manager.prova.model.Usuario;
import com.system.manager.prova.model.UsuarioAutenticado;
import com.system.manager.prova.service.UsuarioService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;  // Injeta o BCryptPasswordEncoder

    private Key key;

    public UsuarioController(UsuarioService usuarioService, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;  // Injeta o BCryptPasswordEncoder no construtor
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Gerar uma chave segura
    }

    public void save(Usuario usuario){
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioService.save(usuario);
    }

    @PostMapping("/autenticar")
    public ResponseEntity<UsuarioAutenticado> autenticarUsuario(@RequestBody Usuario usuarioParaAutenticar) {
        Usuario usuarioEncontrado = usuarioService.findByLogin(usuarioParaAutenticar.getLogin());
        System.out.println(usuarioParaAutenticar.getSenha());

        if (usuarioEncontrado != null && passwordEncoder.matches(usuarioParaAutenticar.getSenha(),
                usuarioEncontrado.getSenha())) {  
            String token = gerarToken(usuarioEncontrado.getId(), usuarioEncontrado.getLogin(),
                    usuarioEncontrado.getAdministrador());
            return ResponseEntity.ok(new UsuarioAutenticado(usuarioEncontrado.getId(), usuarioEncontrado.getLogin(),
                    usuarioEncontrado.getNome(), token, usuarioEncontrado.getAdministrador(), false));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private String gerarToken(Long id, String login, Boolean administrador) {
        return Jwts.builder()
                .setSubject(id.toString())
                .claim("login", login)
                .claim("admin", administrador)
                .signWith(key)
                .compact();
    }

    @GetMapping("/renovar-ticket")
    public ResponseEntity<Boolean> renovarTicket(@RequestHeader("Authorization") String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            Long idUsuario = Long.parseLong(claims.getSubject());

            Usuario usuarioEncontrado = usuarioService.findById(idUsuario);

            if (usuarioEncontrado != null) {
                String novoToken = gerarToken(usuarioEncontrado.getId(), usuarioEncontrado.getLogin(),
                        usuarioEncontrado.getAdministrador());

                return ResponseEntity.ok(true);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}

