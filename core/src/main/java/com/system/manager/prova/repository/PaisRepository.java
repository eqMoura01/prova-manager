package com.system.manager.prova.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.system.manager.prova.model.Pais;

@Repository
public interface PaisRepository extends JpaRepository<Pais, Long> {

    Pais findByNome(String nome);
    
}
