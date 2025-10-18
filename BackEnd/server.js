const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://devjhon01010:lita1970@cluster0.6p96o.mongodb.net/Jogos?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

// Modelo de Jogo
const JogoSchema = new mongoose.Schema({
  timeCasa: { type: String, required: true },
  timeVisitante: { type: String, required: true },
  placarCasa: { type: Number, required: true },
  placarVisitante: { type: Number, required: true },
  rodada: { type: Number, default: 1 }
});

const Jogo = mongoose.model('Jogo', JogoSchema);

// Rotas da API
app.get('/jogos', async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (err) {
    console.error('Erro ao buscar jogos:', err);
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

app.post('/jogos', async (req, res) => {
  console.log('Dados recebidos:', req.body);
  try {
    const novoJogo = new Jogo(req.body);
    const resultado = await novoJogo.save();
    console.log(' Jogo salvo:', resultado);
    res.status(201).json(resultado);
  } catch (err) {
    console.error('Erro ao salvar:', err);
    res.status(500).json({ error: 'Erro ao salvar jogo' });
  }
});

app.put('/jogos/:id', async (req, res) => {
  try {
    const atualizado = await Jogo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar jogo' });
  }
});

app.delete('/jogos/:id', async (req, res) => {
  try {
    const removido = await Jogo.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ error: 'Jogo não encontrado' });
    res.json({ message: 'Jogo removido com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover jogo' });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
