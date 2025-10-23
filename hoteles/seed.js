// server.js — Backend corregido para Hoteles BA (sin tabla sectores)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'hotelesBA'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    process.exit(1);
  }
  console.log('✅ Conectado a MySQL');
});

// ----------------------
// 🔹 Endpoint: Obtener hoteles
// ----------------------
app.get('/api/hotels', (req, res) => {
  console.log('Query params:', req.query);

  let { q, sector, sort, page = 1, perPage = 12 } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);

  let where = 'WHERE 1=1';
  const params = [];

  if (q) {
    where += ' AND nombre LIKE ?';
    params.push(`%${q}%`);
  }

  if (sector) {
    where += ' AND sector = ?';
    params.push(sector);
  }

  let orderBy = 'ORDER BY precio ASC';
  if (sort === 'desc') orderBy = 'ORDER BY precio DESC';
  if (sort === 'rating') orderBy = 'ORDER BY estrellas DESC';

  const offset = (page - 1) * perPage;

  const countSql = `SELECT COUNT(*) AS total FROM hoteles ${where}`;
  const dataSql = `
    SELECT id, nombre, estrellas, descripcion, imagen, sector, precio
    FROM hoteles
    ${where}
    ${orderBy}
    LIMIT ? OFFSET ?;
  `;

  db.query(countSql, params, (err, countResults) => {
    if (err) {
      console.error('❌ Error en countSql:', err);
      return res.status(500).json({ error: err.message });
    }

    const total = countResults[0].total;
    console.log('Total hoteles encontrados:', total);

    db.query(dataSql, [...params, perPage, offset], (err, dataResults) => {
      if (err) {
        console.error('❌ Error en dataSql:', err);
        return res.status(500).json({ error: err.message });
      }

      console.log('Hoteles obtenidos:', dataResults.length);
      res.json({ hotels: dataResults, total });
    });
  });
});

// ----------------------
// 🔹 Endpoint: Obtener sectores (distintos de la tabla hoteles)
// ----------------------
app.get('/api/sectores', (req, res) => {
  const sql = 'SELECT DISTINCT sector FROM hoteles ORDER BY sector ASC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error en /api/sectores:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results.map(r => ({ nombre: r.sector })));
  });
});

// ----------------------
// 🔹 Servidor en marcha
// ----------------------
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
