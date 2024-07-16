package com.system.manager.prova.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.manager.prova.model.Pais;
import com.system.manager.prova.repository.PaisRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PaisService {

    @Autowired
    private PaisRepository paisRepository;
    
    public Pais save(Pais pais) {
        pais.setSigla(pais.getSigla().toUpperCase());
        return paisRepository.save(pais);
    }

    public Pais findByNome(String nome) {
        return paisRepository.findByNome(nome);
    }

    public List<Pais> findAll() {
        return paisRepository.findAll();
    }

    public Pais findById(Long id) {

        Optional<Pais> pais = paisRepository.findById(id);

        if (!pais.isPresent()) {
            throw new EntityNotFoundException("Pais com id " + id + "não encontrado");
        }

        return pais.get();
    }

    public Pais update(Pais object) {
        Pais pais = findById(object.getId());

        if (Objects.nonNull(object)) {
            BeanUtils.copyProperties(object, pais);

            this.paisRepository.save(object);
        }

        return object;
    }

    public Pais deleteById(Long id) {
        Pais pais = paisRepository.findById(id).get();
        paisRepository.deleteById(id);
        return pais;
    }
}
