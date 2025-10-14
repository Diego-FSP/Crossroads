const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar multer (para leer archivos desde /imagenes)
const upload = multer({ dest: 'uploads/' });

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // poné tu contraseña si tenés
  database: 'hoteles_caba'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Conectado a MySQL');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 📸 Subir hotel con imagen (guardando imagen binaria)
app.post('/hoteles', upload.single('imagen'), (req, res) => {
  const { nombre, sector, precio, estrellas, descripcion } = req.body;
  const imagen = fs.readFileSync(req.file.path);

  const sql = 'INSERT INTO hoteles (nombre, sector, precio, estrellas, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, sector, precio, estrellas, descripcion, imagen], (err, result) => {
    fs.unlinkSync(req.file.path); // borrar el archivo temporal
    if (err) return res.status(500).send(err);
    res.send('Hotel guardado correctamente ✅');
  });
});

// 📤 Obtener todos los hoteles
app.get('/hoteles', (req, res) => {
  db.query('SELECT id, nombre, sector, precio, estrellas, descripcion FROM hoteles', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// 🖼️ Obtener una imagen específica
app.get('/hoteles/imagen/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT imagen FROM hoteles WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Imagen no encontrada');
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(results[0].imagen, 'binary');
  });
});

app.listen(port, () => console.log(`🚀 Servidor corriendo en http://localhost:${port}`));
