const express = require('express');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Connect to SQLite DB (it will auto-create if not exists)
const db = new sqlite3.Database('./messages.db')

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT
)`)

db.run(`INSERT INTO messages (message) VALUES ('Hello world!')`)

// Get all messages
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Create a message
app.post('/api/messages', (req, res) => {
  const { message } = req.body
  db.run('INSERT INTO messages (message) VALUES (?)', [message], function(err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: this.lastID, message })
  })
})

// Read single message
app.get('/api/messages/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM messages WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(row)
  })
})

// Update a message
app.put('/api/messages/:id', (req, res) => {
  const { id } = req.params
  const { message } = req.body
  db.run('UPDATE messages SET message = ? WHERE id = ?', [message, id], function(err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ updated: this.changes })
  })
})

// Delete a message
app.delete('/api/messages/:id', (req, res) => {
  const { id } = req.params
  db.run('DELETE FROM messages WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ deleted: this.changes })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})