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
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

// 🔹 Conexión MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Jhoselin712.',
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


// ================================
// Registro con verificación
// ================================
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Faltan datos' });

  try {
    const [exist] = await db
      .promise()
      .query('SELECT * FROM usuario WHERE email=?', [email]);
    if (exist.length > 0)
      return res.status(400).json({ error: 'El correo ya está registrado' });

    const hash = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString('hex');

    await db
      .promise()
      .query(
        'INSERT INTO usuario (email, pass, verificado, token) VALUES (?, ?, 0, ?)',
        [email, hash, token]
      );

    const link = `http://localhost:${port}/api/verificar?token=${token}`;

    await transporter.sendMail({
      from: `"HotelesBA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verificación de cuenta - HotelesBA',
      html: `
        <h2>Bienvenido a HotelesBA</h2>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${link}" target="_blank">${link}</a>
        <p>Si no solicitaste esta cuenta, ignora este mensaje.</p>
      `
    });

    res.json({
      message: 'Registro exitoso. Revisa tu correo para verificar tu cuenta.'
    });
  } catch (err) {
    console.error('❌ Error al registrar:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ================================
// Verificación de cuenta
// ================================
app.get('/api/verificar', async (req, res) => {
  const { token } = req.query;
  if (!token) return res.send('<h3>Token inválido.</h3>');

  try {
    const [rows] = await db
      .promise()
      .query('SELECT * FROM usuario WHERE token=?', [token]);
    if (rows.length === 0)
      return res.send('<h3>Token inválido o ya verificado.</h3>');

    await db
      .promise()
      .query('UPDATE usuario SET verificado=1, token=NULL WHERE token=?', [
        token
      ]);

    res.send(`
      <html>
        <head><meta charset="UTF-8"><title>Cuenta verificada</title></head>
        <body style="text-align:center;font-family:sans-serif;margin-top:50px">
          <h2>✅ Cuenta verificada correctamente</h2>
          <p>Ya puedes iniciar sesión en HotelesBA.</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('❌ Error al verificar:', err);
    res.send('<h3>Error al verificar la cuenta.</h3>');
  }
});

// ================================
// Login (solo verificados)
// ================================
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Faltan datos' });

  try {
    const [rows] = await db
      .promise()
      .query('SELECT * FROM usuario WHERE email=?', [email]);
    if (rows.length === 0)
      return res.status(400).json({ error: 'Usuario no encontrado' });

    const user = rows[0];

    if (user.verificado === 0)
      return res
        .status(403)
        .json({ error: 'Cuenta no verificada. Revisa tu correo.' });

    const match = await bcrypt.compare(password, user.pass);
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({ message: 'Inicio de sesión exitoso', email: user.email });
  } catch (err) {
    console.error('❌ Error al iniciar sesión:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
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
           h.direccion, h.categoria, b.nombre AS barrio
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

app.listen(port, () => console.log(`🚀 Servidor corriendo en http://localhost:${port}`));
