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

module.exports = router;
