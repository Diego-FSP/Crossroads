// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar multer (para subir imágenes temporales)
const upload = multer({ dest: 'uploads/' });

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // tu contraseña si tenés
  database: 'hoteles_caba'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a MySQL');
});

// 📤 Obtener todos los hoteles
app.get('/api/hotels', (req, res) => {
  db.query('SELECT * FROM hoteles', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json({ hotels: results, total: results.length });
  });
});

// 📸 Subir un nuevo hotel con imagen
app.post('/api/hotels', upload.single('imagen'), (req, res) => {
  const { nombre, sector, precio, estrellas, descripcion } = req.body;
  const imagenPath = req.file ? req.file.path : null;

  let imagen = null;
  if (imagenPath) imagen = fs.readFileSync(imagenPath);

  const sql = 'INSERT INTO hoteles (nombre, sector, precio, estrellas, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, sector, precio, estrellas, descripcion, imagen], (err) => {
    if (imagenPath) fs.unlinkSync(imagenPath); // elimina archivo temporal
    if (err) return res.status(500).send(err);
    res.send('✅ Hotel guardado correctamente');
  });
});

// 🖼️ Obtener imagen por ID
app.get('/api/hoteles/imagen/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT imagen FROM hoteles WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0 || !results[0].imagen) return res.status(404).send('Imagen no encontrada');
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(results[0].imagen, 'binary');
  });
});

// Mostrar todos los hoteles
app.get('/api/hoteles', (req, res) => {
  db.query('SELECT * FROM hoteles', (err, results) => {
    if (err) {
      console.error('Error al obtener hoteles:', err);
      return res.status(500).send('Error en la base de datos');
    }
    res.json(results);
  });
});

app.listen(port, () => console.log(`🚀 Servidor en http://localhost:${port}`));
