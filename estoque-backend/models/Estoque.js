const mongoose = require('mongoose');

const EstoqueSchema = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  quantidade: { type: Number, required: true }, // ajustado para "quantidade"
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Estoque', EstoqueSchema);
