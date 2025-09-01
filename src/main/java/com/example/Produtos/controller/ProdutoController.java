package com.example.Produtos.controller;


import com.example.Produtos.model.Produto;
import com.example.Produtos.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService){
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<Produto> listarTodos(){
        return produtoService.listarTodos();
    }

    @PostMapping
    public Produto salvar(@RequestBody Produto produto){
        return produtoService.salvar(produto);
    }

    @GetMapping("/{id}")
    public Produto buscarPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id);
    }

    @GetMapping("/nome/{nome}")
    public Produto buscarPorNome(@PathVariable String nome) {
        return produtoService.buscarPorNome(nome);
    }
    @PutMapping("/{id}")
    public Produto atualizar(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        Produto produtoExistente = produtoService.buscarPorId(id);

        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setPreco(produtoAtualizado.getPreco());
        produtoExistente.setQuantidade(produtoAtualizado.getQuantidade());
        produtoExistente.setDataDeChegada(produtoAtualizado.getDataDeChegada());
        produtoExistente.setFornecedor(produtoAtualizado.getFornecedor());
        produtoExistente.setCategoria(produtoAtualizado.getCategoria());
        produtoExistente.setDescricao(produtoAtualizado.getDescricao());

        return produtoService.salvar(produtoExistente);
    }
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        produtoService.deletar(id);
    }


}
