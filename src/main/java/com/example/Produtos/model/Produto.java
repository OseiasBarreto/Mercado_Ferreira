package com.example.Produtos.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private BigDecimal preco;
    private int quantidade;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataDeChegada;

    private String fornecedor;
    private String categoria;
    private String descricao;

    public Produto() {
    }

    public Produto(String nome, BigDecimal preco, int quantidade, LocalDate dataDeChegada,
                   String fornecedor, String categoria, String descricao) {
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.dataDeChegada = dataDeChegada;
        this.fornecedor = fornecedor;
        this.categoria = categoria;
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public LocalDate getDataDeChegada() {
        return dataDeChegada;
    }

    public void setDataDeChegada(LocalDate dataDeChegada) {
        this.dataDeChegada = dataDeChegada;
    }

    public String getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
