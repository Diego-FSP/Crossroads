// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

// 🔹 Conexión MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || '5to_agbd',
  password: process.env.DB_PASS || 'Trigg3rs!',
  database: process.env.DB_NAME || 'hotelesBA'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    process.exit(1);
  }
  console.log('✅ Conectado a MySQL');
});

// 🔹 Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});


// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuario WHERE email = ?';
  db.query(query, [email], (err, results) => {
      if (err) return res.status(500).send('Error al realizar la consulta');
      if (results.length === 0) return res.status(400).send('Usuario no encontrado');

      const user = results[0];
      bcrypt.compare(password, user.pass, (err, isMatch) => {
          if (err) return res.status(500).send('Error de autenticación');
          if (!isMatch) return res.status(400).send('Contraseña incorrecta');

          // Crear token JWT
          const token = jwt.sign({ id: user.idUsuario }, 'secreto', { expiresIn: '1h' });
          res.status(200).json({ token });
      });
  });
});

// Endpoint para registrar un usuario
app.post('/register', (req, res) => {
  const { email, password, nombre, telefono, documento } = req.body;

  // Encriptar la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Error al encriptar la contraseña');

      const query = 'INSERT INTO usuario (nombre, email, pass, telefono, documento) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [nombre, email, hashedPassword, telefono, documento], (err, results) => {
          if (err) return res.status(500).send('Error al registrar el usuario');
          res.status(200).send('Usuario registrado correctamente');
      });
  });
});

// ================================
// Hoteles (sin cambios)
// ================================
app.get('/api/hotels', (req, res) => {
  let { q, barrio, sort, page = 1, perPage = 12 } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);
  let where = 'WHERE 1=1';
  const params = [];

  if (q) {
    where += ' AND h.nombre LIKE ?';
    params.push(`%${q}%`);
  }
  if (barrio) {
    where += ' AND b.nombre = ?';
    params.push(barrio);
  }

  let orderBy = '';
  if (sort === 'rating') orderBy = 'ORDER BY h.estrellas DESC';
  const offset = (page - 1) * perPage;

  const countSql = `
    SELECT COUNT(*) AS total
    FROM hoteles h
    JOIN barrio b ON h.barrio_id = b.barrio_id
    ${where}
  `;
  const dataSql = `
    SELECT h.id, h.nombre, h.estrellas, h.descripcion, h.imagen,
           h.direccion, h.precio, h.categoria, b.nombre AS barrio
    FROM hoteles h
    JOIN barrio b ON h.barrio_id = b.barrio_id
    ${where}
    ${orderBy}
    LIMIT ? OFFSET ?;
  `;

  db.query(countSql, params, (err, countResults) => {
    if (err) return res.status(500).json({ error: err.message });
    const total = countResults[0].total;

    db.query(dataSql, [...params, perPage, offset], (err, dataResults) => {
      if (err) return res.status(500).json({ error: err.message });

      const hotels = dataResults.map(hotel => ({
        ...hotel,
        imagen: hotel.imagen?.startsWith('http')
          ? hotel.imagen
          : `http://localhost:${port}/images/${hotel.imagen}`
      }));
      res.json({ hotels, total });
    });
  });
});

app.get('/api/barrio', (req, res) => {
  db.query('SELECT nombre FROM barrio ORDER BY nombre ASC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/hotelD', (req, res) => {
  let {id} = req.query;
  let consulta = 'SELECT h.id, h.nombre, h.estrellas, h.descripcion, h.imagen, h.direccion, h.precio, h.categoria FROM hoteles h';
  if(id) consulta += ' where h.id='+ id;
  db.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.listen(port, () => console.log(`🚀 Servidor corriendo en http://localhost:${port}`));
