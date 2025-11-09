const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://devjhon01010:lita1970@cluster0.6p96o.mongodb.net/Jogos?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar:', err));


const JogoSchema = new mongoose.Schema({
  timeCasa: { type: String, required: true },
  timeVisitante: { type: String, required: true },
  placarCasa: { type: Number, required: true },
  placarVisitante: { type: Number, required: true },
  rodada: { type: Number, default: 1 }
});

const Jogo = mongoose.model('Jogo', JogoSchema);

app.get('/jogos', async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar jogos' });
  }
});

app.get('/tabela', async (req, res) => {
  try {
    const jogos = await Jogo.find();
    const tabela = calcularTabela(jogos);
    res.json(tabela);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao calcular tabela' });
  }
});

app.post('/jogos', async (req, res) => {
  try {
    const novoJogo = new Jogo(req.body);
    const resultado = await novoJogo.save();
    res.status(201).json(resultado);
  } catch (err) {
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

function calcularTabela(jogos) {
  const timesMap = new Map();

  jogos.forEach(jogo => {
    // normaliza nomes para chave (remove espaços extras e ignora caixa)
    const chaveCasa = String(jogo.timeCasa).trim().toLowerCase();
    const chaveVisitante = String(jogo.timeVisitante).trim().toLowerCase();

    // cria entrada se necessário, mantendo o nome original de exibição da primeira ocorrência
    if (!timesMap.has(chaveCasa)) {
      timesMap.set(chaveCasa, criarTime(jogo.timeCasa.trim()));
    }
    if (!timesMap.has(chaveVisitante)) {
      timesMap.set(chaveVisitante, criarTime(jogo.timeVisitante.trim()));
    }

    const timeCasa = timesMap.get(chaveCasa);
    const timeVisitante = timesMap.get(chaveVisitante);

    timeCasa.jogos++;
    timeVisitante.jogos++;

    timeCasa.golsPro += Number(jogo.placarCasa) || 0;
    timeCasa.golsContra += Number(jogo.placarVisitante) || 0;
    timeCasa.saldoGols = timeCasa.golsPro - timeCasa.golsContra;

    timeVisitante.golsPro += Number(jogo.placarVisitante) || 0;
    timeVisitante.golsContra += Number(jogo.placarCasa) || 0;
    timeVisitante.saldoGols = timeVisitante.golsPro - timeVisitante.golsContra;

    if (jogo.placarCasa > jogo.placarVisitante) {
      timeCasa.pontos += 3;
      timeCasa.vitorias++;
      timeVisitante.derrotas++;
    } else if (jogo.placarCasa < jogo.placarVisitante) {
      timeVisitante.pontos += 3;
      timeVisitante.vitorias++;
      timeCasa.derrotas++;
    } else {
      timeCasa.pontos += 1;
      timeVisitante.pontos += 1;
      timeCasa.empates++;
      timeVisitante.empates++;
    }
  });

  const tabela = Array.from(timesMap.values())
    .sort((a, b) => b.pontos - a.pontos || b.saldoGols - a.saldoGols || b.golsPro - a.golsPro)
    .map((time, index) => ({
      ...time,
      posicao: index + 1,
      aproveitamento: time.jogos > 0 ? ((time.pontos / (time.jogos * 3)) * 100).toFixed(1) : '0.0'
    }));

  return tabela;
}


function criarTime(nome) {
  return {
    time: nome,
    pontos: 0,
    jogos: 0,
    vitorias: 0,
    empates: 0,
    derrotas: 0,
    golsPro: 0,
    golsContra: 0,
    saldoGols: 0
  };
}

function atualizarEstatisticas(time, golsPro, golsContra) {
  time.jogos++;
  time.golsPro += golsPro;
  time.golsContra += golsContra;
  time.saldoGols = time.golsPro - time.golsContra;
}

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando: http://localhost:${PORT}`);
});