package com.system.manager.prova.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.manager.prova.model.Sessao;
import com.system.manager.prova.repository.SessaoRepository;

@Service
public class SessaoService {

    @Autowired
    private SessaoRepository sessaoRepository;

    public void save(Sessao sessao) {
        sessaoRepository.save(sessao);
    }

    public Sessao findByToken(String token) {
        return sessaoRepository.findByToken(token);
    }

}
