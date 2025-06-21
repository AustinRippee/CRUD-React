import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let messages = [
  { id: 1, message: 'Hello World' },
  { id: 2, message: 'This is a sample message' },
];

// GET all messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// GET a message by id
app.get('/api/messages/:id', (req, res) => {
  const id = Number(req.params.id);
  const msg = messages.find(m => m.id === id);
  if (!msg) return res.status(404).json({ error: 'Message not found' });
  res.json(msg);
});

// POST create a new message
app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const newMsg = { id: messages.length ? messages[messages.length - 1].id + 1 : 1, message: message.trim() };
  messages.push(newMsg);
  res.status(201).json(newMsg);
});

// PUT update a message by id
app.put('/api/messages/:id', (req, res) => {
  const id = Number(req.params.id);
  const { message } = req.body;
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Message not found' });
  if (!message || !message.trim()) return res.status(400).json({ error: 'Message is required' });
  messages[index].message = message.trim();
  res.json(messages[index]);
});

// DELETE a message by id
app.delete('/api/messages/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: 'Message not found' });
  messages.splice(index, 1);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});