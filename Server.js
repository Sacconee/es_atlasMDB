import express from 'express';
import { connectToMongoDB } from './connector.js';
import { Animale } from './animale.js';

const app = express();
const PORT = 3000;

// Middleware per leggere il JSON inviato dal form e servire index.html
app.use(express.json());
app.use(express.static('public'));

let collection;

// Rotta GET: restituisce tutti gli animali al browser
app.get('/api/animali', async (req, res) => {
  try {
    const animali = await collection.find({}).toArray();
    res.json(animali);
  } catch (err) {
    res.status(500).json({ errore: 'Errore nella lettura dal DB' });
  }
});

// Rotta POST: riceve i dati del form, crea l'oggetto Animale e lo salva
app.post('/api/animali', async (req, res) => {
  try {
    const { nome, specie, eta, vaccinato } = req.body;
    const nuovoAnimale = new Animale(nome, specie, eta, vaccinato);
    
    const risultato = await collection.insertOne(nuovoAnimale.toDocument());
    res.status(201).json({ id: risultato.insertedId });
  } catch (err) {
    res.status(500).json({ errore: 'Errore nel salvataggio su DB' });
  }
});

// Connessione a MongoDB e avvio del server
async function avviaServer() {
  const client = await connectToMongoDB();
  if (!client) return;

  const db = client.db("clinica_veterinaria");
  collection = db.collection("animali");

  app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
  });
}

avviaServer();