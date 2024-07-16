package com.system.manager.prova.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.manager.prova.model.Pais;
import com.system.manager.prova.repository.PaisRepository;

@Service
public class PaisService {

    @Autowired
    private PaisRepository paisRepository;
    
    public Pais save(Pais pais) {
        return paisRepository.save(pais);
    }

    public Pais findByNome(String nome) {
        return paisRepository.findByNome(nome);
    }

    public List<Pais> findAll() {
        return paisRepository.findAll();
    }

    public Pais deleteById(Long id) {
        Pais pais = paisRepository.findById(id).get();
        paisRepository.deleteById(id);
        return pais;
    }
}
