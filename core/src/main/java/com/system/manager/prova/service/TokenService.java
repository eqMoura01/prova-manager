package com.system.manager.prova.service;

import java.security.Key;
import java.sql.Timestamp;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.manager.prova.model.Token;
import com.system.manager.prova.repository.TokenRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

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

    public boolean validaToken(String token) throws SignatureException {

        Token tokenEncontrado = findByToken(token.substring(7));

        if (tokenEncontrado.getDtExpiracao().after(new Date())) {
            tokenEncontrado.setDtExpiracao(new Timestamp(System.currentTimeMillis() + EXPIRATION_TIME));

            return true;
        } else {
            throw new SignatureException("Token expirado");
        }
    }

}
