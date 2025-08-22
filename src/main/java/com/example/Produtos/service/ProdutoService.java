//essa classe é o gerente...sabe onde estão os produtos, mas não guarda.. tem seus
//funcionarios para buscar, como é o caso do funcionario chamado ProdutoRepository

package com.example.Produtos.service;

import com.example.Produtos.model.Produto;
import com.example.Produtos.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;


    //aqui é a injeção de dependência do repositório
    public ProdutoService(ProdutoRepository produtoRepository){
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listarTodos(){
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id){
        return produtoRepository.findById(id).orElse(null);
    }

    public Produto salvar(Produto produto){
        return produtoRepository.save(produto);
    }

    public void deletar(Long id){
        produtoRepository.deleteById(id);
    }

}
