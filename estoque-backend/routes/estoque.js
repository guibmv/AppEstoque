const express = require('express');
const router = express.Router();
const Estoque = require('../models/Estoque');

// Adicionar ou atualizar estoque
router.post('/', async (req, res) => {
  const { produto, quantidade } = req.body;

  try {
    let estoque = await Estoque.findOne({ produto });

    if (estoque) {
      estoque.quantidade = quantidade;
      estoque.data = new Date();
    } else {
      estoque = new Estoque({ produto, quantidade });
    }

    await estoque.save();
    res.status(201).json(estoque);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar estoque
router.get('/', async (req, res) => {
  try {
    const estoques = await Estoque.find().populate('produto');
    res.json(estoques);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
