package com.system.manager.prova.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.system.manager.prova.model.Sessao;

@Repository
public interface SessaoRepository extends JpaRepository<Sessao, Long> {

    Sessao findByToken(String token);

}
