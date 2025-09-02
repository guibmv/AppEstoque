const mongoose = require('mongoose');

const VendaSchema = new mongoose.Schema({
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true },
  quantidade: { type: Number, required: true },
  total: { type: Number, required: true },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venda', VendaSchema);
