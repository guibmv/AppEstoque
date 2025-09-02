require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado!'))
  .catch((err) => console.error('❌ Erro ao conectar no MongoDB:', err));

// Importar rotas
const produtoRoutes = require('./routes/produtos');
const vendaRoutes = require('./routes/vendas');
const estoqueRoutes = require('./routes/estoque');

// Usar rotas
app.use('/api/produtos', produtoRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/estoque', estoqueRoutes);

// Inicializar servidor
app.listen(5000, () => {
  console.log('🚀 Servidor rodando na porta 5000');
});
