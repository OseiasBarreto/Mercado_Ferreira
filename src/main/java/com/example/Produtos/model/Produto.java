package com.example.Produtos.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;



@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private BigDecimal preco;
    private int quantidade;
    private LocalDateTime dataDeChegada;
    private String fornecedor;
    private String categoria;
    private String descricao;






}
