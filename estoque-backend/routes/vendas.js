const express = require('express');
const router = express.Router();
const Venda = require('../models/Venda');

// Criar venda
router.post('/', async (req, res) => {
  try {
    const novaVenda = new Venda(req.body);
    await novaVenda.save();
    res.status(201).json(novaVenda);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar vendas
router.get('/', async (req, res) => {
  try {
    const vendas = await Venda.find().populate('produto');
    res.json(vendas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir uma venda
router.delete('/:id', async (req, res) => {
  try {
    const vendaRemovida = await Venda.findByIdAndDelete(req.params.id);

    if (!vendaRemovida) {
      return res.status(404).json({ erro: 'Venda não encontrado.' });
    }

    res.json({ mensagem: 'Venda excluída com sucesso!', venda: vendaRemovida });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

//Buscar vendas do mês
router.get("/", async (req, res) => {
  try {
    const { ano, mes } = req.query;

    if (!ano || !mes) {
      return res.status(400).json({ message: "Informe ano e mês" });
    }

    const inicio = new Date(ano, mes - 1, 1, 0, 0, 0);
    const fim = new Date(ano, mes, 0, 23, 59, 59);

    // Busca vendas do mês
    const vendas = await Venda.find({
      data: { $gte: inicio, $lte: fim }
    }).populate("produto");

    // Agrupar por produto
    const resumo = {};

    vendas.forEach((v) => {
      const id = v.produto._id.toString();
      if (!resumo[id]) {
        resumo[id] = {
          produto: v.produto,
          quantidadeVendida: 0,
          totalVendido: 0
        };
      }
      resumo[id].quantidadeVendida += v.quantidade;
      resumo[id].totalVendido += v.total;
    });

    res.json(Object.values(resumo));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao gerar relatório mensal" });
  }
});

module.exports = router;
