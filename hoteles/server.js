// server.js — Backend actualizado para Hoteles BA
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

app.get('/api/hotels', (req, res) => {
  console.log('Query params:', req.query);

  let { q, sector, sort, page = 1, perPage = 12 } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);

  let where = 'WHERE 1=1';
  const params = [];

  if (q) {
    where += ' AND h.nombre LIKE ?';
    params.push(`%${q}%`);
  }

  if (sector) {
    where += ' AND s.nombre = ?';
    params.push(sector);
  }

  let orderBy = 'ORDER BY h.precio ASC';
  if (sort === 'desc') orderBy = 'ORDER BY h.precio DESC';
  if (sort === 'rating') orderBy = 'ORDER BY h.estrellas DESC';

  const offset = (page - 1) * perPage;

  const countSql = `
    SELECT COUNT(*) AS total
    FROM hoteles h
    JOIN sectores s ON h.sector_id = s.id
    ${where}
  `; // <--- Punto y coma removido

  const dataSql = `
    SELECT h.id, h.nombre, h.estrellas, h.descripcion, h.imagen,
           h.direccion, h.categoria, h.precio, s.nombre AS sector
    FROM hoteles h
    JOIN sectores s ON h.sector_id = s.id
    ${where}
    ${orderBy}
    LIMIT ? OFFSET ?;
  `;

  db.query(countSql, params, (err, countResults) => {
    if (err) {
      console.error('Error en countSql:', err);
      return res.status(500).json({ error: err.message });
    }

    const total = countResults[0].total;
    console.log('Total hoteles:', total);

    db.query(dataSql, [...params, perPage, offset], (err, dataResults) => {
      if (err) {
        console.error('Error en dataSql:', err);
        return res.status(500).json({ error: err.message });
      }
      console.log('Hoteles obtenidos:', dataResults.length);
      res.json({ hotels: dataResults, total });
    });
  });
});

app.get('/api/sectores', (req, res) => {
  db.query('SELECT nombre FROM sectores ORDER BY nombre ASC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});