//aqui é o funciinario que guarda os produtos e sabe onde estão e segue as ordens do gerente
//o gerente chamado ProdutoService

package com.example.Produtos.repository;
import com.example.Produtos.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface    ProdutoRepository extends JpaRepository<Produto, Long> {
String findByNome(String nome);
String findbyDescricao(String descricao);
String findByCategoria(String categoria);
String findByPreco(double preco);
String findByQuantidadeEstoque(int quantidadeEstoque);
String findByMarca(String marca);
String findByModelo(String modelo);
String findByCor(String cor);

}
