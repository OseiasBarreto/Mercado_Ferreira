package com.example.Produtos.repository;

import com.example.Produtos.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    Produto findByNome(String nome);

    List<Produto> findByDescricao(String descricao);

    List<Produto> findByCategoria(String categoria);

    List<Produto> findByPreco(BigDecimal preco);

    List<Produto> findByQuantidade(int quantidade);

    List<Produto> findByDataDeChegada(LocalDateTime dataDeChegada);

    List<Produto> findByFornecedor(String fornecedor);





}
