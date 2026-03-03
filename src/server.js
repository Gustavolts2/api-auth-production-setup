require('dotenv').config();
const express = require('express');
const connectDatabase = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
connectDatabase();

// Middleware
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));