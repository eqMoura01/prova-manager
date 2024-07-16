package com.system.manager.prova.controller;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.system.manager.prova.dto.TokenDTO;
import com.system.manager.prova.model.Sessao;
import com.system.manager.prova.model.Usuario;
import com.system.manager.prova.model.UsuarioAutenticado;
import com.system.manager.prova.service.SessaoService;
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
    private SessaoService sessaoService;

    private Key key;

    private final long EXPIRATION_TIME = 300000; // 5 Minutos

    public UsuarioController(UsuarioService usuarioService, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.passwordEncoder = passwordEncoder;
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    }

    public void save(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioService.save(usuario);
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

            Sessao sessao = new Sessao(null, usuarioEncontrado, token,
                    new Date(System.currentTimeMillis() + EXPIRATION_TIME));

            sessaoService.save(sessao);

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
    public ResponseEntity<Boolean> renovarTicket(@RequestBody TokenDTO tokenDTO) {
        try {
            Sessao sessao = sessaoService.findByToken(tokenDTO.getToken());

            if (sessao != null && sessao.getDtExpiracao().after(new Date())) {

                sessao.setDtExpiracao(new Date(System.currentTimeMillis() + EXPIRATION_TIME));
                sessaoService.save(sessao);
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
