package com.system.manager.prova.service;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.manager.prova.model.Token;
import com.system.manager.prova.repository.TokenRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final long EXPIRATION_TIME = 300000; // 5 Minutos

    public Token save(Token token) {
        return tokenRepository.save(token);
    }

    public Token findByToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public String gerarToken(Long id, String login, Boolean administrador) {
        return Jwts.builder()
                .setSubject(id.toString())
                .claim("login", login)
                .claim("admin", administrador)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

}
