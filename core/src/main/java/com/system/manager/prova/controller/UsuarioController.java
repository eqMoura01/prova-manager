package com.system.manager.prova.controller;

import java.security.Key;
import java.sql.Timestamp;
import java.util.Date;

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

import com.system.manager.prova.model.Token;
import com.system.manager.prova.model.Usuario;
import com.system.manager.prova.model.UsuarioAutenticado;
import com.system.manager.prova.service.TokenService;
import com.system.manager.prova.service.UsuarioService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private TokenService TokenService;

    private Key key;

    private final long EXPIRATION_TIME = 300000; // 5 Minutos

    public UsuarioController(UsuarioService usuarioService, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public ResponseEntity<Usuario> save(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return ResponseEntity.status(HttpStatus.CREATED).body(this.usuarioService.save(usuario));
    }

    @PostMapping("/autenticar")
    public ResponseEntity<UsuarioAutenticado> autenticarUsuario(@RequestBody Usuario usuarioParaAutenticar) {
        System.out.println(usuarioParaAutenticar.getSenha());
        System.out.println(usuarioParaAutenticar.getLogin());

        Usuario usuarioEncontrado = usuarioService.findByLogin(usuarioParaAutenticar.getLogin());

        if (usuarioEncontrado != null && passwordEncoder.matches(usuarioParaAutenticar.getSenha(),
                usuarioEncontrado.getSenha())) {

            String token = gerarToken(usuarioEncontrado.getId(), usuarioEncontrado.getLogin(),
                    usuarioEncontrado.getAdministrador());

            Token Token = new Token(null, usuarioEncontrado, token,
                    new Timestamp(System.currentTimeMillis() + EXPIRATION_TIME));

            TokenService.save(Token);

            return ResponseEntity.ok(new UsuarioAutenticado(usuarioEncontrado.getId(), usuarioEncontrado.getLogin(),
                    usuarioEncontrado.getNome(), token, usuarioEncontrado.getAdministrador(), true));

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private String gerarToken(Long id, String login, Boolean administrador) {
        return Jwts.builder()
                .setSubject(id.toString())
                .claim("login", login)
                .claim("admin", administrador)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    @GetMapping("/renovar-ticket")
    public ResponseEntity<Boolean> renovarTicket(@RequestHeader("Authorization") String tokenStr) {

        System.out.println(tokenStr);
        System.out.println(tokenStr.substring(7));
        try {
            Token token = TokenService.findByToken(tokenStr.substring(7));

            if (token != null && token.getDtExpiracao().after(new Date())) {

                token.setDtExpiracao(new Timestamp(System.currentTimeMillis() + EXPIRATION_TIME));
                TokenService.save(token);
                return ResponseEntity.ok(true);
            } else {

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (SignatureException e) {

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @GetMapping("/test")
    public String getMethodName() {
        return new String("/teste funcionou");
    }

}
