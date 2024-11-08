package com.system.manager.prova.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.system.manager.prova.dto.PesquisaDTO;
import com.system.manager.prova.model.Pais;
import com.system.manager.prova.service.PaisService;

@RestController
@RequestMapping("/pais")
public class PaisController {

    @Autowired
    private PaisService paisService;
    
    @PostMapping("/salvar")
    public ResponseEntity<Pais> salvar(@RequestBody Pais pais) {
        return ResponseEntity.status(HttpStatus.CREATED).body(this.paisService.save(pais));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Pais>> listar() {
        return ResponseEntity.status(HttpStatus.OK).body(this.paisService.findAll());
    }

    @GetMapping("/pesquisar")
    public ResponseEntity<?> pesquisar(@RequestBody PesquisaDTO pesquisaDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(this.paisService.findByNome(pesquisaDTO.getNome()));
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Pais> atualizar(@RequestBody Pais pais) {
        return ResponseEntity.status(HttpStatus.OK).body(this.paisService.update(pais));
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Pais> deletar(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.paisService.deleteById(id));
    }
}
