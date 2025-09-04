const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Criar novo produto
router.post('/', async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Atualizar estoque de um produto
router.put('/:id/estoque', async (req, res) => {
  try {
    const { estoque } = req.body; // valor que você vai mandar no body

    // Verifica se o campo estoque foi enviado
    if (estoque === undefined) {
      return res.status(400).json({ erro: 'O campo estoque é obrigatório.' });
    }

    // Atualiza somente o campo estoque
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      { $set: { estoque } },
      { new: true, runValidators: true } // retorna o doc atualizado e valida
    );

    if (!produtoAtualizado) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    res.json(produtoAtualizado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Excluir um produto
router.delete('/:id', async (req, res) => {
  try {
    const produtoRemovido = await Produto.findByIdAndDelete(req.params.id);

    if (!produtoRemovido) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }

    res.json({ mensagem: 'Produto excluído com sucesso!', produto: produtoRemovido });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


module.exports = router;
